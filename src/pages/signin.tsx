/** @jsxImportSource theme-ui **/
import { useStateValue } from "../state/state";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import BGWave from "../components/BGWave";
import Header from "../components/Header";
import { domain } from "../constants";

import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Flex, Themed } from "theme-ui";

const SignIn = (): unknown => {
  const [, dispatch] = useStateValue();
  const router = useRouter();

  useEffect(() => {
    void (async () => {
      if (router.query.code) {
        const response = await axios.get(
          domain + `/api/auth/github/callback/${router.query.code}`,
          {
            withCredentials: true,
          }
        );
        if ("access_token" in response.data) {
          dispatch({
            type: "SET_GITHUB_USER",
            payload: response.data.access_token,
          });
        }
        void router.push(localStorage.getItem("w3hubLastURLb4Signin"));
      }
    })();
  }, [router.query]);
  return (
    <Layout>
      <Flex>
        <Navbar />
        <main>
          <div className="contents">
            <Header title="Browse APIs" />
            <section
              className="content"
              sx={{ display: "grid", placeItems: "center", height: "50%" }}
            >
              <Themed.h1>Signing In...</Themed.h1>
            </section>
          </div>
        </main>
      </Flex>
      <BGWave light />
    </Layout>
  );
};

export default SignIn;
