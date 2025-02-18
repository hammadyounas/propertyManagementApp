import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import PageLayout from "@/components/combined/organisms/PageLayoutUIContainer";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      // Clear the Authorization header if there's no token
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  return (
    <Provider store={store}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
      <Toaster />
    </Provider>
  );
}
