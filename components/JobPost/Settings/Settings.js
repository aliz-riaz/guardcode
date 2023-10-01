import { Button, Label, Row, Col, FormGroup } from "reactstrap";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { setSettingsEmail } from "../../../redux/actions/jobPostAction";
import * as Yup from "yup";

const SettingsSchema = Yup.object().shape({
  settingsEmail: Yup.string()
    .email("Invalid email format")
    .required("Required"),
});

const Settings = (props) => {
  return (
    <>
      <div className="pt-2 pt-md-5 pb-2 pb-md-4 row">
        <div className="col">
          <h3 className="text-center text-sm-uppercase font-sm-12">Settings</h3>
        </div>
      </div>
      <Row className="justify-content-center">
        <Col className="col-12 col-md-5">
          <div className="bg-white py-4 px-4 rounded">
            <Formik
              enableReinitialize={true}
              initialValues={{
                settingsEmail: props.settings_email,
              }}
              validationSchema={SettingsSchema}
              onSubmit={(values) => {
                // alert(JSON.stringify(values));
                props.goToNext(1);
              }}
            >
              {({ errors, touched, values }) => (
                <Form id="settings">
                  <FormGroup className="gl-input mb-0">
                    <Field
                      type="email"
                      name="settingsEmail"
                      className="form-control"
                      placeholder="settingsEmail"
                      onChange={(e) => {
                        props.setSettingsEmail(e.target.value);
                      }}
                    />
                    <Label>Settings Email</Label>
                    {errors.settingsEmail && touched.settingsEmail ? (
                      <div className="text-danger">{errors.settingsEmail}</div>
                    ) : null}
                  </FormGroup>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    settings_email: state.vantage.jobPostReducer.settingsEmail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSettingsEmail: (settingsEmail) =>
      dispatch(setSettingsEmail(settingsEmail)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
