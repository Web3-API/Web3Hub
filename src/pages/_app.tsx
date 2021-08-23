import "animate.css/animate.css";
import theme from "../theme";
import { StateProvider, useStateValue } from "../state/state";
import { fetcherREST } from "../utils/fetcher";
import { useAuth } from "../hooks/useAuth";

import Head from "next/head";
import { ThemeProvider } from "theme-ui";
import { SWRConfig } from "swr";

const swrOptions = {
  // refreshInterval: 10000,
  fetcher: (resource: string) => fetcherREST(resource),
};

interface Props<T> {
  pageProps: React.PropsWithChildren<T>;
  Component: React.FC<T>; // eslint-disable-line
}

function StatefulApp({ pageProps, Component }: Props<any>) { // eslint-disable-line
  const [{ dapp }] = useStateValue();
  useAuth(dapp);
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=Istok+Web:wght@400;700&&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <SWRConfig value={swrOptions}>
        <Component {...pageProps} />
      </SWRConfig>
    </ThemeProvider>
  );
}

function MyApp({ Component, pageProps }: Props<any>) { // eslint-disable-line
  return (
    <StateProvider>
      <StatefulApp pageProps={pageProps} Component={Component} />
    </StateProvider>
  );
}

export default MyApp;
