import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#374151" highlightColor="#4B5563">
      <div className="w-[90%] max-w-xl mt-5 p-3 rounded-2xl bg-gray-800 shadow-xl border border-gray-700">
        <Skeleton height={40} width="100%" borderRadius={10} className="mb-4" />

        <Skeleton count={4} height={18} borderRadius={8} className="mb-2" />
      </div>
    </SkeletonTheme>
  );
};

export default LoadingSkeleton;
