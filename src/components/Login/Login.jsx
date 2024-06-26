import React, { useEffect, useState } from "react";
import { UserLogin, GoogleSignIn } from "../../apiRequest/apiRequest.js";
import {
  Container,
  Form,
  FormControl,
  InputGroup,
  Button,
  Card,
} from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { successToast, errorToast } from "../../helper/ToasterHelper.js";
import { NavLink, useParams } from "react-router-dom";
import { Auth, Provider } from "../../../firebase.js";
import { signInWithPopup } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [showDemoMessage, setShowDemoMessage] = useState(false);
  const [googleAuthValue, setGoogleAuthValue] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });

  const accountType = useParams().type;

  useEffect(() => {
    if (accountType === "demo") {
      setShowDemoMessage(true);
    }
  }, [accountType]);

  const UserLoginRequest = async (e) => {
    e.preventDefault();

    try {
      if (email.length === 0 || password.length === 0) {
        errorToast("Please fill in all the fields");
        setValidationError(true);
        return;
      }

      setLoading(true);
      const success = await UserLogin(email, password);
      if (!success) {
        errorToast("User not found");
        setValidationError(true);
      }
      if (success) {
        window.location.href = "/";
        successToast("Login successful");
      }
    } catch (error) {
      errorToast("Failed to connect to the server");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const HandleInputFocus = () => {
    setValidationError(false);
  };

  const HandleGoogleSignIn = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(Auth, Provider);
      const displayName = result.user.displayName;

      // Extract first and last names
      const nameParts = displayName.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");

      // Set state values
      setGoogleAuthValue({
        email: result.user.email,
        firstName: firstName,
        lastName: lastName,
      });

      const success = await GoogleSignIn({
        email: result.user.email,
        firstName: firstName,
        lastName: lastName,
      });

      if (success) {
        successToast("Login successful");
        window.location.href = "/";
      }
    } catch (error) {
      errorToast("Failed to connect to the server");
      console.error("Google sign-in failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="center-screen">
        <Col lg={6} md={8} xs={12}>
          <Card className="p-4 border-0 shadow rounded-4">
            <Form
              onSubmit={UserLoginRequest}
              className="animated fadeInUp card-body"
            >
              <h4 className="mb-3">SIGN IN</h4>
              <InputGroup className="mb-3">
                <FormControl
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={HandleInputFocus}
                  style={{ borderColor: validationError ? "red" : "" }}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <FormControl
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={HandleInputFocus}
                  style={{ borderColor: validationError ? "red" : "" }}
                />
              </InputGroup>
              <Button
                onClick={UserLoginRequest}
                variant="primary"
                type="submit"
                className="w-100 mb-3 rounded-1"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <Button
                onClick={HandleGoogleSignIn}
                variant="dark"
                type="button"
                className="w-100 mb-3 rounded-1"
                disabled={loading}
              >
                <FaGoogle className="mx-2" />
                {loading ? "Logging in..." : "Sign in with Google"}
              </Button>

              {showDemoMessage ? (
                <Row className="bg-secondary p-2 rounded-2 text-white text-center">
                  <p>
                    Email: <span className="fw-bold">demo@demo.com</span>
                  </p>
                  <p>
                    Password: <span className="fw-bold">1111</span>
                  </p>
                  <p className="sm-text">
                    This account is intended for demonstration purposes, and any
                    changes will automatically revert to their original state
                    after new login.
                  </p>
                </Row>
              ) : (
                <></>
              )}

              <Row className="float-end mt-3">
                <span>
                  <NavLink
                    className="text-center h6 animated fadeInUp"
                    to="/register"
                  >
                    Sign Up
                  </NavLink>
                  <span className="mx-1">|</span>
                  <NavLink
                    className="text-center h6 animated fadeInUp"
                    to="/sendOTP"
                  >
                    Forget Password
                  </NavLink>
                </span>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
