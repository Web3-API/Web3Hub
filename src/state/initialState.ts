import { networkID } from "../constants";
import { APIData } from "../hooks/ens/useGetAPIfromENS";

import ethers from "ethers";
import { PluginRegistration, UriRedirect } from "@web3api/client-js";
import { ipfsPlugin } from "@web3api/ipfs-plugin-js";
import { ethereumPlugin } from "@web3api/ethereum-plugin-js";

export interface State {
  dapp: DappType;
  web3api: {
    plugins: PluginRegistration[];
  };
  publish: PublishType;
  search: SearchType;
}

export const initialState: State = {
  dapp: {
    balance: "-1",
    address: undefined,
    wallet: {
      name: "TEST",
    },
    network: networkID,
    web3: undefined,
    apis: [],
    github: "",
    did: undefined,
  },
  web3api: {
    plugins: [
      {
        uri: "ens/ethereum.web3api.eth",
        plugin: ethereumPlugin({
          networks: {
            mainnet: {
              provider:
                "https://mainnet.infura.io/v3/b00b2c2cc09c487685e9fb061256d6a6",
            },
          },
        }),
      },
      {
        uri: "w3://ens/ipfs.web3api.eth",
        plugin: ipfsPlugin({ provider: "https://ipfs.io" }) as undefined,
      },
    ],
  },
  publish: {
    subdomain: "",
    ipfs: "",
    subdomainError: "",
    subdomainLookupSuccess: false,
    subdomainRegisterSuccess: false,
    subdomainLoading: false,
    ipfsLoading: false,
    ipfsError: "",
    ipfsSuccess: false,
    showConnectModal: false,
    showSignInModal: false,
    showSuccessModal: false,
    apiData: undefined,
    registrationStatus: -1,
  },
  search: {
    sortedApi: [],
  },
};

type DappType = {
  balance: string;
  address: string;
  wallet: { name: string };
  network: number;
  web3?: ethers.providers.JsonRpcProvider;
  apis: APIData[];
  github?: string;
  did?: string;
};

type Web3apiType = {
  redirects: UriRedirect[];
};

type PublishType = {
  subdomain: string;
  ipfs: string;
  subdomainError: string;
  subdomainLookupSuccess: boolean;
  subdomainRegisterSuccess: boolean;
  subdomainLoading: boolean;
  ipfsLoading: boolean;
  ipfsError: string;
  ipfsSuccess: boolean;
  showConnectModal: boolean;
  showSignInModal: boolean;
  showSuccessModal: boolean;
  apiData: APIData | undefined;
  registrationStatus: number;
};

type SearchType = {
  sortedApi: -1 | APIData[];
};

export default initialState;
export type { DappType };
export type { Web3apiType };
export type { PublishType };
export type { SearchType };
