import { Html, Head, Main, NextScript } from "next/document";
import React, { useState } from "react";

export default function Document() {
  return (
    <Html lang="en">
      {/* google font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap"
        rel="stylesheet"
      />
      <Head />
      <body
        className="h-screen bg-gradient-to-tl from-yellow-100  via-green-100 to-indigo-100
      dark:bg-gradient-to-tl dark:from-neutral-500  dark:via-neutral-600 dark:to-neutral-700
      "
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
