import { createContext } from "react";

export interface UIContextProps {
  openSidebar: boolean;
  // Methods
  openSidebarMenu: () => void;
  closeSidebarMenu: () => void;
}

export const UIContext = createContext({} as UIContextProps);
