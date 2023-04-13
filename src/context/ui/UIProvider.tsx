import { NextPage } from "next";
import { UIContext, uiReducer } from "./";
import { useReducer } from "react";

export interface UIState {
  openSidebar: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  openSidebar: false,
  isAddingEntry: false,
  isDragging: false,
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

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: "UI - Set isAddingEntry", payload: isAdding });
  };

  const startDragging = () => {
    dispatch({ type: "UI - Start Dragging" });
  };

  const endDragging = () => {
    dispatch({ type: "UI - End Dragging" });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,

        // Methods
        openSidebarMenu,
        closeSidebarMenu,

        setIsAddingEntry,

        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
