import { IconContext } from "react-icons";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="bg-indigo-200">
      <h2 className="text-center pt-2 text-neutral-700 tracking-widest">
        contact me:
      </h2>
      <div className="flex justify-around">
        <a
          href="https://www.linkedin.com/in/zolt%C3%A1n-kepes-b1922b1bb/?originalSubdomain=uk"
          target="_blank"
          rel="noopener noreferrer"
          title="open new tab with Zoltan's Linkedin profile"
        >
          <IconContext.Provider
            value={{
              className:
                "text-xl inline fill-primary-1000 hover:fill-primary-500 w-16 h-16 m-1 sm:w-10 sm:h-10",
            }}
          >
            <FaLinkedin />
          </IconContext.Provider>
        </a>
        <a
          href="mailto:zoltan.the.kepes@gmail.com?subject=feedback to 'zoltankepes.com'"
          title="open your standard email app with my email address (zoltan.the.kepes@gmail.com) as receiver"
        >
          <IconContext.Provider
            value={{
              className:
                "text-xl inline fill-none stroke-primary-1000 hover:stroke-primary-500 w-16 h-16 m-1 sm:w-10 sm:h-10",
            }}
          >
            <HiOutlineMail />
          </IconContext.Provider>
        </a>
        <a
          href="https://github.com/Zolske?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          title="open new tab with Zoltan's GitHub profile"
        >
          <IconContext.Provider
            value={{
              className:
                "text-xl inline fill-primary-1000 hover:fill-primary-500 w-16 h-16 m-1 sm:w-10 sm:h-10",
            }}
          >
            <FaGithub />
          </IconContext.Provider>
        </a>
      </div>
    </footer>
  );
}
