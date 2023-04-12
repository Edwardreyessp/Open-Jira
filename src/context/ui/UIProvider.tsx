import { NextPage } from "next";
import { UIContext, uiReducer } from "./";
import { useReducer } from "react";

export interface UIState {
  openSidebar: boolean;
}

const UI_INITIAL_STATE: UIState = {
  openSidebar: false,
};

interface UIProviderProps {
  children: React.ReactNode;
}

export const UIProvider: NextPage<UIProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSidebarMenu = () => {
    dispatch({ type: "UI - Open Sidebar" });
  };

  const closeSidebarMenu = () => {
    dispatch({ type: "UI - Close Sidebar" });
  };

  return (
    <UIContext.Provider value={{ ...state, openSidebarMenu, closeSidebarMenu }}>
      {children}
    </UIContext.Provider>
  );
};
