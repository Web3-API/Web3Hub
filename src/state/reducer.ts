import {
  DAppAction,
  PublishAction,
  SearchAction,
  StateAction,
  Web3APIReducerAction,
} from "./action";
import { State, initialState } from "./initialState";
import { networks } from "../utils/networks";
import { networkID } from "../constants";

import { PluginRegistration } from "@web3api/client-js";
import { ConnectionConfig, ethereumPlugin } from "@web3api/ethereum-plugin-js";
import { sha3Plugin } from "@web3api/sha3-plugin-js";
import { uts46Plugin } from "@web3api/uts46-plugin-js";

export function web3apiReducer(
  state: State,
  action: Web3APIReducerAction
): State["web3api"] {
  switch (action.type) {
    case "recreateplugins":
      if (state.dapp.web3) {
        const currentNetwork = networks[networkID];
        const networksConfig: Record<string, ConnectionConfig> = {
          [currentNetwork.name]: {
            provider: state.dapp.web3,
            signer: state.dapp.web3.getSigner(),
          },
        };

        const plugins: PluginRegistration[] = [
          {
            uri: "ens/ethereum.web3api.eth",
            plugin: ethereumPlugin({
              networks: networksConfig,
              defaultNetwork: currentNetwork.name,
            }),
          },
          {
            uri: "w3://ens/sha3.web3api.eth",
            plugin: sha3Plugin(),
          },
          {
            uri: "w3://ens/uts46.web3api.eth",
            plugin: uts46Plugin(),
          },
        ];

        return {
          ...state.web3api,
          plugins,
        };
      }
    default: // eslint-disable-line
      return state.web3api;
  }
}

export function searchReducer(_: State, action: SearchAction): State["search"] {
  const newStateObj = initialState.search;
  switch (action.type) {
    case "sortSelectApi":
      newStateObj.sortedApi = action.payload;
      return newStateObj;
  }
}

export function publishReducer(
  state: State,
  action: PublishAction
): State["publish"] {
  const newStateObj = initialState.publish;
  switch (action.type) {
    case "setsubdomain":
      newStateObj.subdomain = action.payload;
      return newStateObj;
    case "setipfs":
      newStateObj.ipfs = action.payload;
      return newStateObj;
    case "setsubdomainError":
      newStateObj.subdomainError = action.payload;
      return newStateObj;
    case "setsubdomainLookupSuccess":
      newStateObj.subdomainLookupSuccess = action.payload;
      return newStateObj;
    case "setsubdomainRegisterSuccess":
      newStateObj.subdomainRegisterSuccess = action.payload;
      return newStateObj;
    case "setsubdomainLoading":
      newStateObj.subdomainLoading = action.payload;
      return newStateObj;
    case "setipfsLoading":
      newStateObj.ipfsLoading = action.payload;
      return newStateObj;
    case "setipfsError":
      newStateObj.ipfsError = action.payload;
      return newStateObj;
    case "setipfsSuccess":
      newStateObj.ipfsSuccess = action.payload;
      return newStateObj;
    case "setShowConnectModal":
      newStateObj.showConnectModal = action.payload;
      return newStateObj;
    case "setShowSignInModal":
      newStateObj.showSignInModal = action.payload;
      return newStateObj;
    case "setShowSuccessModal":
      newStateObj.showSuccessModal = action.payload;
      return newStateObj;
    case "setApiData":
      newStateObj.apiData = action.payload;
      return newStateObj;
    case "registrationStatus":
      newStateObj.registrationStatus = action.payload;
      return newStateObj;
    default:
      return state.publish;
  }
}

export function dappReducer(state: State, action: DAppAction): State["dapp"] {
  const newStateObj: State["dapp"] = initialState.dapp;

  switch (action.type) {
    case "SET_ADDRESS":
      newStateObj.address = action.payload;
      return newStateObj;
    case "SET_NETWORK":
      newStateObj.network = action.payload;
      return newStateObj;
    case "SET_BALANCE":
      newStateObj.balance = action.payload;
      return newStateObj;
    case "SET_WALLET":
      newStateObj.wallet = action.payload;
      return newStateObj;
    case "SET_WEB3":
      newStateObj.web3 = action.payload;
      return newStateObj;
    case "SET_AVAILABLE_APIS":
      newStateObj.apis = action.payload;
      return newStateObj;
    case "SET_GITHUB_USER":
      newStateObj.github = action.payload;
      return newStateObj;
    case "SET_DID":
      newStateObj.did = action.payload;
      return newStateObj;
    default:
      return state.dapp;
  }
}

export default function mainReducer(
  w3hubStates: State,
  action: StateAction
): State {
  // middleware goes here, i.e calling analytics service, etc.
  // localStorage.setItem('w3hubStates.publish', JSON.stringify(w3hubStates.publish))
  return {
    dapp: dappReducer(w3hubStates, action as DAppAction),
    web3api: web3apiReducer(w3hubStates, action as Web3APIReducerAction),
    publish: publishReducer(w3hubStates, action as PublishAction),
    search: searchReducer(w3hubStates, action as SearchAction),
  };
}
