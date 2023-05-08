import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { LoggedUserContext } from "../lib/Contexts";
import { useContext } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const LoggedUserData = useContext(LoggedUserContext);

  return (
    <>
      <Head>
        <title>zoltankepes.com</title>
        <meta
          name="description"
          content="The site contains Zoltan's notes and projects."
        />
        <meta name="keywords" content="coding notes, Zoltan's portfolio"></meta>
        <meta name="author" content="Zoltan Kepes"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Home</h1>
      {LoggedUserData?.adminMarkdownNote && (
        <p>is admin : {typeof LoggedUserData.adminMarkdownNote}</p>
      )}
    </>
  );
}
