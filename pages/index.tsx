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
      <main className="h-screen mx-2 sm:w-2/3 sm:m-auto">
        <h1 className="text-center">
          <span className="rainbow-head">
            Welcome to &quot;zoltankepes.com&quot;
          </span>
        </h1>
        <p className="text-center max-w-3xl m-auto">
          <span className="rainbow-head-2 italic font-medium text-lg">
            Here you can find some of my work or browse through my notes.
            Everything is accessible through the menu on the top left side. Feel
            free to write me an email or to have a look at my GitHub / Linkedin
            page, the links can be found at the bottom of the page.
          </span>
        </p>
        {LoggedUserData?.adminMarkdownNote && (
          <>
            <p>is admin : {typeof LoggedUserData.adminMarkdownNote}</p>
          </>
        )}
      </main>
    </>
  );
}
