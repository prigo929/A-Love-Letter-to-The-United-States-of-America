declare module "maplibre-gl" {
  export class Map {
    constructor(options: any);
    addControl(control: any, position?: string): void;
    on(event: string, callback: (...args: any[]) => void): void;
    addSource(id: string, source: any): void;
    addLayer(layer: any): void;
    remove(): void;
  }
  export class NavigationControl {
    constructor(options?: any);
  }
}
