import "../assets/css/bootstrap.min.css";
import "../assets/scss/main.scss?v=1.4.0";
import "../assets/plugin/hover_css/hover.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// redux
import configureStore from "../redux/store/store";
import { Provider } from "react-redux";
const { store } = configureStore();

import Head from "next/head";
import { CookiesProvider } from "react-cookie";
import { Loader } from "@googlemaps/js-api-loader";
import dynamic from "next/dynamic";
import SocketWrapper from "../components/chat/SocketWrapper";
import { IntercomProvider } from "react-use-intercom";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { toast } from "react-toastify";
const NetworkDetector = dynamic(
  () => import("../components/Common/NetworkDetector"),
  { ssr: false }
);
const GlobalModals = dynamic(
  () => import("../components/Common/GlobalModals/GlobalModals"),
  { ssr: false }
);
const AccountConfigurationWrapper = dynamic(
  () => import("../components/Common/AccountConfigurationWrapper"),
  { ssr: false }
);

const AccountApprovalModal = dynamic(
  () => import("../components/Common/AccountApprovalModal"),
  { ssr: false }
);
const Onboarding = dynamic(
  () => import("../components/Common/OnboardingFeedback/Onboarding"),
  { ssr: false }
);

const loader = new Loader({
  apiKey: process.env.GOOGLE_KEY,
  id: "googleMapsAPI",
  version: "weekly",
  libraries: ["places"],
});
import ReactGA from "react-ga4";

function MyApp({ Component, pageProps, router }) {
  ReactGA.initialize("G-G0VKPSW2TW");
  loader
    .load()
    .then((google) => {})
    .catch((e) => {});

  const INTERCOM_APP_ID = "r7xrw6i3";

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (query.meta.errorMessage) {
          toast.error(
            <div>
              {query.meta.errorMessage}
              <br />
              {error.message}
            </div>
          );
        }
      },
    }),
  });

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        ></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <title>
          GuardPass: Security Workforce Management Software for the UK
        </title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <h1 className="position-fixed"></h1>
          <IntercomProvider
            appId={INTERCOM_APP_ID}
            autoBoot
            style={{ color: "red" }}
            onHide={() => {
              Intercom("update", { hide_default_launcher: true });
            }}
            onShow={() => {
              Intercom("update", { hide_default_launcher: false });
            }}
          >
            <CookiesProvider>
              <SocketWrapper>
                <AccountConfigurationWrapper>
                  <Component {...pageProps} />
                  <AccountApprovalModal />
                  <Onboarding />
                  <ToastContainer />
                  <GlobalModals />
                  <NetworkDetector />
                </AccountConfigurationWrapper>
              </SocketWrapper>
            </CookiesProvider>
          </IntercomProvider>
        </Provider>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
