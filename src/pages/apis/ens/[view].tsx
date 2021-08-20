/** @jsxImportSource theme-ui **/
import Layout from "../../../components/Layout";
import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import BottomSpace from "../../../components/BottomSpace";
import APIDetail from "../../../components/APIDetail";
import { useGetAPIfromENSParamInURL } from "../../../hooks/ens/useGetAPIfromENS";

import { Flex } from "theme-ui";

const ApiView = () => {
  const { data, fetchApiDetails } = useGetAPIfromENSParamInURL();
  return (
    <Layout>
      <Flex>
        <Navbar />
        <main>
          <div className="contents">
            <Header backNav={`Browse API's`} />
            {!!data && <APIDetail api={data} update={fetchApiDetails} />}
            <BottomSpace />
          </div>
        </main>
      </Flex>
    </Layout>
  );
};

export default ApiView;
