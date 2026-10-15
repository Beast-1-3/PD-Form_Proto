// src/components/ActionsCard.tsx
import { MoreHorizontal, CheckSquare, Square } from 'lucide-react';
import type { ActionItem } from '../engine/sessionEngine';

interface Props {
  actions: ActionItem[];
}

export default function ActionsCard({ actions }: Props) {
  const activeCount = actions.filter(a => !a.completed).length;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-gray-900">Actions Generated</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#5B5BD6]">
            Active:{activeCount.toString().padStart(2, '0')}
          </span>
          <MoreHorizontal size={18} className="text-gray-300" />
        </div>
      </div>

      {actions.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-5 text-center">
          {/* Waveform icon */}
          <div className="flex items-center justify-center gap-1 mb-3">
            {[3, 8, 14, 10, 18, 10, 14, 8, 3].map((h, i) => (
              <div
                key={i}
                className="w-[3px] rounded-full bg-[#5B5BD6]"
                style={{ height: `${h}px`, opacity: 0.7 }}
              />
            ))}
          </div>
          <div className="w-16 h-px bg-[#5B5BD6]/30 mx-auto mb-3" />
          <p className="text-sm font-semibold text-gray-600 mb-1">Waiting for action items</p>
          <p className="text-xs text-gray-400 leading-relaxed">
            Actions appear when the live stream detects follow-up work from the conversation.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {actions.map(action => (
            <div
              key={action.id}
              className={`flex gap-3 p-3 rounded-xl border ${
                action.completed ? 'bg-gray-50 border-gray-100' : 'bg-[#F0EFFE] border-[#5B5BD6]/20'
              }`}
            >
              {action.completed
                ? <CheckSquare size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                : <Square size={16} className="text-[#5B5BD6] flex-shrink-0 mt-0.5" />
              }
              <p className={`text-sm leading-snug flex-1 ${action.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                {action.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
