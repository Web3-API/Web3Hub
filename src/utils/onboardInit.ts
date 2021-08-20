import { createEthereumProvider } from "./ethereum";
import getOnboard from "./Onboarding";
import { StateAction } from "../state/action";

import { Dispatch } from "react";
import { API } from "bnc-onboard/dist/src/interfaces";

const onboardInit = (dispatch: Dispatch<StateAction>): API => {
  return getOnboard({
    address: async (address) => {
      dispatch({
        type: "SET_ADDRESS",
        payload: address,
      });
    },
    network: (network) => {
      dispatch({
        type: "SET_NETWORK",
        payload: network,
      });
    },
    balance: (balance) => {
      dispatch({
        type: "SET_BALANCE",
        payload: balance,
      });
    },
    wallet: async (wallet) => {
      const web3 = wallet.provider && createEthereumProvider(wallet.provider);
      localStorage.setItem("selectedWallet", wallet.name);

      dispatch({
        type: "SET_WALLET",
        payload: wallet,
      });
      dispatch({
        type: "SET_WEB3",
        payload: web3,
      });
      dispatch({
        type: "recreateplugins",
      });
    },
  });
};

export default onboardInit;
