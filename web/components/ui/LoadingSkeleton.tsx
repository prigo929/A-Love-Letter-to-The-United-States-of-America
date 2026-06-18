"use client";

import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  variant?: "hero" | "grid" | "table" | "generic" | "chart";
  className?: string;
  count?: number;
}

export function LoadingSkeleton({ variant = "generic", className, count = 1 }: LoadingSkeletonProps) {
  if (variant === "hero") {
    return (
      <div className={cn("relative w-full bg-[#050505] overflow-hidden min-h-[70vh] flex flex-col justify-end p-8 md:p-24 border-b border-white/5", className)}>
        {/* Subtle pulsing gold ambient glow */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-glory-gold/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-navy-light/5 blur-[150px] animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-8 animate-pulse">
          {/* Eyebrow placeholder */}
          <div className="h-4 w-32 bg-white/10 rounded" />
          
          {/* Title placeholder */}
          <div className="space-y-3">
            <div className="h-12 md:h-16 w-3/4 max-w-xl bg-gradient-to-r from-white/15 to-white/5 rounded-lg" />
            <div className="h-12 md:h-16 w-1/2 max-w-md bg-gradient-to-r from-[#E8B923]/20 to-transparent rounded-lg" />
          </div>

          {/* Description placeholder */}
          <div className="space-y-2 max-w-2xl pt-4">
            <div className="h-4 w-full bg-white/10 rounded" />
            <div className="h-4 w-5/6 bg-white/10 rounded" />
            <div className="h-4 w-4/5 bg-white/10 rounded" />
          </div>

          {/* Stats cards placeholder */}
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3 pt-12 border-t border-white/5 w-full">
            <div className="h-28 bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
              <div className="h-8 w-24 bg-[#E8B923]/10 rounded" />
              <div className="h-3 w-36 bg-white/10 rounded" />
            </div>
            <div className="h-28 bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
              <div className="h-8 w-32 bg-white/10 rounded" />
              <div className="h-3 w-40 bg-white/10 rounded" />
            </div>
            <div className="h-28 bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
              <div className="h-8 w-20 bg-white/10 rounded" />
              <div className="h-3 w-28 bg-white/10 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className={cn("grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8", className)}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col border border-white/5 bg-white/[0.01] rounded-2xl overflow-hidden p-6 space-y-6 animate-pulse"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            {/* Image placeholder */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-white/5" />
            
            {/* Content placeholders */}
            <div className="space-y-4 flex-1">
              <div className="h-3 w-20 bg-[#E8B923]/10 rounded" />
              <div className="h-7 w-3/4 bg-white/15 rounded" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-white/10 rounded" />
                <div className="h-4 w-5/6 bg-white/10 rounded" />
              </div>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="h-4 w-28 bg-white/10 rounded" />
              <div className="h-4 w-4 bg-[#E8B923]/25 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div className={cn("w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 animate-pulse", className)}>
        {/* Table header */}
        <div className="flex border-b border-white/10 pb-4 justify-between">
          <div className="h-3 w-32 bg-white/10 rounded" />
          <div className="h-3 w-16 bg-white/10 rounded" />
          <div className="h-3 w-24 bg-white/10 rounded" />
          <div className="h-3 w-24 bg-white/10 rounded" />
        </div>
        
        {/* Table rows */}
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex border-b border-white/5 py-5 justify-between items-center"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="h-5 w-48 bg-white/15 rounded" />
            <div className="h-4 w-12 bg-[#E8B923]/15 rounded" />
            <div className="h-4 w-20 bg-white/10 rounded" />
            <div className="h-4 w-28 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "chart") {
    return (
      <div className={cn("w-full bg-white/[0.01] border border-white/5 rounded-2xl p-6 sm:p-8 animate-pulse", className)}>
        <div className="flex flex-col space-y-2 mb-8">
          <div className="h-6 w-1/3 bg-white/15 rounded" />
          <div className="h-3 w-1/2 bg-white/10 rounded" />
        </div>
        
        {/* Chart representation */}
        <div className="h-64 flex items-end gap-3 sm:gap-6 border-b border-l border-white/10 pb-4 pl-4">
          <div className="w-full bg-white/5 rounded-t h-[40%]" />
          <div className="w-full bg-white/5 rounded-t h-[65%]" />
          <div className="w-full bg-white/5 rounded-t h-[50%]" />
          <div className="w-full bg-[#E8B923]/15 rounded-t h-[85%]" />
          <div className="w-full bg-white/5 rounded-t h-[30%]" />
          <div className="w-full bg-white/5 rounded-t h-[55%]" />
        </div>
        
        <div className="flex justify-between mt-4 pl-4">
          <div className="h-3 w-8 bg-white/5 rounded" />
          <div className="h-3 w-8 bg-white/5 rounded" />
          <div className="h-3 w-8 bg-white/5 rounded" />
          <div className="h-3 w-8 bg-white/5 rounded" />
          <div className="h-3 w-8 bg-[#E8B923]/10 rounded" />
          <div className="h-3 w-8 bg-white/5 rounded" />
        </div>
      </div>
    );
  }

  // Generic block skeleton
  return (
    <div className={cn("space-y-4 animate-pulse", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-white/10 rounded w-full" />
          <div className="h-4 bg-white/10 rounded w-5/6" />
          <div className="h-4 bg-white/10 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}
