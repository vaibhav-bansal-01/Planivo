import React from "react";

function StatsCard({
  icon: Icon,
  title,
  value,
  description,
  iconBg,
  iconColor,
}) {
  return (
    <div className="flex items-center gap-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-2xl ${iconBg}`}
      >
        <Icon size={30} className={iconColor} />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>

        <h2 className="mt-1 text-5xl font-bold text-gray-900">{value}</h2>

        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export default StatsCard;
