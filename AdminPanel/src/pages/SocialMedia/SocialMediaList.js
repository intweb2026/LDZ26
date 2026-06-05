import React, { useMemo, useCallback, useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Input,
  Row,
  Container,
  Label,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../../Components/Common/DeleteModal";
import "../../assets/css/ckeditor.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Tooltip from "@mui/material/Tooltip";
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;

const SocilMediaList = () => {
  const navigate = useNavigate();
  const [socialMediaData, setSocialMediaData] = useState([]);
  console.log('socialMediaData: ', socialMediaData);
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

  if (loading)
    return (
      <div className="loaderClass" style={{ textAlign: "center" }}>
        <ClipLoader color={color} loading={loading} css={override} size={100} />
      </div>
    );

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Event Social Media Links" pageTitle="Dashboards" pageLink="/dashboard" />
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <button
                  type="submit"
                  className="btn btn-success mt-3"
                  id="add-btn"
                  onClick={() => navigate("/addsocialmedialinks")}
                >
                  Edit Social Media Links
                </button>
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
                        disabled
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
                        disabled
                      />
                    </div>
                  </div>
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
                        disabled
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
                        disabled
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
                        disabled
                      />
                    </div>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default SocilMediaList;
