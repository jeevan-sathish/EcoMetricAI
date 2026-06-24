import { useEffect, useState } from "react";

const sizeMap = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
};

const DashboardCardSD = ({
  title,
  value,
  icon: Icon,
  color,
  loading,
  size,
}) => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    if (loading) {
      setShowSkeleton(true);
      return;
    }

    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [loading]);

  if (loading || showSkeleton) {
    return (
      <div className="p-4 rounded-2xl border border-gray-700  flex flex-col justify-center bg-zinc-900 animate-pulse">
        <div className="h-3 w-24 bg-zinc-700 rounded mb-4" />
        <div className="flex items-center justify-center gap-5">
          <div className="h-8 w-8 bg-zinc-700 rounded-full" />
          <div className="h-5 w-20 bg-zinc-700 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 h-[80px] bg-black text-white rounded-2xl border border-gray-700 hover:shadow-xl transition duration-300 flex items-center">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
        <Icon className={`text-xl ${color}`} />
      </div>

      <div className="ml-4 flex flex-col justify-center">
        <h3 className="text-sm text-gray-400">{title}</h3>

        <p
          className={`${sizeMap[size]} font-bold text-amber-500 leading-tight`}
        >
          {value ?? "—"}
        </p>
      </div>
    </div>
  );
};

export default DashboardCardSD;
