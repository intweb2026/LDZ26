import React, { useState } from "react";
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, Alert } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import logoLight from "../../assets/images/logo-light.png";
import axios from "axios";
import { api } from "../../config";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://www.australia.lithium-downstream-summit.com" + "/admin1/customlogin", { email, password });

      // Note: api_helper.js interceptor unwraps response.data, so response here IS the data
      if (response.status) {
        localStorage.setItem("authUser", JSON.stringify(response.user));
        localStorage.setItem("permissions", JSON.stringify(response.permissions));
        localStorage.setItem("detailed_permissions", JSON.stringify(response.detailed_permissions));
        localStorage.setItem("loginTime", new Date().getTime().toString());
        localStorage.setItem("token", "custom-auth-token"); // Set dummy token for AuthProtected check


        // Fetch and store navbar data
        try {
          const navResponse = await axios.get("https://www.australia.lithium-downstream-summit.com" + "/admin1/getnavbardata");
          if (navResponse.status) {
            localStorage.setItem("navbarData", JSON.stringify(navResponse.navbarData));
          }
        } catch (navError) {
          console.error("Error fetching navbar data:", navError);
        }

        setMessage("✅ Login Successful!");
        navigate("/dashboard");
      } else {
        setMessage("❌ " + (response.message || "Invalid credentials"));
      }
    } catch (error) {
      setMessage("❌ Invalid email or password");
    }

  };

  return (

    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content mt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <Link to="/" className="d-inline-block auth-logo">
                      <img src={logoLight} alt="logo" height="100" />
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Welcome Back !</h5>
                      <p className="text-muted">Sign in to continue</p>
                    </div>

                    {message && (
                      <Alert color={message.includes("Successful") ? "success" : "danger"}>
                        {message}
                      </Alert>
                    )}

                    <div className="p-2 mt-4">
                      <Form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <Label htmlFor="email" className="form-label">Email</Label>
                          <Input
                            name="email"
                            placeholder="Enter email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div className="mb-3">
                          <div className="float-end">
                            <Link to="/forgot-password" className="text-muted">Forgot password?</Link>
                          </div>
                          <Label className="form-label" htmlFor="password-input">Password</Label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <Input
                              name="password"
                              value={password}
                              type={passwordShow ? "text" : "password"}
                              className="form-control pe-5"
                              placeholder="Enter Password"
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                              type="button"
                              onClick={() => setPasswordShow(!passwordShow)}
                            >
                              <i className="ri-eye-fill align-middle"></i>
                            </button>
                          </div>
                        </div>

                        <div className="mt-4">
                          <Button color="success" className="btn btn-success w-100" type="submit">
                            Sign In
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default Login;
