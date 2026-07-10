import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Modal, ModalHeader, Form, ModalBody, Label, Input } from "reactstrap";
import "../../assets/css/ApplicationMain.css";
import "../../assets/css/dropzone.css";
import "../../assets/css/ckeditor.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import { useApiData } from "../../../src/Components/Common/ApiContext.js";
import { getMediaUrl } from "../../config/apiConfig";
const ViewSlideShare = ({ row, viewSlideShareModal, onCloseModal }) => {
    console.log("row: ", row);
    const location = useLocation();
    const {
        homeVideoSettings,
        eventDetails,
        eventGeneralSettings,
        themeSettings,
    } = useApiData();
    const [author, setAuthor] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [slideShareHeading, setSlideShareHeading] = useState("");
    const [projectYear, setProjectYear] = useState("");
    const [slideShareFile, setSlideShareFile] = useState("");
    const [pptLink, setPptLink] = useState("");
    let color = "#405189";

    useEffect(() => {
        if (row) {
            setAuthor(row?.author);
            setCompanyName(row?.authorCompany);
            setSlideShareHeading(row?.heading);
            setProjectYear(row?.projectYear);
            setSlideShareFile(row?.pptImage);
            setPptLink(row?.pptLink);
        }
    }, [location]);

    return (
        <>
            <Modal
                id="showModal"
                size="lg"
                isOpen={viewSlideShareModal}
                toggle={onCloseModal}
                centered
            >
                <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
                    <h5 className="modal-title" id="exampleModalLabel">
                        View Slide Share
                    </h5>
                </ModalHeader>
                <Form action="#">
                    <ModalBody>
                        <input type="hidden" id="id-field" />
                        <div className="row gy-4 mb-3">
                            <div className="col-md-12">
                                <div>
                                    <Label htmlFor="customername-field" className="form-label">
                                        Author
                                    </Label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        aria-label="name"
                                        aria-describedby="basic-addon1"
                                        value={author}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div>
                                    <Label htmlFor="amount-field" className="form-label">
                                        Company Name
                                    </Label>
                                    <div className="input-group">
                                        <Input
                                            type="text"
                                            className="form-control"
                                            aria-label="name"
                                            aria-describedby="basic-addon1"
                                            value={companyName}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div>
                                    <Label htmlFor="amount-field" className="form-label">
                                        Heading
                                    </Label>
                                    <div className="input-group">
                                        <Input
                                            type="text"
                                            className="form-control"
                                            aria-label="name"
                                            aria-describedby="basic-addon1"
                                            value={slideShareHeading}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div>
                                    <Label htmlFor="amount-field" className="form-label">
                                        Project Year
                                    </Label>
                                    <div className="input-group">
                                        <Input
                                            type="text"
                                            className="form-control"
                                            aria-label="name"
                                            aria-describedby="basic-addon1"
                                            value={projectYear}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div>
                                    <Label htmlFor="amount-field" className="form-label">
                                        PPT Link
                                    </Label>
                                    <div className="input-group">
                                        <Input
                                            type="text"
                                            className="form-control"
                                            aria-label="name"
                                            aria-describedby="basic-addon1"
                                            value={pptLink}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <Label>Slide Share Image</Label>
                            </div>
                            {slideShareFile?.length > 0 && (
                                <div className="mt-2">
                                    <img
                                        src={getMediaUrl(slideShareFile)}
                                        alt="uploaded-Logo"
                                        height={100}
                                        width={100}
                                    />
                                </div>
                            )}
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
                        </div>
                    </div>
                </Form>
            </Modal>
        </>
    );
};
export default ViewSlideShare;
