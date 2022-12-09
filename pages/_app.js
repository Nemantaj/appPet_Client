import "../styles/globals.css";
import TopBar from "../components/header";
import { Provider, useSelector } from "react-redux";
import { store } from "../store";
import ScrollTop from "../components/ScrollTop";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <TopBar>
        <Script
          async
          src="https://sdk.cashfree.com/js/ui/2.0.0/cashfree.sandbox.js"
          strategy="beforeInteractive"
          onLoad={() => {
            console.log("Script Loaded");
          }}
        />
        <ScrollTop>
          <Component {...pageProps} />
        </ScrollTop>
      </TopBar>
    </Provider>
  );
}

export default MyApp;
