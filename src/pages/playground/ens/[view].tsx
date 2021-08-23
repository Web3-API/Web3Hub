/** @jsxImportSource theme-ui **/
import Layout from "../../../components/Layout";
import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import Playground from "../../../components/Playground";
import { useGetAPIfromENSParamInURL } from "../../../hooks/ens/useGetAPIfromENS";
import { useStateValue } from "../../../state/state";
import Modal from "../../../components/Modal";

import { useEffect } from "react";
import { Web3ApiProvider } from "@web3api/react";
import { useRouter } from "next/router";
import { Global } from "@emotion/react"; // eslint-disable-line
import { Flex } from "theme-ui";

const PlaygroundPage = () => {
  const router = useRouter();
  const [
    {
      web3api,
      dapp,
      publish: { showSignInModal },
    },
    dispatch,
  ] = useStateValue();
  const { data } = useGetAPIfromENSParamInURL();

  if (
    router.asPath !== "/playground" &&
    !router.asPath.includes("/playground/ens/")
  ) {
    void router.push("/playground");
  }

  useEffect(() => {
    const previouslySelectedWallet = localStorage.getItem("selectedWallet");

    if (!dapp.web3 && !previouslySelectedWallet) {
      dispatch({ type: "setShowSignInModal", payload: true });
    }
  }, [dapp.web3]);
  return (
    <Layout>
      <Flex>
        {showSignInModal && !dapp.web3 && (
          <div sx={{ position: "fixed", top: 0, left: 0, zIndex: 100000 }}>
            <Modal
              screen={"connect"}
              noLeftShift
              close={() => {
                dispatch({ type: "setShowConnectModal", payload: false });
              }}
            />{" "}
          </div>
        )}
        <Navbar />
        <main>
          <div className="contents animate">
            <Header onDark title="Playground" />
            {data !== null && web3api.plugins && (
              <Web3ApiProvider plugins={web3api.plugins}>
                <Playground api={data} />
              </Web3ApiProvider>
            )}
          </div>
        </main>
      </Flex>
      <Global
        styles={(theme: any) => { // eslint-disable-line
          return {
            body: {
              background: theme.colors.w3shade0 + " !important",
            },
          };
        }}
      />
    </Layout>
  );
};

export default PlaygroundPage;
