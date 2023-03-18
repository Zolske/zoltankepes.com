import React, { useState } from "react";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { firebaseApp } from "../lib/firebase";
import Button from "./Button";

export default function Signup() {
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
          <Button title={"Sign Up"} type={"submit"} />
          {/* <button title="Sign up" aria-label="Signup" type="submit">
            Create account
          </button> */}
        </div>
      </form>
    </div>
  );
}
