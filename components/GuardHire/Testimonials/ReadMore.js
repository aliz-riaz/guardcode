import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "./ReadMore.module.scss";
import { useState } from "react";

function ReadMore({
  showReadMore,
  setShowReadMore,
  data,
  currentIndex,
  setCurrentIndex,
}) {
  const [testimonial, setTestimonial] = useState(data[currentIndex]);

  const handleNext = (e) => {
    e.preventDefault();
    if (data.length == currentIndex + 1) {
      return;
    }
    setTestimonial(data[currentIndex + 1]);
    setCurrentIndex(currentIndex + 1);
  };

  const handleBack = (e) => {
    e.preventDefault();
    if (currentIndex == 0) {
      return;
    }
    setTestimonial(data[currentIndex - 1]);
    setCurrentIndex(currentIndex - 1);
  };

  return (
    <Modal
      isOpen={showReadMore}
      size={"lg"}
      className={`font-roboto`}
      centered
      backdrop="static"
      keyboard={false}
    >
      <ModalBody className={`${styles.modal_content}`}>
        <button onClick={() => setShowReadMore(false)}>Close</button>
        <p>{testimonial.review}</p>
        <div className={styles.user_info}>
          <h3 className={`fs-4 mt-4 mb-0`}>
            {testimonial.author_name}
            <span className="d-block fs-6 fw-normal">
              {testimonial.job_title}
            </span>
          </h3>
          <img src={testimonial.company_logo} className="img-fluid" alt="guk" />
        </div>
        <div className={styles.arrow_button}>
          <button
            onClick={handleNext}
            disabled={data.length == currentIndex + 1 ? true : false}
            className={styles.next_btn}
          >
            <img
              src={process.env.APP_URL + "/images/chevron-right.svg"}
              alt="arrow"
            />
          </button>
          <button
            onClick={handleBack}
            disabled={currentIndex == 0 ? true : false}
            className={styles.prev_btn}
          >
            <img
              src={process.env.APP_URL + "/images/chevron-left.svg"}
              alt="arrow"
            />
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default ReadMore;
