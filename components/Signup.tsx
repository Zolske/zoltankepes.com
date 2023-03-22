import React, { useState } from "react";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { firebaseApp } from "../lib/firebase";
import Button from "./Button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { IconContext } from "react-icons";

export default function Signup() {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // initialised auth instance
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();

  // handle form submit
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    let email = input.email.toLowerCase().trim();
    let password = input.password;

    // creating a new user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        console.log(userCredential.user);
        // ...
      })
      .catch((err) => {
        if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
          setError("The password is too weak.");
        } else if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
          setError("The email address is already in use.");
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

  // sign in with popup
  function googleSignUp() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  }

  // github auth
  function gitHubSignUp() {
    const githubSignIn = () => {
      const provider = new GithubAuthProvider();

      signInWithPopup(auth, provider)
        .then((result) => {
          // console.log(result.user);
        })
        .catch((error) => {
          // Handle Errors here.
          setError(error.code);
          // console.log(error.code);
        });
    };
  }

  return (
    <div className="form-body">
      <form autoComplete="off" className="form" onSubmit={handleSubmit}>
        <p className="italic text-neutral-500 text-center mt-1">
          Fill the form below to create your account.
        </p>
        <div className="email-input mt-4">
          <label htmlFor="email" className="label-name">
            <span className=" text-sm tracking-widest text-neutral-500  block">
              Email:
            </span>
          </label>
          <input
            name="email"
            placeholder="Enter email"
            type="text"
            onChange={handleChange}
            value={input.email}
            required
            autoComplete="true"
            className="border-2 rounded-sm border-neutral-100 shadow-inner"
          />
        </div>
        <div className="password-input mt-4">
          <label htmlFor="password" className="label-name">
            <span className="text-sm tracking-widest text-neutral-500  block">
              Password:
            </span>
          </label>
          <input
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            value={input.password}
            type="password"
            required
            autoComplete="true"
            className="border-2 rounded-sm border-neutral-100 shadow-inner"
          />
        </div>
        <div className="btn mt-4">
          {error ? <p className="login-error">{error}</p> : null}
          <Button
            title={" sign up with email & password"}
            type={"submit"}
            aria={"sign up with email and password"}
            tip={"sign up with email and password"}
            iconLeft={
              <IconContext.Provider value={{ className: "text-xl inline" }}>
                <AiOutlineMail />
              </IconContext.Provider>
            }
          />
          <hr></hr>
          <p className="italic text-neutral-500 text-center mt-1">
            Sign up with your <em className="font-bold">Google</em> or{" "}
            <em className="font-bold">GitHub</em> account.
          </p>
          <div className="flex justify-center">
            <Button
              style={3}
              callBack={googleSignUp}
              aria={"Sign up with your Google account."}
              tip={"Sign up with your Google account."}
              iconLeft={
                <IconContext.Provider value={{ className: "text-xl inline" }}>
                  <FcGoogle />
                </IconContext.Provider>
              }
              title={""}
            />
            <Button
              style={3}
              callBack={gitHubSignUp}
              aria={"Sign up with Github account."}
              tip={"Sign up with Github account."}
              iconLeft={
                <IconContext.Provider value={{ className: "text-xl inline" }}>
                  <FaGithub />
                </IconContext.Provider>
              }
              title={""}
            />
          </div>
          {/* <button title="Sign up" aria-label="Signup" type="submit">
            Create account
          </button> */}
        </div>
      </form>
    </div>
  );
}
