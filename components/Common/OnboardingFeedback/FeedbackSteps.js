import {
  Step1Iterator,
  Step2Iterator,
  Step3Iterator,
  Step4Iterator,
  Step5Iterator,
} from "./FeedbackStepsIterator";
import styles from "./FeedbackSteps.module.scss";

const InputTypeCheckbox = ({
  name,
  component,
  text,
  value,
  checked,
  handleChange,
  handleBlur,
}) => {
  return (
    <div className={`${styles.input_checkbox}`}>
      <label className={`${checked && styles.selected}`} htmlFor={name}>
        <input
          type="checkbox"
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          checked={checked}
        />
        {component}
      </label>
      {text && <>{text}</>}
    </div>
  );
};

const Step1 = ({ values, handleChange, handleBlur, errors, touched }) => (
  <div className={`${styles.step_no_1}`}>
    <div className={`${styles.wrapper}`}>
      {Step1Iterator.map((item) => {
        return (
          <InputTypeCheckbox
            name={item.name}
            component={item.component}
            text={item.text}
            value={values[item.name]}
            checked={values[item.name]}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        );
      })}
    </div>
    {touched.hiring || touched.traning ? (
      <div className="text-danger mb-2">{errors?.step1error}</div>
    ) : null}
  </div>
);

const Step2 = ({ values, handleChange, handleBlur, errors, touched }) => (
  <div className={`${styles.step_no_2}`}>
    <div className={`${styles.wrapper}`}>
      {Step2Iterator.map((item) => {
        return (
          <InputTypeCheckbox
            name={item.name}
            component={item.component}
            text={item.text}
            value={values[item.name]}
            checked={values[item.name]}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        );
      })}
    </div>
    {touched.linkedin ||
    touched.indeed ||
    touched.reed ||
    touched.jobToday ||
    touched.others ? (
      <div className="text-danger">{errors?.step2error}</div>
    ) : null}
  </div>
);
const Step3 = ({ values, handleChange, handleBlur, errors, touched }) => (
  <div className={`${styles.step_no_3}`}>
    <div className={`${styles.wrapper}`}>
      {Step3Iterator.map((item) => {
        return (
          <InputTypeCheckbox
            name={item.name}
            component={item.component}
            text={item.text}
            value={values[item.name]}
            checked={values[item.name]}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        );
      })}
    </div>
    {touched.permenant ||
    touched.temporary ||
    touched.shiftBased ||
    touched.placement ? (
      <div className="text-danger">{errors?.step3error}</div>
    ) : null}
  </div>
);

const Step4 = ({ values, handleChange, handleBlur, errors, touched }) => (
  <div className={`${styles.step_no_4}`}>
    <div className={`${styles.wrapper}`}>
      {Step4Iterator.map((item) => {
        return (
          <InputTypeCheckbox
            name={item.name}
            component={item.component}
            text={item.text}
            value={values[item.name]}
            checked={values[item.name]}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        );
      })}
    </div>
    {touched.corporate ||
    touched.retail ||
    touched.barClub ||
    touched.events ||
    touched.mobile ||
    touched.venueOthers ? (
      <div className="text-danger">{errors?.step4error}</div>
    ) : null}
  </div>
);

const Step5 = ({ values, handleChange, handleBlur, errors, touched }) => (
  <div className={`${styles.step_no_5}`}>
    <div className={`${styles.wrapper}`}>
      {Step5Iterator.map((item) => {
        return (
          <InputTypeCheckbox
            name={item.name}
            component={item.component}
            text={item.text}
            value={values[item.name]}
            checked={values[item.name]}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        );
      })}
    </div>
    {touched.ds ||
    touched.cctv ||
    touched.topUpDS ||
    touched.cp ||
    touched.topUpSG ||
    touched.sg ||
    touched.efaw ||
    touched.aplh ? (
      <div className="text-danger">{errors?.step5error}</div>
    ) : null}
  </div>
);

export { Step1, Step2, Step3, Step4, Step5 };
