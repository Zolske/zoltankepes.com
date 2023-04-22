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
        className="h-screen bg-gradient-to-br from-indigo-100 via-primary-100 to-yellow-100
        dark:bg-gradient-to-tl dark:from-neutral-600  dark:via-neutral-700 dark:to-neutral-800
        "
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
