import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import {
  AuthErrorCodes,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseApp } from "../lib/firebase";

type SignInSignUpProps = {
  openModale: boolean;
};

export default function SignInSignUp({ openModale }: SignInSignUpProps) {
  let [isOpen, setIsOpen] = useState(openModale);
  let completeButtonRef = useRef(null);

  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // initialised auth instance
  const auth = getAuth(firebaseApp);

  // handle form submit
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    let email = input.email.toLowerCase().trim();
    let password = input.password;

    // sign in user
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential.user);
        // ...
      })
      .catch((err) => {
        if (
          err.code === AuthErrorCodes.INVALID_PASSWORD ||
          err.code === AuthErrorCodes.USER_DELETED
        ) {
          setError("The email address or password is incorrect");
        } else {
          console.log(err.code);
          alert(err.code);
        }
      });
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0" aria-hidden="true" />
        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="w-fit rounded bg-neutral-100 p-4">
            <Dialog.Title>Sign In</Dialog.Title>
            <Dialog.Description>
              <div className="form-body">
                <form
                  autoComplete="off"
                  className="form"
                  onSubmit={handleSubmit}
                >
                  <p>Fill the form below to sign in to your account.</p>
                  <div className="email-input">
                    <input
                      name="email"
                      placeholder="Enter email"
                      type="text"
                      onChange={handleChange}
                      value={input.email}
                      required
                      autoComplete="true"
                    />
                    <label htmlFor="email" className="label-name">
                      <span className="content-name">Email</span>
                    </label>
                  </div>
                  <div className="password-input">
                    <input
                      name="password"
                      placeholder="Enter password"
                      onChange={handleChange}
                      value={input.password}
                      type="password"
                      required
                      autoComplete="true"
                    />
                    <label htmlFor="password" className="label-name">
                      <span className="content-name">Password</span>
                    </label>
                  </div>
                  <div className="btn">
                    {error ? <p className="login-error">{error}</p> : null}
                    <button title="Login" aria-label="Login" type="submit">
                      Login
                    </button>
                  </div>
                </form>
                <div className="option">
                  <p>
                    Don t have an account?
                    {/* <Link to="/signup">Sign Up</Link> */}
                  </p>
                </div>
              </div>
            </Dialog.Description>

            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}
