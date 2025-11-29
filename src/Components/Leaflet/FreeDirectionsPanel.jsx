import React from 'react';

const FreeDirectionsPanel = ({ route, anomalies = [] }) => {
  if (!route) return null;

  const criticalAnomalies = anomalies.filter(
    (a) => a.severity === 'critical' || a.severity === 'high'
  );
  const totalDistance = (route.distance / 1000).toFixed(1);
  const totalDuration = Math.round(route.duration / 60);

  return (
    <div className="absolute right-4 top-32 z-[1000] max-h-[500px] max-w-sm overflow-hidden rounded-lg bg-white shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-white/20">
            <span className="text-sm">📍</span>
          </div>
          <h3 className="font-semibold">Route Directions</h3>
        </div>

        <div className="mt-2 flex items-center justify-between text-sm">
          <div>
            <span className="font-medium">{totalDistance} km</span>
            <span className="text-blue-100"> • {totalDuration} min</span>
          </div>
          <div className="text-xs text-blue-100">
            {route.steps.length} steps
          </div>
        </div>
      </div>

      {/* Anomaly Warning */}
      {criticalAnomalies.length > 0 && (
        <div className="border-b border-red-200 bg-red-50 p-3">
          <div className="flex items-center gap-2 text-red-800">
            <span className="text-lg">⚠️</span>
            <div>
              <div className="text-sm font-semibold">Route Warning</div>
              <div className="text-xs">
                {criticalAnomalies.length} critical anomaly
                {criticalAnomalies.length > 1 ? 's' : ''} detected
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Directions List */}
      <div className="max-h-80 overflow-y-auto">
        <div className="space-y-3 p-4">
          {route.steps.map((step, index) => (
            <div
              key={index}
              className="group flex gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
            >
              <div className="flex flex-col items-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                  {index + 1}
                </div>
                {index < route.steps.length - 1 && (
                  <div className="mt-1 h-full w-0.5 flex-1 bg-gray-200"></div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div
                  className="text-sm leading-relaxed text-gray-800"
                  dangerouslySetInnerHTML={{
                    __html: step.maneuver.instruction,
                  }}
                />
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                  <span>↦ {(step.distance / 1000).toFixed(1)} km</span>
                  <span>•</span>
                  <span>⏱️ {Math.round(step.duration / 60)} min</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      {/* <div className="border-t bg-gray-50 p-3">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>Powered by OSRM</span>
          <span>OpenStreetMap</span>
        </div>
      </div> */}
    </div>
  );
};

export default FreeDirectionsPanel;
