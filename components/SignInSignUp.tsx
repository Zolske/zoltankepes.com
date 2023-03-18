import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ButtonToggle from "./ButtonToggle";
import Button from "./Button";

export default function SignInSignUp() {
  let [isOpen, setIsOpen] = useState(false);
  const [signIn, setSignIn] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function switchForm() {
    setSignIn(signIn ? false : true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="cursor-pointer bg-primary-200 h-10 pl-4 rounded-l-full mt-0.5 flex items-center shadow-md text-primary-1000 dark:text-indigo-100 dark:bg-primary-1000"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 mr-1 hover:fill-primary-500 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed top-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all bg-[#fff]">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex items-center justify-between"
                  >
                    {signIn && <span>Login</span>}
                    {!signIn && <span>Sign Up</span>}
                    <Button
                      style={6}
                      title={"close"}
                      tip={"close form"}
                      aria={"close login or sign-up form"}
                      callBack={closeModal}
                    />
                  </Dialog.Title>
                  <div className="mt-2 flex justify-center items-center">
                    <span>login</span>
                    <ButtonToggle
                      onOff={false}
                      style={3}
                      callBack={switchForm}
                      tipLeft={"click and switch to the sign up form"}
                      tipRight={"click and switch to the sign in form"}
                    />
                    <span>sign up</span>
                  </div>
                  <hr></hr>
                  {signIn && <Login />}
                  {!signIn && <Signup />}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
