import * as Yup from "yup";
import StepOne from "./Steps/Step1/StepOne";
import StepTwo from "./Steps/Step2/StepTwo";
import StepThree from "./Steps/Step3/StepThree";

const cardValidationSchema = Yup.object().shape({
  nameOnCard: Yup.string().required("This field is requierd."),
  cardNumber: Yup.string().required("This field is requierd."),
  cardExpiry: Yup.string().required("This field is requierd."),
  cardCVC: Yup.string().required("This field is requierd."),
});

const renderValidationSchema = (step) => {
  switch (step) {
    case 2:
      return cardValidationSchema;
    default:
      return Yup.object().shape({});
  }
};

const renderStep = (step, stepProps) => {
  switch (step) {
    case 1:
      return <StepOne />;
    case 2:
      return <StepTwo {...stepProps} />;
    case 3:
      return <StepThree />;
    default:
      return <StepOne />;
  }
};

export { renderValidationSchema, renderStep };
