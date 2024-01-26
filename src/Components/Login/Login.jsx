import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import app from "../firebase/firebase.config";
import { Link } from "react-router-dom";
const auth = getAuth(app);

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here

    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    if (!/(?=.*?[A-Z])/.test(password)) {
      setError("please add at least one uppercase");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        setError("");
        setSuccess("user login successful");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const handleResetPassword = (event) => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Please enter your email");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please cheek your email");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            ref={emailRef}
            placeholder="Your email"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <p>
        <small>
          Forget the password? please{" "}
          <button onClick={handleResetPassword} className="btn btn-link">
            Reset Password
          </button>{" "}
        </small>
      </p>
      <p>
        <small>
          New to the website? please <Link to="/register">Register</Link>{" "}
        </small>
      </p>
      <p>{success}</p>
      <p>{error}</p>
    </div>
  );
};

export default Login;
