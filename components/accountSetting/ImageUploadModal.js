import React, { useEffect, useState, useRef } from "react";
import ImageCropper from "./ImageCropper";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "react-image-crop/dist/ReactCrop.css";
import styles from "./ImageUploadModal.module.scss";
const ImageUploadModal = (props) => {
  const [imageToCrop, setImageToCrop] = useState(undefined);
  const [croppedImage, setCroppedImage] = useState(undefined);
  const [error, setError] = useState(false);

  const [show, setShow] = useState(false);
  const fileUpload = useRef();

  const handleClose = () => {
    fileUpload.current.value = null;
    setImageToCrop(undefined);
    setCroppedImage(undefined);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const onUploadFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        const image = reader.result;

        setImageToCrop(image);
        setShow(true);
      });

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center">
        <span>
          <img src={props.companyImage} width={`42px`} />
        </span>
        <label
          className={`${styles.custom_file_upload} ml-2 mb-0 d-flex align-items-center`}
        >
          <input
            type="file"
            ref={fileUpload}
            accept="image/*"
            onChange={onUploadFile}
            className={`${styles.file}`}
          />
          <img src={`${process.env.APP_URL}/images/move-up.svg`} />
          <span className="ml-1" style={{ marginTop: "1px" }}>
            Upload logo
          </span>
        </label>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className={`${styles.modal_header}`} closeButton>
          <Modal.Title>Company logo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImageCropper
            imageToCrop={imageToCrop}
            onImageCropped={(croppedImage) => {
              setError(false);
              setCroppedImage(croppedImage);
            }}
            setCroppedImage={setCroppedImage}
          />
          {error && <div className="text-danger">Please crop the image</div>}
          {croppedImage && (
            <div className="text-center">
              <hr />
              <h4>Preview</h4>
              <img alt="Cropped Img" src={croppedImage} />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-dark px-4" onClick={handleClose}>
            Close
          </Button>
          <Button
            className="btn btn-success px-4"
            onClick={() => {
              if (!croppedImage) {
                setError(true);
              } else {
                props.setCompnayImage(croppedImage);
                props.setUserSelectedImage(croppedImage);
                setShow(false);
                setCroppedImage(undefined);
              }
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImageUploadModal;
