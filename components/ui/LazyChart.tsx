"use client";

import React, { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface LazyChartProps {
  children: React.ReactNode;
  height?: string | number;
  className?: string;
  offset?: string; // e.g. "200px" to start loading before it's actually visible
}

/**
 * LazyChart Wrapper
 * 
 * Delays the actual DOM mounting of heavy chart components until they are
 * close to the viewport. This reduces the initial Total Blocking Time (TBT)
 * and saves memory on pages with many data visualizations.
 */
export function LazyChart({
  children,
  height = "300px",
  className,
  offset = "200px",
}: LazyChartProps) {
  const [hasRendered, setHasRendered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // margin: "200px" means "start loading when the component is 200px away from the viewport"
  const isInView = useInView(containerRef, { 
    once: true, 
    margin: `0px 0px ${offset} 0px` as any 
  });

  useEffect(() => {
    if (isInView && !hasRendered) {
      setHasRendered(true);
    }
  }, [isInView, hasRendered]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden", className)}
      style={{ minHeight: hasRendered ? "auto" : height }}
    >
      {hasRendered ? (
        children
      ) : (
        <div 
          className="flex items-center justify-center bg-white/5 animate-pulse rounded-2xl"
          style={{ height }}
        >
          <div className="text-white/20 font-body text-xs uppercase tracking-widest">
            Loading Data Visualization...
          </div>
        </div>
      )}
    </div>
  );
}
