/** @jsxImportSource theme-ui **/
import { useStateValue } from "../state/state";
import Layout from "../components/Layout";
import SortNav from "../components/SortNav";
import ApiGrid from "../components/ApiGrid";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import BGWave from "../components/BGWave";
import BottomSpace from "../components/BottomSpace";

import { Flex } from "theme-ui";

const Home = () => {
  const [{ dapp }] = useStateValue();
  return (
    <Layout>
      <Flex>
        <Navbar />
        <main>
          <div className="contents animate">
            <Header title="Browse APIs" />
            <section className="content">
              <SortNav />
              {dapp?.apis ? <ApiGrid main apis={dapp.apis} /> : null}
            </section>
            <BottomSpace />
          </div>
        </main>
      </Flex>
      <BGWave light />
    </Layout>
  );
};

export default Home;
