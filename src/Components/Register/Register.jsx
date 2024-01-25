import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";
const auth = getAuth(app);

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = (event) => {
    // 1. prevent page refresh
    event.preventDefault();
    setSuccess("");
    setError("");

    // 2. collect from data
    const email = event.target.email.value;
    const password = event.target.password.value;
    if (!/(?=.*?[A-Z])/.test(password)) {
      setError("please add at least one uppercase");
      return;
    } else if (/(?=.*?[0-9])/.test(password)) {
      setError("please add at least one number");
      return;
    }
    console.log(email, password);
    //  3. create user in firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;

        console.log(loggedUser);
        setError("");
        event.target.reset();
        setSuccess("User has created successfully");
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };
  const handleEmailChange = (event) => {
    console.log(event.target.value);
    // setEmail(event.target.value);
  };
  const handlePasswordBlur = (event) => {
    console.log(event.target.value);
  };
  return (
    <div className="">
      <h2>Please Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="mb-3 bg-white rounded w-100 border text-primary"
          onChange={handleEmailChange}
          type="email"
          name="email"
          id="email"
          placeholder="Your email"
          required
        />
        <br />
        <input
          className="mb-3 bg-white rounded w-100 border text-primary"
          onBlur={handlePasswordBlur}
          type="password"
          name="password"
          id="password"
          placeholder="Your password"
          required
        />
        <br />
        <input className="bg-primary border" type="submit" value="Register" />
      </form>
      {success && <p>{success}</p>}
      <p className="text-danger">{error}</p>
    </div>
  );
};

export default Register;
