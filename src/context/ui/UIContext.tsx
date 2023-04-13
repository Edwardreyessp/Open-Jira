import { createContext } from "react";

export interface UIContextProps {
  openSidebar: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  // Methods
  openSidebarMenu: () => void;
  closeSidebarMenu: () => void;
  setIsAddingEntry: (isAdding: boolean) => void;
  startDragging: () => void;
  endDragging: () => void;
}

export const UIContext = createContext({} as UIContextProps);
