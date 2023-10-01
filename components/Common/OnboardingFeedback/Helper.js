import { Step1, Step2, Step3, Step4, Step5 } from "./FeedbackSteps";
import {
  Step1Schema,
  Step2Schema,
  Step3Schema,
  Step4Schema,
  Step5Schema,
} from "./FeedbackStepsSchema";
import { StepHeader } from "./FeedbackStepsIterator";
const renderStep = (step, employer_name, stepProps) => {
  switch (step) {
    case 1:
      return (
        <>
          <StepHeader
            text={
              <div>
                <h3 className="fs-3 mb-1">
                  Hey {employer_name}, what will you be using your account for?{" "}
                </h3>
                <p className="fs-6">
                  We'll use this information to enable the features you need
                </p>
              </div>
            }
          />
          <Step1 {...stepProps} />
        </>
      );

    case 2:
      return (
        <>
          <StepHeader text="Which platforms do you currently use for hiring?" />
          <Step2 {...stepProps} />
        </>
      );
    case 3:
      return (
        <>
          <StepHeader text="Which of the following types of job ads will you be posting?" />
          <Step3 {...stepProps} />
        </>
      );
    case 4:
      return (
        <>
          <StepHeader text="What types of venues do you usually hire for?" />
          <Step4 {...stepProps} />
        </>
      );
    case 5:
      return (
        <>
          <StepHeader text="Which courses do you typically book?" />
          <Step5 {...stepProps} />
        </>
      );
    default:
      return null;
  }
};

const renderValidationSchema = (step) => {
  switch (step) {
    case 1:
      return Step1Schema;
    case 2:
      return Step2Schema;
    case 3:
      return Step3Schema;
    case 4:
      return Step4Schema;
    case 5:
      return Step5Schema;
    default:
      return Yup.object().shape({});
  }
};

export { renderStep, renderValidationSchema };
