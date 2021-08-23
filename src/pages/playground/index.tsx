/** @jsxImportSource theme-ui **/
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Playground from "../../components/Playground";
import { useStateValue } from "../../state/state";

import { Web3ApiProvider } from "@web3api/react";
import { Global } from "@emotion/react"; // eslint-disable-line
import { Flex } from "theme-ui";

const PlaygroundPage = () => {
  const [{ web3api }] = useStateValue();
  return (
    <Layout>
      <Flex>
        <Navbar />
        <main>
          <div className="contents animate">
            <Header onDark title="Playground" />
            {web3api.plugins && (
              <Web3ApiProvider plugins={web3api.plugins}>
                <Playground />
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
