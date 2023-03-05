import Image from "next/image";
// import logo_title from "../assets/images/logo/zoltankepes_laptop_logo.png";
import logo_title from "../assets/images/logo/zoltankepes_laptop_logo.svg";

export default function Navbar() {
  function handleClick() {
    const html = document.getElementsByTagName("html")[0];
    const lightMode = document.getElementById("lightMode");
    const darkMode = document.getElementById("darkMode");

    lightMode.classList.toggle("hidden");
    darkMode.classList.toggle("hidden");
    html.classList.toggle("dark");
  }
  return (
    <>
      <div className="flex justify-between items-center">
        {/* hamburger icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-logo-blue ml-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <header className="flex items-center">
          {/* laptop icon */}
          <Image
            src={logo_title}
            alt="laptop drawn with a black pan"
            priority
            className="w-12 h-12 inline"
          />
          {/* website title */}
          <h1 className="inline font-audiowide text-2xl">
            <span className="text-logo-red ">zoltan</span>
            <span className="text-logo-blue">kepes</span>
            <span className="text-logo-red">.com</span>
          </h1>
        </header>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          id="darkMode"
          className="w-8 h-8 text-logo-blue mr-2"
          onClick={handleClick}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          id="lightMode"
          className="w-8 h-8 text-logo-blue mr-2 hidden"
          onClick={handleClick}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
      </div>
    </>
  );
}
