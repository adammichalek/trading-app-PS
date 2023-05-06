import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
        setError("Success");
      })
      .catch((err) => setError(err.message));
  };

  const errorMsg = (error) => {
    switch (error) {
      case "Firebase: Error (auth/user-not-found).":
        return "User does not exist";
      case "Firebase: Error (auth/internal-error).":
        return "Internal error";
      case "Firebase: Error (auth/invalid-email).":
        return "Invalid email";
      case "Firebase: Error (auth/wrong-password).":
        return "Wrong password";
      default:
        return error;
    }
  };

  const loginFormStyle = {
    width: "100%",
    maxWidth: "330px",
    padding: "15px",
    margin: "0 auto",
  };

  return (
    <>
      <Navigation />
      <Container className="mt-4">
        <div className="w-100">
          <form
            className="form-signin"
            onSubmit={login}
            name="login_form"
            style={loginFormStyle}
          >
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="sr-only mb-1">
                Email address
              </label>
              <input
                type="email"
                id="inputEmail"
                className="form-control"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                required=""
                autoFocus=""
              />
            </div>
            <div className="mb-3">
              <label className="sr-only mb-1">Password</label>
              <input
                type="password"
                id="inputPassword"
                className="form-control"
                placeholder="Password"
                required=""
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error ? (
              <div className="alert alert-danger" role="alert">
                {errorMsg(error)}
              </div>
            ) : (
              ""
            )}

            <div className="mb-3 mt-3">
              <button
                className="btn btn-lg btn-primary btn-block"
                type="submit"
              >
                Sign in
              </button>
            </div>
            <p className="mt-5 mb-3 text-muted">Trading App 2022-2023</p>
          </form>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
