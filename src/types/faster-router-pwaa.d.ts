declare module 'faster-router-pwaa' {
  export interface IPWARouteItem {
    title?: string;
    subPath?: IPWARoutes;
  }

  export interface IPWARoutes {
    [path: string]: IPWARouteItem;
  }
}

export interface IPWARouteItem {
  title?: string;
  subPath?: IPWARoutes;
  path?: string;
  icon?: FC<any>;
}

export interface IPWARoutes {
  [path: string]: IPWARouteItem;
}
