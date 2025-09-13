import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, Component } from '../types';

const initialState: AppState = {
  components: [],
  selectedComponent: null,
  previewMode: false,
};

type AppAction =
  | { type: 'ADD_COMPONENT'; payload: Component }
  | { type: 'UPDATE_COMPONENT'; payload: { id: string; updates: Partial<Component> } }
  | { type: 'SELECT_COMPONENT'; payload: string | null }
  | { type: 'DELETE_COMPONENT'; payload: string }
  | { type: 'TOGGLE_PREVIEW_MODE' };

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_COMPONENT':
      return {
        ...state,
        components: [...state.components, action.payload],
      };
    case 'UPDATE_COMPONENT':
      return {
        ...state,
        components: state.components.map(component =>
          component.id === action.payload.id
            ? { ...component, ...action.payload.updates }
            : component
        ),
      };
    case 'SELECT_COMPONENT':
      return {
        ...state,
        selectedComponent: action.payload,
      };
    case 'DELETE_COMPONENT':
      return {
        ...state,
        components: state.components.filter(
          component => component.id !== action.payload
        ),
        selectedComponent:
          state.selectedComponent === action.payload
            ? null
            : state.selectedComponent,
      };
    case 'TOGGLE_PREVIEW_MODE':
      return {
        ...state,
        previewMode: !state.previewMode,
      };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);