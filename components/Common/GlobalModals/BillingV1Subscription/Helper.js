import * as Yup from "yup";
import { Step1, Step2, Step3, Step4 } from "./BillingSteps";

const step1ValidationSchema = Yup.object().shape({
  plan: Yup.string().required("Please select a subscription plan"),
});

const step2ValidationSchema = Yup.object().shape({
  selectedCard: Yup.string().required("Please select a card"),
});

const step3ValidationSchema = Yup.object().shape({
  nameOnCard: Yup.string().required("This field is requierd."),
  cardNumber: Yup.string().required("This field is requierd."),
  cardExpiry: Yup.string().required("This field is requierd."),
  cardCVC: Yup.string().required("This field is requierd."),
});

const renderValidationSchema = (step) => {
  switch (step) {
    case 1:
      return step1ValidationSchema;
    case 2:
      return step2ValidationSchema;
    case 2:
      return step3ValidationSchema;
    //   case 2:
    //     return Step2Schema;
    //   case 3:
    //     return Step3Schema;
    //   case 4:
    //     return Step4Schema;
    //   case 5:
    //     return Step5Schema;
    default:
      return Yup.object().shape({});
  }
};

const renderStep = (step, stepProps) => {
  switch (step) {
    case 1:
      return <Step1 {...stepProps} />;
    case 2:
      return <Step2 {...stepProps} />;
    case 3:
      return <Step3 {...stepProps} />;
    case 4:
      return <Step4 {...stepProps} />;
    //   case 2:
    //     return Step2Schema;
    //   case 3:
    //     return Step3Schema;
    //   case 4:
    //     return Step4Schema;
    //   case 5:
    //     return Step5Schema;
    default:
      return <Step1 {...stepProps} />;
  }
};

export { renderValidationSchema, renderStep };
