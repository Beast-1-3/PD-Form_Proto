// src/engine/sessionEngine.ts
// Centralized session timeline — single clock drives all UI updates

import { DEMO_SCRIPT, type ScriptEvent } from '../data/demoScript';
import { getInitialPDFields, type PDField } from '../data/pdFieldSchema';

export type SessionStatus = 'idle' | 'live' | 'paused' | 'ended';

export interface TranscriptMessage {
  eventId: string;
  timeMs: number;
  speaker: 'SM' | 'Borrower' | 'System';
  text: string;
  causedFieldUpdate: boolean;
}

export interface NudgeItem {
  id: string;
  text: string;
  timestamp: number;
  dismissed: boolean;
}

export interface AlertItem {
  id: string;
  text: string;
  severity: 'info' | 'warning';
  timestamp: number;
}

export interface ActionItem {
  id: string;
  text: string;
  timestamp: number;
  completed: boolean;
}

export interface SessionState {
  status: SessionStatus;
  elapsedMs: number;
  speed: 1 | 2;
  transcript: TranscriptMessage[];
  fields: PDField[];
  nudges: NudgeItem[];
  alerts: AlertItem[];
  actions: ActionItem[];
  processedEventIds: Set<string>;
  scriptComplete: boolean;
}

export type SessionStateListener = (state: SessionState) => void;

function deepCloneFields(fields: PDField[]): PDField[] {
  return fields.map(f => ({ ...f }));
}

function applyEvent(state: SessionState, event: ScriptEvent): SessionState {
  const newState = { ...state };
  newState.transcript = [...state.transcript];
  newState.fields = deepCloneFields(state.fields);
  newState.nudges = [...state.nudges];
  newState.alerts = [...state.alerts];
  newState.actions = [...state.actions];
  newState.processedEventIds = new Set(state.processedEventIds);

  // Skip already-processed events
  if (newState.processedEventIds.has(event.id)) return state;
  newState.processedEventIds.add(event.id);

  // Transcript message
  const causedFieldUpdate = !!(event.fieldUpdates && event.fieldUpdates.length > 0);
  const isSystem = event.id === 'evt_120';
  newState.transcript.push({
    eventId: event.id,
    timeMs: event.timeMs,
    speaker: isSystem ? 'System' : event.speaker,
    text: event.text,
    causedFieldUpdate,
  });

  // Field updates
  if (event.fieldUpdates) {
    for (const update of event.fieldUpdates) {
      const fieldIdx = newState.fields.findIndex(f => f.id === update.id);
      if (fieldIdx !== -1) {
        newState.fields[fieldIdx] = {
          ...newState.fields[fieldIdx],
          value: update.value,
          status: update.status,
          evidenceEventId: event.id,
          evidenceTimestamp: event.timeMs,
          evidenceText: event.text,
          ...(update.verificationNote ? { verificationNote: update.verificationNote } : {}),
        };
      }
    }
  }

  // Resolve nudge
  if (event.resolveNudgeId) {
    const nudgeIdx = newState.nudges.findIndex(n => n.id === event.resolveNudgeId);
    if (nudgeIdx !== -1) {
      newState.nudges[nudgeIdx] = { ...newState.nudges[nudgeIdx], dismissed: true };
    }
  }

  // Add nudge
  if (event.nudge && !newState.nudges.find(n => n.id === event.nudge!.id)) {
    newState.nudges.push({
      id: event.nudge.id,
      text: event.nudge.text,
      timestamp: event.timeMs,
      dismissed: false,
    });
  }

  // Add alert
  if (event.alert && !newState.alerts.find(a => a.id === event.alert!.id)) {
    newState.alerts.push({
      id: event.alert.id,
      text: event.alert.text,
      severity: event.alert.severity,
      timestamp: event.timeMs,
    });
  }

  // Add action
  if (event.action && !newState.actions.find(a => a.id === event.action!.id)) {
    newState.actions.push({
      id: event.action.id,
      text: event.action.text,
      timestamp: event.timeMs,
      completed: false,
    });
  }

  // Script complete
  if (event.id === 'evt_120') {
    newState.scriptComplete = true;
  }

  return newState;
}

// Build state from scratch up to a given timeMs
function buildStateUpTo(targetMs: number): SessionState {
  let state: SessionState = {
    status: 'live',
    elapsedMs: targetMs,
    speed: 1,
    transcript: [],
    fields: getInitialPDFields(),
    nudges: [],
    alerts: [],
    actions: [],
    processedEventIds: new Set(),
    scriptComplete: false,
  };

  for (const event of DEMO_SCRIPT) {
    if (event.timeMs <= targetMs) {
      state = applyEvent(state, event);
    }
  }

  return state;
}

class SessionEngine {
  private state: SessionState;
  private listeners: Set<SessionStateListener> = new Set();
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private lastTickTime: number | null = null;

  constructor() {
    this.state = this.makeIdleState();
  }

  private makeIdleState(): SessionState {
    return {
      status: 'idle',
      elapsedMs: 0,
      speed: 1,
      transcript: [],
      fields: getInitialPDFields(),
      nudges: [],
      alerts: [],
      actions: [],
      processedEventIds: new Set(),
      scriptComplete: false,
    };
  }

  private notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  subscribe(listener: SessionStateListener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  getState(): SessionState {
    return this.state;
  }

  start() {
    if (this.state.status === 'live') return;
    this.state = { ...this.makeIdleState(), status: 'live', speed: this.state.speed };
    this.state.fields = getInitialPDFields();
    this.lastTickTime = performance.now();
    this.startTicking();
    this.notify();
  }

  pause() {
    if (this.state.status !== 'live') return;
    this.stopTicking();
    this.state = { ...this.state, status: 'paused' };
    this.notify();
  }

  resume() {
    if (this.state.status !== 'paused') return;
    this.state = { ...this.state, status: 'live' };
    this.lastTickTime = performance.now();
    this.startTicking();
    this.notify();
  }

  restart() {
    this.stopTicking();
    const speed = this.state.speed;
    this.state = { ...this.makeIdleState(), speed };
    this.notify();
  }

  endSession() {
    this.stopTicking();
    this.state = { ...this.state, status: 'ended' };
    this.notify();
  }

  setSpeed(speed: 1 | 2) {
    this.state = { ...this.state, speed };
    this.notify();
  }

  jumpTo(targetMs: number) {
    this.stopTicking();
    const speed = this.state.speed;
    const newState = buildStateUpTo(targetMs);
    this.state = { ...newState, speed, status: 'live' };
    this.lastTickTime = performance.now();
    this.startTicking();
    this.notify();
  }

  private startTicking() {
    if (this.intervalId !== null) return;
    this.intervalId = setInterval(() => this.tick(), 100);
  }

  private stopTicking() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.lastTickTime = null;
  }

  private tick() {
    if (this.state.status !== 'live') {
      this.stopTicking();
      return;
    }

    const now = performance.now();
    const delta = this.lastTickTime !== null ? (now - this.lastTickTime) * this.state.speed : 0;
    this.lastTickTime = now;

    let newElapsed = this.state.elapsedMs + delta;
    // Cap at 2 minutes + small buffer
    if (newElapsed > 125000) newElapsed = 125000;

    let newState = { ...this.state, elapsedMs: newElapsed };

    // Process any due events
    for (const event of DEMO_SCRIPT) {
      if (event.timeMs <= newElapsed && !newState.processedEventIds.has(event.id)) {
        newState = applyEvent(newState, event);
      }
    }

    this.state = newState;
    this.notify();
  }
}

// Singleton
export const sessionEngine = new SessionEngine();
