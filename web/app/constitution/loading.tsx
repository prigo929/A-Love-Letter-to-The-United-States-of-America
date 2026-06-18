import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export default function ConstitutionLoading() {
  return (
    <div className="bg-[#000000] min-h-screen text-white pb-32">
      <LoadingSkeleton variant="hero" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-16">
        <LoadingSkeleton variant="generic" count={2} />
        <LoadingSkeleton variant="table" count={5} />
      </div>
    </div>
  );
}
