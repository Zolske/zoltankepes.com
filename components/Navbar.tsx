import Image from "next/image";
// import logo_title from "../assets/images/logo/zoltankepes_laptop_logo.png";
import logo_title from "../assets/images/logo/zoltankepes_laptop_logo.svg";
import { useState, useContext } from "react";
import SignInSignUp from "./SignInSignUp";
import ToggleButton from "./ToggleButton";
import Button from "./Button";
import ButtonToggle from "./ButtonToggle";
import { SlLogin } from "react-icons/sl";
import { IconContext } from "react-icons";
import { useEffect } from "react";
import Link from "next/link";

import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();

export default function Navbar() {
  // for url image loading
  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  const [mode, setMode] = useState("dark");
  const [userData, setUserData] = useState<any>(false);

  function handleClickMode() {
    const html = document.getElementsByTagName("html")[0];
    const lightMode = document.getElementById("lightMode");
    const darkMode = document.getElementById("darkMode");

    lightMode?.classList.toggle("hidden");
    darkMode?.classList.toggle("hidden");
    html.classList.toggle("dark");
    setMode(mode === "dark" ? "light" : "dark");
  }

  function handleClickMenu() {
    const bar_1 = document.getElementById("bar_1");
    const bar_2 = document.getElementById("bar_2");
    const bar_3 = document.getElementById("bar_3");
    const sidepanel = document.getElementById("sidepanel");

    bar_1?.classList.toggle("translate-y-1");
    bar_1?.classList.toggle("rotate-[-45deg]");
    bar_2?.classList.toggle("opacity-0");
    bar_3?.classList.toggle("translate-y-[-0.5rem]");
    bar_3?.classList.toggle("rotate-[45deg]");
    sidepanel?.classList.toggle("translate-x-[360px]");
    // sidepanel?.classList.toggle("left-full");
    // sidepanel?.classList.toggle("origin-left");
  }

  // const handleChild = (callback) => {
  //   // Here, you have the function from the child.
  //   console.log("Hello Zolsk");
  //   callback();
  // };

  const handleParent = () => {
    console.log("parent click");
  };

  const iconTest = (
    <IconContext.Provider
      value={{ className: "fill-primary-500 text-xl inline" }}
    >
      <SlLogin />
    </IconContext.Provider>
  );

  onAuthStateChanged(auth, (user) => {
    if (user && !userData) {
      setUserData({ name: user.displayName, image: user.photoURL });
    } else if (!user) {
      setUserData(false);
    }
  });
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        {/* hamburger icon */}
        <div
          className="cursor-pointer bg-primary-200  dark:bg-primary-1000 h-10 pr-4 rounded-r-full mt-0.5 flex items-center shadow-md group"
          onClick={handleClickMenu}
          title="menu"
        >
          <div>
            <div
              id="bar_1"
              className="w-8 h-0.5 bg-primary-1000 dark:bg-indigo-100 mt-1 mb-1 ml-2 transition duration-300 ease-in-out group-hover:bg-primary-500"
            ></div>
            <div
              id="bar_2"
              className="w-8 h-0.5 bg-primary-1000 dark:bg-indigo-100 mb-1 ml-2 transition duration-300 ease-in-out group-hover:bg-primary-500"
            ></div>
            <div
              id="bar_3"
              className="w-8 h-0.5 bg-primary-1000 dark:bg-indigo-100 mt-1 mb-1 ml-2 transition duration-300 ease-in-out group-hover:bg-primary-500"
            ></div>
          </div>
        </div>
        <Link href="/">
          {/* no logged in user or data */}
          {!userData && (
            <header className="flex items-center bg-primary-200 h-12 mt-0 rounded-b-3xl shadow-md pl-2 pr-2">
              {/* laptop icon */}
              <Image
                src={logo_title}
                alt="laptop drawn with a black pan"
                priority
                className="w-10 h-10 inline"
              />
              {/* website title */}
              <h1 className="inline font-audiowide text-xl">
                <span className="text-logo-red ">zoltan</span>
                <span className="text-logo-blue">kepes</span>
                <span className="text-logo-red">.com</span>
              </h1>
            </header>
          )}
          {/* logged in user and data */}
          {userData && (
            <header className="flex items-center bg-primary-200 h-20 mt-0 rounded-b-3xl shadow-md pl-2 pr-2">
              {/* laptop icon */}
              <Image
                src={logo_title}
                alt="laptop drawn with a black pan"
                priority
                className="w-10 h-10 inline"
              />
              {/* website title */}
              <div className="flex flex-col items-center m-1">
                <h1 className="inline font-audiowide text">
                  <span className="text-logo-red ">zoltan</span>
                  <span className="text-logo-blue">kepes</span>
                  <span className="text-logo-red">.com</span>
                </h1>
                <span className="text-logo-blue text-xs">Welcome</span>
                <span className="text-logo-red font-audiowide text">
                  {userData.name}
                </span>
              </div>
              {userData.image && (
                <Image
                  className=" rounded-full w-10 h-10 inline"
                  // loader={myLoader}
                  src={userData.image}
                  alt={`user image`}
                  width={40}
                  height={40}
                />
              )}
            </header>
          )}
        </Link>
        {/* login or sign up button*/}
        <SignInSignUp />
      </div>
      {/* sidepanel triggered through hamburger menu */}
      <div
        id="sidepanel"
        className="w-[360px] fixed z-10 h-[250px] top-24 -left-[360px]  bg-neutral-300 overflow-x-hidden transition duration-1000 ease-in-out rounded-r-xl shadow-lg"
      >
        <div className="bg-indigo-200 shadow-lg">
          <h2 className="ml-2 text-indigo-600 bg-indigo-100 w-fit pl-1 pr-2 rounded-r-full">
            Settings
          </h2>
        </div>
        {/* dark / light mode button */}
        <div
          className="ml-2 w-fit bg-indigo-100 h-8 rounded-full mb-2 mt-1 flex"
          onClick={handleClickMode}
        >
          <div className="cursor-pointer w-fit pl-3 pr-3 bg-primary-200 h-8 rounded-full flex items-center shadow-md text-primary-1000 dark:text-indigo-100 dark:bg-primary-1000">
            {/* dark mode button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              id="darkMode"
              className="w-6 h-6 text-primary-1000 hover:fill-primary-1000"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
            {/* light mode button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              id="lightMode"
              className="w-6 h-6 text-indigo-100  hidden hover:fill-indigo-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          </div>
          <span className="self-center text-indigo-600 ml-2 mr-2 text-sm">
            turn on {mode} mode
          </span>
        </div>
        {/* pages section */}
        <div className="bg-indigo-200 shadow-lg">
          <h2 className="ml-2 text-indigo-600 bg-indigo-100 w-fit pl-1 pr-2 rounded-r-full">
            Pages
          </h2>
        </div>
        <Link href="/" onClick={handleClickMenu} className="block">
          Home
        </Link>
        <Link href="/notes" onClick={handleClickMenu} className="block">
          Notes
        </Link>
      </div>
    </>
  );
}
