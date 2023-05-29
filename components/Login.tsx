import {
  AuthErrorCodes,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { firebaseApp } from "../lib/firebase";
import { useState } from "react";
import Button from "./Button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { IconContext } from "react-icons";

export default function Login() {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // initialised auth instance
  const auth = getAuth(firebaseApp);

  let email;
  let password;

  // handle form submit
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    email = input.email.toLowerCase().trim();
    password = input.password;

    // sign in user
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // console.log(userCredential.user);
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

  // google sign-in
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // console.log(result);
        // console.log(result.user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        setError(error.code);
        console.log(error.code);
      });
  };

  // github auth
  const githubSignIn = () => {
    const provider = new GithubAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        setError(error.code);
        console.log(error.code);
      });
  };

  // sign user out if tab or window is closed
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return signInWithEmailAndPassword(auth, email, password);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  return (
    <div className="form-body">
      <form autoComplete="off" className="form" onSubmit={handleSubmit}>
        <p className="italic text-neutral-500 text-center mt-1">
          Fill the form below to sign in to your account with your{" "}
          <em className="font-bold">email</em> address.
        </p>
        <div className="email-input mt-4">
          <label htmlFor="email" className="label-text">
            Email:
          </label>
          <input
            name="email"
            placeholder=" Enter email"
            type="text"
            onChange={handleChange}
            value={input.email}
            required
            autoComplete="true"
            className="border-2 rounded-sm border-neutral-100 shadow-inner z-placeholder w-full"
          />
        </div>
        <div className="password-input mt-4">
          <label htmlFor="password" className="label-text">
            Password:
          </label>
          <input
            name="password"
            placeholder=" Enter password"
            onChange={handleChange}
            value={input.password}
            type="password"
            required
            autoComplete="true"
            className="border-2 rounded-sm border-neutral-100 shadow-inner z-placeholder w-full"
          />
        </div>
        <div className="btn mt-4">
          <div className="flex justify-center">
            <Button
              title={" login with email & password"}
              type={"submit"}
              aria={"login with email and password"}
              tip={"login with email and password"}
              iconLeft={
                <IconContext.Provider value={{ className: "text-xl inline" }}>
                  <AiOutlineMail />
                </IconContext.Provider>
              }
            />
          </div>
          {/* <button title="Login" aria-label="Login" type="submit">
            Login
          </button> */}

          {error ? (
            <div>
              <hr className="text-neutral-300" />
              <h3 className="font-bold text-red-800">Error Message:</h3>
              <p className="login-error text-red-600">{error}</p>
            </div>
          ) : null}
          <hr className="text-neutral-300" />
          <p className="italic text-neutral-500 text-center mt-1">
            Or login with your <em className="font-bold">Google</em> or{" "}
            <em className="font-bold">GitHub</em> account.
          </p>
          <div className="flex justify-center">
            <Button
              style={3}
              callBack={googleSignIn}
              aria={"Sign in with Google"}
              tip={"Sign in with Google"}
              iconLeft={
                <IconContext.Provider value={{ className: "text-xl inline" }}>
                  <FcGoogle />
                </IconContext.Provider>
              }
              title={""}
            />
            <Button
              style={3}
              callBack={githubSignIn}
              aria={"Sign in with Github"}
              tip={"Sign in with Github"}
              iconLeft={
                <IconContext.Provider value={{ className: "text-xl inline" }}>
                  <FaGithub />
                </IconContext.Provider>
              }
              title={""}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
