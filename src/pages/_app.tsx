import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import PageLayout from "@/components/combined/organisms/PageLayoutUIContainer"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </Provider>
  );
}
