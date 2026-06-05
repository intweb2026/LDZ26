import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;
const EditBlockDomain = ({
    row,
    editBlockDomainModal,
    onCloseModal,
    onModalSubmitBtnClk,
}) => {
    console.log("row: ", row);
    const navigate = useNavigate();
    const location = useLocation();
    const [domainName, setDomainName] = useState("");
    const [domainNameError, setDomainNameError] = useState(false);
    const [visible, setVisible] = useState(false);
    const [loading, setloading] = useState(false);
    let color = "#405189";

    useEffect(() => {
        if (row) {
            setDomainName(row?.domainName);
        }
    }, [location]);

    const submitBtnClk = (e) => {
        e.preventDefault();
        if (domainName === "") {
            toast.error("Domain Name is Required", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setDomainNameError(true);
            setVisible(false);
        } else {
            setVisible(true);
            const finalData = new FormData();
            finalData.append("id", row?.id);
            finalData.append("domainName", domainName);

            const requestOptions = {
                method: "POST",
                body: finalData,
            };
            fetch("https://www.australia.lithium-downstream-summit.com/admin1/editblockdomain", requestOptions)
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
                        onModalSubmitBtnClk();
                        toast.success("Record Updated Successfully.", {
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
                isOpen={editBlockDomainModal}
                toggle={onCloseModal}
                centered
            >
                <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
                    <h5 className="modal-title" id="exampleModalLabel">
                        Edit Block Domain
                    </h5>
                </ModalHeader>
                <Form action="#">
                    <ModalBody>
                        <input type="hidden" id="id-field" />
                        <div className="row gy-4 mb-3">
                            <div className="col-md-12">
                                <div>
                                    <Label htmlFor="customername-field" className="form-label">
                                        Domain Name <span className="required_span">*</span>
                                    </Label>
                                    <Input
                                        type="text"
                                        className={`form-control ${domainNameError ? "border-danger " : ""
                                            }`}
                                        placeholder="Enter Domain Name"
                                        aria-label="name"
                                        aria-describedby="basic-addon1"
                                        value={domainName}
                                        onChange={(e) => {
                                            setDomainName(e.target.value);
                                            setDomainNameError(false);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <div className="modal-footer">
                        <div className="hstack gap-2 justify-content-end">
                            <button
                                type="button"
                                className="btn btn-light border"
                                onClick={() => {
                                    onCloseModal();
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
                                Edit Block Domain
                            </button>
                        </div>
                    </div>
                </Form>
            </Modal>
        </>
    );
};
export default EditBlockDomain;
