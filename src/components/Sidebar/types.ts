import { IPWARoutes } from "faster-router-pwa";
import { FC } from "react";

// Exportar todas las interfaces como named exports para mejor compatibilidad
export interface PopoverProps {
  routes: IPWARoutes;
  parent?: string;
  navigate: any;
}

export interface SubMenuProps {
  routes: any;
  onItemClick: (path: string) => void;
  onClose: () => void;
  parentTitle?: string;
  level?: number;
  parentPath?: string;
  title?: string;
  parentRoute?: {
    title: string;
    path: string;
  };
  isMobile?: boolean;
}

export interface PopoverItemProps {
  handleClick: () => void;
  icon: FC<any>;
  routes?: IPWARoutes;
  title?: string;
  path?: string;
  parent?: string;
  navigate: any;
}

// Exportar TreeViewProps tanto como default export y como named export
export interface TreeViewProps {
  routes: IPWARoutes;
  parent?: string;
  level?: number;
  isCollapsed?: boolean;
  navigate: any;
}

// Re-exportar como default para mantener compatibilidad con código existente
export default TreeViewProps;
