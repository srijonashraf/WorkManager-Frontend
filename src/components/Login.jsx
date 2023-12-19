import React, { useState } from "react";
import { UserLoginRequest } from "../apiRequest/apiRequest.js";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  FormControl,
  InputGroup,
  Button,
} from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { successToast, errorToast } from "../helper/ToasterHelper.js";
import { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      if (email.length === 0 || password.length === 0) {
        errorToast("Please fill in all the fields.");
        setValidationError(true);
        return;
      }

      setLoading(true);
      const success = await UserLoginRequest(email, password);
      if (success) {
        window.location.href = "/";
        successToast("Login Successful.");
      } else {
        errorToast("Email or Password Not Found.");
        setValidationError(true);
      }
    } catch (error) {
      errorToast("Failed to connect to the server.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputFocus = () => {
    setValidationError(false);
  };

  return (
    <div>
      <Toaster position="bottom-center" />
      <Container>
        <Row className="justify-content-md-center">
          <Col
            xs={12}
            md={6}
            lg={5}
            className="card p-4 border-0 shadow rounded-4 mx-auto" // Add mx-auto for centering
          >
            <Form onSubmit={loginUser} className="animated fadeInUp card-body">
              <h4 className="mb-3">SIGN IN</h4>
              <InputGroup className="mb-3">
                <FormControl
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={handleInputFocus}
                  style={{ borderColor: validationError ? "red" : "" }}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <FormControl
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={handleInputFocus}
                  style={{ borderColor: validationError ? "red" : "" }}
                />
              </InputGroup>
              <Button
                onClick={loginUser}
                variant="primary"
                type="submit"
                className="w-100 mb-3"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
              <Row className="float-end mt-3">
                <span>
                  <NavLink
                    className="text-center h6 animated fadeInUp"
                    to="/register"
                  >
                    Sign Up{" "}
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
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;