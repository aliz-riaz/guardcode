import { loadGetInitialProps } from "next/dist/next-server/lib/utils";
import { Container, Row, Col } from "reactstrap";

import { connect } from "react-redux";

import * as cookie from "cookie";

export const getServerSideProps = async function ({ req, res }) {
  const cookies = cookie.parse(
    req ? req.headers.cookie || "" : document.cookie
  );
  if (!cookies.show_thank_you) {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

function ThankYou(props) {
  return (
    <div className="thankyou-page bg-white">
      <Container>
        <Row>
          <Col>
            <div className="thankyou-header">
              <a href="/">
                <img
                  src={process.env.APP_URL + "/images/guardpass-logo-black.svg"}
                  alt="logo"
                />
              </a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <div className="thankyou-cont">
              <h1>
                {props.user_name}, <br /> Thanks for signing up!
              </h1>
              <p>
                A member of our team will reach out to you shortly to verify
                your signup. Once your account is verified, you will be able to
                access all the features via your portal.
              </p>
              <p className="cant__wait">
                Can’t wait? <a href="/">Take a tour of the app</a>
              </p>
            </div>
          </Col>
          <Col md="7">
            <img
              src={process.env.APP_URL + "/images/thnaks-img@2x.png"}
              alt=""
              className="float-left ml-3 thankyou-img"
            />
          </Col>
        </Row>
        <Row className="d-none d-md-block">
          <Col>
            <ul className="social_links">
              <li>
                <a href="https://twitter.com/Get_Licensed">
                  <img
                    src={process.env.APP_URL + "/images/twitter-btn.svg"}
                    alt="Twitter"
                  />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/getlicensed">
                  <img
                    src={process.env.APP_URL + "/images/fb-btn.svg"}
                    alt="Facebook"
                  />
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/user/getlicensed">
                  <img
                    src={process.env.APP_URL + "/images/yt-btn.svg"}
                    alt="YouTube"
                  />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/getlicensed/">
                  <img
                    src={process.env.APP_URL + "/images/ig-btn.svg"}
                    alt="Instagram"
                  />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user_name: state.vantage.commonReducer.sign_up_name,
  show_thank_you_page: state.vantage.commonReducer.show_thank_you_page,
});

export default connect(mapStateToProps)(ThankYou);
