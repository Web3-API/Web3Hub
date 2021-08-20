import { APIData } from "../hooks/ens/useGetAPIfromENS";

import { JsonRpcProvider } from "@web3api/client-js/build/pluginConfigs/Ethereum";

export type StateAction =
  | Web3APIReducerAction
  | SearchAction
  | PublishAction
  | DAppAction;

export type Web3APIReducerAction = {
  type: "recreateplugins";
};

export type SearchAction = {
  type: "sortSelectApi";
  payload: -1 | APIData[];
};

export type PublishAction =
  | SET_SUBDOMAIN
  | SET_IPFS
  | SET_SUBDOMAIN_ERROR
  | SET_SUBDOMAIN_LOOKUP_SUCCESS
  | SET_SUBDOMAIN_REGISTER_SUCCESS
  | SET_SUBDOMAIN_LOADING
  | SET_IPFS_LOADING
  | SET_IPFS_ERROR
  | SET_IPFS_SUCCESS
  | SET_SHOW_CONNECT_MODAL
  | SET_SHOW_SIGNIN_MODAL
  | SET_SHOW_SUCCESS_MODAL
  | SET_API_DATA
  | SET_REGISTRATION_STATUS;

type SET_SUBDOMAIN = { // eslint-disable-line
  type: "setsubdomain";
  payload: string;
};

type SET_IPFS = { // eslint-disable-line
  type: "setipfs";
  payload: string;
};

type SET_SUBDOMAIN_ERROR = { // eslint-disable-line
  type: "setsubdomainError";
  payload: string;
};

type SET_SUBDOMAIN_LOOKUP_SUCCESS = { // eslint-disable-line
  type: "setsubdomainLookupSuccess";
  payload: boolean;
};

type SET_SUBDOMAIN_REGISTER_SUCCESS = { // eslint-disable-line
  type: "setsubdomainRegisterSuccess";
  payload: boolean;
};

type SET_SUBDOMAIN_LOADING = { // eslint-disable-line
  type: "setsubdomainLoading";
  payload: boolean;
};

type SET_IPFS_LOADING = { // eslint-disable-line
  type: "setipfsLoading";
  payload: boolean;
};

type SET_IPFS_ERROR = { // eslint-disable-line
  type: "setipfsError";
  payload: string;
};

type SET_IPFS_SUCCESS = { // eslint-disable-line
  type: "setipfsSuccess";
  payload: boolean;
};

type SET_SHOW_CONNECT_MODAL = { // eslint-disable-line
  type: "setShowConnectModal";
  payload: boolean;
};

type SET_SHOW_SIGNIN_MODAL = { // eslint-disable-line
  type: "setShowSignInModal";
  payload: boolean;
};

type SET_SHOW_SUCCESS_MODAL = { // eslint-disable-line
  type: "setShowSuccessModal";
  payload: boolean;
};

type SET_API_DATA = { // eslint-disable-line
  type: "setApiData";
  payload: APIData;
};

type SET_REGISTRATION_STATUS = { // eslint-disable-line
  type: "registrationStatus";
  payload: number;
};

export type DAppAction =
  | SET_ADDRESS_ACTION
  | SET_NETWORK_ACTION
  | SET_BALANCE_ACTION
  | SET_WALLET_ACTION
  | SET_WEB3_ACTION
  | SET_AVAILABLE_APIS_ACTION
  | SET_AVAILABLE_APIS_ACTION
  | SET_GITHUB_USER_ACTION
  | SET_DID;

type SET_ADDRESS_ACTION = { // eslint-disable-line
  type: "SET_ADDRESS";
  payload: string;
};

type SET_NETWORK_ACTION = { // eslint-disable-line
  type: "SET_NETWORK";
  payload: number;
};

type SET_BALANCE_ACTION = { // eslint-disable-line
  type: "SET_BALANCE";
  payload: string;
};

type SET_WALLET_ACTION = { // eslint-disable-line
  type: "SET_WALLET";
  payload: {
    name: string;
  };
};

type SET_WEB3_ACTION = { // eslint-disable-line
  type: "SET_WEB3";
  payload: JsonRpcProvider;
};

type SET_AVAILABLE_APIS_ACTION = { // eslint-disable-line
  type: "SET_AVAILABLE_APIS";
  payload: APIData[];
};

type SET_GITHUB_USER_ACTION = { // eslint-disable-line
  type: "SET_GITHUB_USER";
  payload: string;
};

type SET_DID = { // eslint-disable-line
  type: "SET_DID";
  payload: string;
};
