// src/components/NudgesCard.tsx
import { Volume2, MoreHorizontal, Lightbulb, X } from 'lucide-react';
import type { NudgeItem } from '../engine/sessionEngine';

interface Props {
  nudges: NudgeItem[];
  isLive: boolean;
}

export default function NudgesCard({ nudges, isLive }: Props) {
  const activeNudges = nudges.filter(n => !n.dismissed);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-gray-900">Nudges</h2>
        <div className="flex items-center gap-2">
          {isLive && (
            <div className="flex items-center gap-1 text-[#5B5BD6]">
              <Volume2 size={13} />
              <span className="text-xs font-semibold">Active:{activeNudges.length.toString().padStart(2, '0')}</span>
            </div>
          )}
          <MoreHorizontal size={18} className="text-gray-300" />
        </div>
      </div>

      {!isLive && nudges.length === 0 ? (
        <p className="text-sm text-gray-400 leading-relaxed py-2">
          Relevant nudges will appear here during the conversation.
        </p>
      ) : nudges.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <div className="w-8 h-8 rounded-full bg-[#5B5BD6]/10 flex items-center justify-center mx-auto mb-2">
            <div className="w-0.5 h-4 bg-[#5B5BD6] rounded-full" />
          </div>
          <p className="text-sm font-semibold text-gray-600 mb-1">Loading live nudges</p>
          <p className="text-xs text-gray-400">
            Coaching tips will appear here as soon as analysis is available for this session.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {nudges.map(nudge => (
            <div
              key={nudge.id}
              className={`flex gap-3 p-3 rounded-xl border transition-opacity ${nudge.dismissed ? 'opacity-40 bg-gray-50 border-gray-100' : 'bg-amber-50 border-amber-100'}`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${nudge.dismissed ? 'bg-gray-200' : 'bg-amber-100'}`}>
                <Lightbulb size={14} className={nudge.dismissed ? 'text-gray-400' : 'text-amber-600'} />
              </div>
              <div className="flex-1">
                <p className={`text-sm leading-snug ${nudge.dismissed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                  {nudge.text}
                </p>
                {nudge.dismissed && (
                  <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">✓ Resolved</span>
                )}
              </div>
              {nudge.dismissed && <X size={14} className="text-gray-300 mt-0.5 flex-shrink-0" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
