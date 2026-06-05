import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../src/Components/Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import {
  Modal,
  ModalHeader,
  Form,
  ModalBody,
  Label,
  Input,
  Breadcrumb,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Container,
} from "reactstrap";
import "../../assets/css/ApplicationMain.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import "../../assets/css/dropzone.css";
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;
const AddSocialMediaOption = () => {
  const navigate = useNavigate();
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setloading] = useState(false);
  let color = "#405189";

  useEffect(() => {
    callSocialMediaOptionsApi();
    // eslint-disable-next-line
  }, []);

  const callSocialMediaOptionsApi = () => {
    setloading(true);

    const requestOptions = {
      method: "GET",
    };
    fetch(
      `https://www.australia.lithium-downstream-summit.com/admin1/footersocialmediaoptions`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (
          data &&
          (data.detail === "The Token is expired" ||
            data.message === "Invalid token")
        ) {
          localStorage.clear();
          navigate("/logout");
        }
        if (data && data.status) {
          setSocialMediaData(data["footerSocialMediaOptions"]);
          // setTotalCount(data?.paginationDetails?.count);
        }
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        setTimeout(() => {
          toast.error("There was an error, Please try again later.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }, 1000);
      });
  };
  useEffect(() => {
    setFacebook(socialMediaData[0]?.facebookLink);
    setInstagram(socialMediaData[0]?.instagramLink);
    setTwitter(socialMediaData[0]?.twitterLink);
    setLinkedin(socialMediaData[0]?.linkedinLink);
    setEmail(socialMediaData[0]?.emailLink);

    // eslint-disable-next-line
  }, [socialMediaData]);

  const handleSubmitWithFormData = (e) => {
    e.preventDefault();
    setloading(true);
    const formDataObj = new FormData();
    formDataObj.append("facebookLink", facebook);
    formDataObj.append("instagramLink", instagram);
    formDataObj.append("twitterLink", twitter);
    formDataObj.append("linkedinLink", linkedin);
    formDataObj.append("emailLink", email);

    const requestOptions = {
      method: "POST",
      body: formDataObj,
    };
    fetch("https://www.australia.lithium-downstream-summit.com/admin1/addfootersocialmediaoptions", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          toast.success("Record Added Successfully.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setloading(false);
          navigate("/socialmediadata");
        } else {
          setloading(false);
          toast.error(data?.message);
        }
      })
      .catch((error) => {
        console.log("error: ", error);
        setloading(false);
        toast.error("There was an error, Please try again later.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  if (loading)
    return (
      <div className="loaderClass" style={{ textAlign: "center" }}>
        <ClipLoader color={color} loading={loading} css={override} size={100} />
      </div>
    );

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb
          title="Event Social Media Links"
          pageTitle="Event Social Media Links"
          pageLink="/socialmediadata"
        />
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <Row>
                  <div className="col-md-10 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Facebook Link{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Facebook Link"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={facebook}
                        onChange={(e) => {
                          setFacebook(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-10 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Instagram Link{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Instagram Link"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={instagram}
                        onChange={(e) => {
                          setInstagram(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </Row>
                <Row>
                  <div className="col-md-10 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Twitter Link{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Twitter Link"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={twitter}
                        onChange={(e) => {
                          setTwitter(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-10 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Linkedin Link{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Linkedin Link"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={linkedin}
                        onChange={(e) => {
                          setLinkedin(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-10 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Email Link{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Email Link"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </Row>

                <button
                  type="submit"
                  className="btn btn-success mt-3"
                  id="add-btn"
                  onClick={handleSubmitWithFormData}
                >
                  Submit
                </button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddSocialMediaOption;
