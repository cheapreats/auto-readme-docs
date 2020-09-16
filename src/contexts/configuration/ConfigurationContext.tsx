import React, { useContext, useReducer } from "react";
import { Dispatch } from "react";
import { AuthorTableType } from "../../tree/types";

export interface IConfigurationState {
  CollapsibleFolder: boolean;
  RegexKeyword: string;
  Filter: string;
  APPLICATION_NAME: string;
  GooglePlayLink: string;
  IOSStoreLink: string;
  RepoLogo: string;
  AuthorConfigs: AuthorConfigs;
  WithTableOfContent: boolean;
  IncludePackageCommands: boolean;
  AppDescription: string;
  License: string;
  Backers: string[];
  Sponsors: string[];
}

export interface AuthorConfigs {
  onlyOwner: boolean; // the info of only the repo owner
  AuthorInfo: AuthorInfo; // Informations of the Author(s)
  TableDesign: string; // Style of the Table for copying in clipboard
}
export interface AuthorInfo {
  WithName: boolean; // name of the Author
  WithPicture: boolean; // picture of the Author
  WithContributions: boolean; // number of Contributions
  WithEmail: boolean; // Email of the Author
  WithLocation: boolean; // Location of the Author
  WithTwitterUsername: boolean; // Author's Twitter Username
  WithNumberOfRepos: boolean; // Number of Repositories of the Author
}

const initialAuthorInfo = {
  WithName: true,
  WithPicture: true,
  WithContributions: true,
  WithEmail: false,
  WithLocation: false,
  WithTwitterUsername: false,
  WithNumberOfRepos: false,
};

const initialAuthorConfig = {
  onlyOwner: false,
  AuthorInfo: initialAuthorInfo,
  TableDesign: "Vertical",
};
export enum useConfigurationActions {
  UPDATE_STATE,
  UPDATE_CONFIGURATION,
  RESET_STATE,
}

interface IConfigurationContextProviderProps {
  children: React.ReactNode;
}

export const initialState = {
  CollapsibleFolder: true,
  RegexKeyword: "Preview",
  Filter: "NULL",
  APPLICATION_NAME: "",
  GooglePlayLink: "",
  IOSStoreLink: "",
  RepoLogo: "",
  AuthorConfigs: initialAuthorConfig,
  WithTableOfContent: true,
  IncludePackageCommands: true,
  AppDescription: "",
  License: "",
  Backers: [],
  Sponsors: [],
};

const ConfigurationStateContext = React.createContext<
  IConfigurationState | undefined
>(undefined);
const ConfigurationDispatchContext = React.createContext<
  Dispatch<ConfigurationReducerAction> | undefined
>(undefined);

type UPDATE_STATE = {
  type: useConfigurationActions.UPDATE_STATE;
  payload: IConfigurationState;
};

type RESET_STATE = {
  type: useConfigurationActions.RESET_STATE;
  payload: IConfigurationState;
};

type ConfigurationReducerAction = UPDATE_STATE | RESET_STATE;

const ConfigurationReducer = (
  state: IConfigurationState,
  action: ConfigurationReducerAction
) => {
  switch (action.type) {
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
