import React, { useState, useEffect, useRef } from "react";
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, Alert } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import logoLight from "../../assets/images/adminpanel-logo.png";
import axios from "axios";

const BASE_URL = "https://www.australia.lithium-downstream-summit.com";
const RESEND_SECONDS = 60;

const Login = () => {
  const navigate = useNavigate();

  // login step state
  const [step, setStep] = useState("login"); // "login" | "otp"
  const [userId, setUserId] = useState(null);

  // login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);

  // otp form
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const timerRef = useRef(null);

  // shared
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const startResendTimer = () => {
    setResendTimer(RESEND_SECONDS);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const response = await axios.post(BASE_URL + "/admin1/customlogin", { email, password });
      if (response.otp_sent) {
        setUserId(response.user_id);
        setStep("otp");
        startResendTimer();
        setMessage("");
      } else {
        setMessage("❌ " + (response.message || "Invalid credentials"));
      }
    } catch (error) {
      setMessage("❌ Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const response = await axios.post(BASE_URL + "/admin1/verifyotp", { user_id: userId, otp });
      if (response.status) {
        localStorage.setItem("authUser", JSON.stringify(response.user));
        localStorage.setItem("permissions", JSON.stringify(response.permissions));
        localStorage.setItem("detailed_permissions", JSON.stringify(response.detailed_permissions));
        localStorage.setItem("loginTime", new Date().getTime().toString());
        localStorage.setItem("token", "custom-auth-token");

        try {
          const navResponse = await axios.get(BASE_URL + "/admin1/getnavbardata");
          if (navResponse.status) {
            localStorage.setItem("navbarData", JSON.stringify(navResponse.navbarData));
          }
        } catch (navError) {
          console.error("Error fetching navbar data:", navError);
        }

        setMessage("✅ Login Successful!");
        navigate("/dashboard");
      } else {
        setMessage("❌ " + (response.message || "Invalid OTP"));
      }
    } catch (error) {
      setMessage("❌ " + (error || "Invalid OTP"));
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setMessage("");
    setLoading(true);
    try {
      const response = await axios.post(BASE_URL + "/admin1/customlogin", { email, password });
      if (response.otp_sent) {
        startResendTimer();
        setOtp("");
        setMessage("✅ A new OTP has been sent to your email.");
      } else {
        setMessage("❌ " + (response.message || "Could not resend OTP"));
      }
    } catch (error) {
      setMessage("❌ Could not resend OTP. Please go back and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    clearInterval(timerRef.current);
    setStep("login");
    setUserId(null);
    setOtp("");
    setMessage("");
    setResendTimer(0);
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

                    {step === "login" && (
                      <>
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
                          <Form onSubmit={handleLoginSubmit}>
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
                              <Button
                                color="success"
                                className="btn btn-success w-100"
                                type="submit"
                                disabled={loading}
                              >
                                {loading ? "Sending OTP..." : "Sign In"}
                              </Button>
                            </div>
                          </Form>
                        </div>
                      </>
                    )}

                    {step === "otp" && (
                      <>
                        <div className="text-center mt-2">
                          <h5 className="text-primary">Verify OTP</h5>
                          <p className="text-muted">
                            A 6-digit OTP has been sent to <strong>{email}</strong>. It expires in 10 minutes.
                          </p>
                        </div>

                        {message && (
                          <Alert color={message.includes("✅") ? "success" : "danger"}>
                            {message}
                          </Alert>
                        )}

                        <div className="p-2 mt-4">
                          <Form onSubmit={handleOtpSubmit}>
                            <div className="mb-3">
                              <Label htmlFor="otp-input" className="form-label">Enter OTP</Label>
                              <Input
                                id="otp-input"
                                name="otp"
                                placeholder="Enter 6-digit OTP"
                                type="text"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                autoFocus
                              />
                            </div>

                            <div className="mt-4">
                              <Button
                                color="success"
                                className="btn btn-success w-100"
                                type="submit"
                                disabled={loading || otp.length !== 6}
                              >
                                {loading ? "Verifying..." : "Verify OTP"}
                              </Button>
                            </div>
                          </Form>

                          <div className="mt-3 text-center">
                            {resendTimer > 0 ? (
                              <p className="text-muted mb-0">
                                Resend OTP in <strong>{resendTimer}s</strong>
                              </p>
                            ) : (
                              <Button
                                color="link"
                                className="p-0 text-decoration-none"
                                onClick={handleResendOtp}
                                disabled={loading}
                              >
                                Resend OTP
                              </Button>
                            )}
                          </div>

                          <div className="mt-2 text-center">
                            <Button
                              color="link"
                              className="p-0 text-muted text-decoration-none"
                              onClick={handleBackToLogin}
                            >
                              &larr; Back to Login
                            </Button>
                          </div>
                        </div>
                      </>
                    )}

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
