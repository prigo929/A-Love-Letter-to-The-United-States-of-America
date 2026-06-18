import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export default function EconomyLoading() {
  return (
    <div className="bg-[#000000] min-h-screen text-white pb-32">
      <LoadingSkeleton variant="hero" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-16">
        <LoadingSkeleton variant="generic" count={1} />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <LoadingSkeleton variant="chart" />
          <LoadingSkeleton variant="chart" />
        </div>
      </div>
    </div>
  );
}
