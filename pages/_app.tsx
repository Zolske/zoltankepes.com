import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
// import { LoggedInUserProvider } from "../lib/UserContext";
import { createContext, useState } from "react";

export const UserLoggedInContext = createContext({});

export default function App({ Component, pageProps }: AppProps) {
  const [userLoggedIn, setUserLoggedIn] = useState({});
  return (
    <UserLoggedInContext.Provider value={{ userLoggedIn, setUserLoggedIn }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserLoggedInContext.Provider>
  );
}
