import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { createContext, useState } from "react";

// create context for logged in user information
export const UserLoggedInContext = createContext({});

export default function App({ Component, pageProps }: AppProps) {
  // initiate "userLoggedIn" to an empty object, which will be populated
  // once the user log's in via the "setUserLoggedIn" hook.
  const [userLoggedIn, setUserLoggedIn] = useState({});
  return (
    // provide the entire app with the "UserLoggedInContext" with the hire passed values
    <UserLoggedInContext.Provider value={{ userLoggedIn, setUserLoggedIn }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserLoggedInContext.Provider>
  );
}
