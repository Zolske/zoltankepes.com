import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ButtonToggle from "./ButtonToggle";
import Button from "./Button";
import { IconContext } from "react-icons";
import { SlLogin } from "react-icons/sl";
import { SlLogout } from "react-icons/sl";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

export default function SignInSignUp() {
  const [isOpen, setIsOpen] = useState(true);
  const [signIn, setSignIn] = useState(true);
  const [userIn, SetUserIn] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function switchForm() {
    setSignIn(signIn ? false : true);
  }

  const auth = getAuth();

  function logout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  onAuthStateChanged(auth, (user) => {
    if (user && !userIn) {
      // User is signed in
      SetUserIn(true);
      closeModal();
    } else if (!user && userIn) {
      // User is signed out
      SetUserIn(false);
    }
  });

  return (
    <>
      {!userIn ? (
        <button
          type="button"
          onClick={openModal}
          title="login or sign up"
          className="cursor-pointer bg-primary-200 h-10 w-[52px] pl-4 rounded-l-full mt-0.5 flex items-center shadow-md  dark:bg-primary-1000"
        >
          <IconContext.Provider
            value={{
              className:
                "fill-primary-1000 text-2xl mt-1 mb-1 mr-2 inline hover:fill-primary-500 dark:bg-indigo-100",
            }}
          >
            <SlLogin />
          </IconContext.Provider>
        </button>
      ) : (
        <button
          type="button"
          onClick={logout}
          title="logout"
          className="cursor-pointer bg-primary-200 h-10 w-[52px] pl-4 rounded-l-full mt-0.5 flex items-center shadow-md  dark:bg-primary-1000"
        >
          <IconContext.Provider
            value={{
              className:
                "fill-primary-1000 text-2xl mt-1 mb-1 mr-2 inline hover:fill-primary-500 dark:bg-indigo-100",
            }}
          >
            <SlLogout />
          </IconContext.Provider>
        </button>
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 flex justify-center"
          onClose={closeModal}
        >
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
