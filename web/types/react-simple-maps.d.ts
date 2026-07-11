declare module "react-simple-maps" {
  import type { ComponentType } from "react";

  export const ComposableMap: ComponentType<Record<string, unknown>>;
  export const Geographies: ComponentType<Record<string, unknown>>;
  export const Geography: ComponentType<Record<string, unknown>>;
  export const Marker: ComponentType<Record<string, unknown>>;
  export const Line: ComponentType<Record<string, unknown>>;
  export const ZoomableGroup: ComponentType<Record<string, unknown>>;
  /** Returns the live d3 projection (plus width/height) for custom layers. */
  export function useMapContext(): {
    width: number;
    height: number;
    projection: (coords: [number, number]) => [number, number] | null;
  };
}
