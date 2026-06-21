import { useEffect, useState } from "react";

const DashboardCardSD = ({ title, value, icon: Icon, color, loading }) => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowSkeleton(false), 300);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading || showSkeleton) {
    return (
      <div className="p-4 rounded-2xl border border-gray-700 bg-zinc-900 animate-pulse">
        <div className="h-3 w-24 bg-zinc-700 rounded mb-4" />
        <div className="flex items-center justify-between">
          <div className="h-5 w-20 bg-zinc-700 rounded" />
          <div className="h-8 w-8 bg-zinc-700 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 h-[80px] bg-black text-white rounded-2xl border border-gray-700 hover:shadow-xl transition duration-300">
      <div className="flex gap-4 items-center">
        <div className={`p-3 rounded-full bg-gray-100 ${color}`}>
          <Icon className="text-2xl" />
        </div>

        <div>
          <h3 className="text-sm text-gray-400">{title}</h3>
          <p className="text-[11px] font-bold text-amber-400">{value ?? "—"}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCardSD;
