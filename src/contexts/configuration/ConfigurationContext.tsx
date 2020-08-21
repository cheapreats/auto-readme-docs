import React, { useContext, useReducer } from "react";
import { Dispatch } from "react";

export interface IConfigurationState {
  CollapsibleFolder: boolean;
  RegexKeyword: string;
  Filter: string;
}

export enum useConfigurationActions {
  UPDATE_STATE,
  UPDATE_CONFIGURATION,
  RESET_STATE,
}

interface IConfigurationContextProviderProps {
  children: React.ReactNode;
}

const initialState = {
  CollapsibleFolder: true,
  RegexKeyword: "Preview",
  Filter: "FilterType.NULL",
};

const ConfigurationStateContext = React.createContext<
  IConfigurationState | undefined
>(undefined);
const ConfigurationDispatchContext = React.createContext<
  Dispatch<ConfigurationReducerAction> | undefined
>(undefined);

type UPDATE_CONFIGURATION = {
  type: useConfigurationActions.UPDATE_CONFIGURATION;
  payload: IConfigurationState;
};

type UPDATE_STATE = {
  type: useConfigurationActions.UPDATE_STATE;
  payload: IConfigurationState;
};

type RESET_STATE = {
  type: useConfigurationActions.RESET_STATE;
  payload: IConfigurationState;
};

type ConfigurationReducerAction =
  | UPDATE_CONFIGURATION
  | UPDATE_STATE
  | RESET_STATE;

const ConfigurationReducer = (
  state: IConfigurationState,
  action: ConfigurationReducerAction
) => {
  switch (action.type) {
    case useConfigurationActions.UPDATE_CONFIGURATION:
      return { ...state, showMigrationDeprecationPopup: action.payload };
    case useConfigurationActions.UPDATE_STATE:
      return { ...state, ...action.payload };
    case useConfigurationActions.RESET_STATE:
      return { ...state };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};

const ConfigurationContextProvider: React.FC<IConfigurationContextProviderProps> = ({
  children,
}) => {
  // @ts-ignore
  const [state, dispatch] = useReducer(ConfigurationReducer, initialState);

  return (
    <ConfigurationStateContext.Provider value={state}>
      <ConfigurationDispatchContext.Provider value={dispatch}>
        {children}
      </ConfigurationDispatchContext.Provider>
    </ConfigurationStateContext.Provider>
  );
};

const useConfigurationStateContext: () => IConfigurationState = () => {
  const context = useContext(ConfigurationStateContext);
  if (context === undefined) {
    throw new Error(
      "useConfigurationStateContext must be used within a ConfigurationContextProvider"
    );
  }
  return context;
};

const useConfigurationDispatchContext: () => Dispatch<
  ConfigurationReducerAction
> = () => {
  const context = useContext(ConfigurationDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useConfigurationDispatchContext must be used within a ConfigurationContextProvider"
    );
  }
  return context;
};

export const useConfigurationContext: () => [
  IConfigurationState,
  Dispatch<ConfigurationReducerAction>
] = () => {
  return [useConfigurationStateContext(), useConfigurationDispatchContext()];
};

export { ConfigurationContextProvider };
