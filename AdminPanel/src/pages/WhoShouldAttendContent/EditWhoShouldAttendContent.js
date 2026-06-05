import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, ModalHeader, Form, ModalBody, Label, Input } from "reactstrap";
import "../../assets/css/ApplicationMain.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import "../../assets/css/dropzone.css";
import "../../assets/css/ckeditor.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select";
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;
const EditWhoShouldAttendContent = (props) => {
  const navigate = useNavigate();
  const { editWhoShouldAttendModal } = props;
  const [whoShouldAttendData, setWhoShouldAttendData] = useState([]);
  const [benifits, setBenifits] = useState("");
  const [keyTakeaways, setKeyTakeaways] = useState("");
  const [whoAttend, setWhoAttend] = useState("");
  const [coreAttendeeDes, setCoreAttendeeDes] = useState("");
  const [industriesDes, setIndustriesDes] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  let color = "#405189";
  useEffect(() => {
    callWhoShouldAttendDataApi();
    // eslint-disable-next-line
  }, []);
  const callWhoShouldAttendDataApi = () => {
    setloading(true);

    const requestOptions = {
      method: "GET",
    };
    fetch(
      `https://www.australia.lithium-downstream-summit.com/admin1/whoshouldattendpagedata`,
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
          setWhoShouldAttendData(data["whoShouldAttendPageData"]);
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
    if (whoShouldAttendData?.length > 0) {
      setBenifits(
        whoShouldAttendData[0]?.sectionFirstPoints?.replace(/^"(.*)"$/, "$1")
      );
      setKeyTakeaways(
        whoShouldAttendData[0]?.sectionSecondPoints?.replace(/^"(.*)"$/, "$1")
      );
      setWhoAttend(
        whoShouldAttendData[0]?.sectionThreeDescription?.replace(
          /^"(.*)"$/,
          "$1"
        )
      );
      setCoreAttendeeDes(
        whoShouldAttendData[0]?.sectionThreeTabOneDescription?.replace(
          /^"(.*)"$/,
          "$1"
        )
      );
      setIndustriesDes(
        whoShouldAttendData[0]?.sectionThreeTabTwoDescription?.replace(
          /^"(.*)"$/,
          "$1"
        )
      );
    }
    // eslint-disable-next-line
  }, [whoShouldAttendData]);

  const submitBtnClk = (e) => {
    e.preventDefault();
    if (benifits === "") {
      toast.error(" Paragraph-1 Content is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setVisible(false);
    } else if (keyTakeaways === "") {
      toast.error("Paragraph-2 Content is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setVisible(false);
    } else if (whoAttend === "") {
      toast.error("Who Should Attend Content is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setVisible(false);
    } else if (coreAttendeeDes === "") {
      toast.error(" Core Attandes Content is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setVisible(false);
      setVenueWebsiteLinkErr(true);
    } else if (industriesDes === "") {
      toast.error("Industries & Companies Content is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setVisible(false);
    } else {
      setVisible(true);
      const finalData = new FormData();
      finalData.append(
        "sectionFirstPoints",
        JSON.stringify(benifits)
      );
      finalData.append(
        "sectionSecondPoints",
        JSON.stringify(keyTakeaways)
      );
      finalData.append(
        "sectionThreeDescription",
        JSON.stringify(whoAttend)
      );
      finalData.append(
        "sectionThreeTabOneDescription",
        JSON.stringify(coreAttendeeDes)
      );
      finalData.append(
        "sectionThreeTabTwoDescription",
        JSON.stringify(industriesDes)
      );
      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch(
        "https://www.australia.lithium-downstream-summit.com/admin1/addwhoshouldattendpagestaticdata",
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
          if (data.status) {
            setVisible(true);
            props.onModalSubmitBtnClk();
            toast.success("Record Added Successfully.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            setloading(false);
            setVisible(false);
            toast.error(data?.message);
          }
        })
        .catch((error) => {
          console.log("error: ", error);
          setVisible(false);
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
    }
  };

  if (loading)
    return (
      <div className="loaderClass" style={{ textAlign: "center" }}>
        <ClipLoader color={color} loading={loading} css={override} size={100} />
      </div>
    );

  return (
    <>
      <Modal
        id="showModal"
        size="lg"
        isOpen={editWhoShouldAttendModal}
        toggle={() => props.onCloseModal(false)}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => props.onCloseModal(false)}
        >
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Who Should Attend Data
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Paragraph-1 <span className="required_span">*</span>
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={benifits}
                        name="benifits"
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          setBenifits(ipdata);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Paragraph-2 <span className="required_span">*</span>
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={keyTakeaways}
                        name="keyTakeaways"
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          setKeyTakeaways(ipdata);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                     Who Should Attend Content <span className="required_span">*</span>
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={whoAttend}
                        name="whoAttend"
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          setWhoAttend(ipdata);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Core Attandes Content <span className="required_span">*</span>
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={coreAttendeeDes}
                        name="benifits"
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          setCoreAttendeeDes(ipdata);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Industries & Companies Content <span className="required_span">*</span>
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={industriesDes}
                        name="industriesDes"
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          setIndustriesDes(ipdata);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <div className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  props.onCloseModal(false);
                }}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-success"
                id="add-btn"
                onClick={(e) => {
                  submitBtnClk(e);
                }}
                disabled={visible}
              >
                Edit Who Should Attend Data
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default EditWhoShouldAttendContent;
