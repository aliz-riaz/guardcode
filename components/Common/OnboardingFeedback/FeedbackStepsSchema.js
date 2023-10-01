import * as Yup from "yup";
import {
  step1keys,
  step2keys,
  step3keys,
  step4keys,
  step5keys,
} from "./FeedbackConstants";

function buildSchema(schemaObj, errorMessage, errorKey) {
  const schema = {};
  for (const key in schemaObj) {
    const value = schemaObj[key]; //hiring
    schema[key] = Yup.boolean().default(value);
  }
  return Yup.object()
    .shape(schema)
    .test(
      "at-least-one",
      "At least one checkbox must be selected",
      function (value) {
        const keys = Object.keys(schema);
        const hasTruthyValue = keys.some((key) => Boolean(value[key]));
        if (!hasTruthyValue) {
          throw new Yup.ValidationError(errorMessage, null, errorKey);
        }
      }
    );
}

const Step1Schema = buildSchema(
  step1keys,
  "Please select one of above",
  "step1error"
);
const Step2Schema = buildSchema(
  step2keys,
  "Please select one of above",
  "step2error"
);
const Step3Schema = buildSchema(
  step3keys,
  "Please select one of above",
  "step3error"
);
const Step4Schema = buildSchema(
  step4keys,
  "Please select one of above",
  "step4error"
);
const Step5Schema = buildSchema(
  step5keys,
  "Please select one of above",
  "step5error"
);

export { Step1Schema, Step2Schema, Step3Schema, Step4Schema, Step5Schema };
