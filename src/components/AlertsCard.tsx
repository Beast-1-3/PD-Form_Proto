// src/components/AlertsCard.tsx
import { MoreHorizontal, AlertTriangle, Info } from 'lucide-react';
import type { AlertItem } from '../engine/sessionEngine';

interface Props {
  alerts: AlertItem[];
  isLive: boolean;
}

export default function AlertsCard({ alerts, isLive }: Props) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-gray-900">Alerts</h2>
        <MoreHorizontal size={18} className="text-gray-300" />
      </div>

      {alerts.length === 0 ? (
        <p className="text-sm text-gray-400 leading-relaxed py-2">
          {isLive
            ? 'No alerts at this time.'
            : 'Alerts will appear here when something needs your attention.'}
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {alerts.map(alert => (
            <div
              key={alert.id}
              className={`flex gap-3 p-3 rounded-xl border ${
                alert.severity === 'warning'
                  ? 'bg-orange-50 border-orange-100'
                  : 'bg-blue-50 border-blue-100'
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                alert.severity === 'warning' ? 'bg-orange-100' : 'bg-blue-100'
              }`}>
                {alert.severity === 'warning'
                  ? <AlertTriangle size={14} className="text-orange-600" />
                  : <Info size={14} className="text-blue-600" />
                }
              </div>
              <p className={`text-sm leading-snug flex-1 ${
                alert.severity === 'warning' ? 'text-orange-800' : 'text-blue-800'
              }`}>
                {alert.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
