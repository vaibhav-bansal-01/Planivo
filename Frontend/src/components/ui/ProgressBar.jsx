import React from "react";

function ProgressBar({
  progress,
  color = "bg-blue-600",
  height = "h-2",
  showPercentage = false,
}) {
  const safeProgress = Math.max(0, Math.min(progress, 100));

  return (
    <div className="w-full">
      {showPercentage && (
        <div className="mb-2 flex justify-end">
          <span className="text-sm font-medium text-gray-600">{progress}%</span>
        </div>
      )}

      <div
        className={`w-full overflow-hidden rounded-full bg-gray-200 ${height}`}
      >
        <div
          className={`${height} ${color} rounded-full transition-all duration-500`}
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
