import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Label,
  Input,
  FormGroup,
  Button,
  Form,
} from "reactstrap";
function Newsletter() {
  return (
    <section className="newsletter-sec">
      <Container>
        <Row>
          <Col md="7" className="">
            <Form className="newsletter-form">
              <h2>Get the latest offers, tips and tricks!</h2>
              <div className="newsletter-form-row">
                <FormGroup className="gl-input">
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Email Address"
                  ></Input>
                  <Label>First Name</Label>
                </FormGroup>
                <FormGroup className="gl-input ml-md-3">
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Email Address"
                  ></Input>
                  <Label>Email Address</Label>
                  <span className="input-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="20"
                      viewBox="0 0 25 20"
                    >
                      <g fill="none" fill-rule="evenodd" stroke-linecap="round">
                        <g stroke="#242429" stroke-width="1.5">
                          <g>
                            <g>
                              <path
                                d="M22.467 19H2.533C1.687 19 1 18.328 1 17.5v-15C1 1.672 1.687 1 2.533 1h19.934C23.313 1 24 1.672 24 2.5v15c0 .828-.687 1.5-1.533 1.5z"
                                transform="translate(-497.000000, -491.000000) translate(182.000000, 316.000000) translate(0.000000, 163.000000) translate(315.000000, 12.000000)"
                              />
                              <path
                                d="M4 5L12.5 12 21 5M4 14L6 12M21 14L19 12"
                                transform="translate(-497.000000, -491.000000) translate(182.000000, 316.000000) translate(0.000000, 163.000000) translate(315.000000, 12.000000)"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>
                </FormGroup>
                <Button className="btn btn-md btn-gray ml-md-3">
                  Subscribe
                </Button>
              </div>
            </Form>
          </Col>
          <Col md="5" className="d-flex justify-content-end">
            <div className="social_networks">
              <h2>Don’t get left out. Join the conversation.</h2>
              <ul>
                <li>
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="20"
                      viewBox="0 0 24 20"
                    >
                      <g fill="none" fill-rule="evenodd">
                        <g fill="#242429" fill-rule="nonzero">
                          <g>
                            <path
                              d="M24 2.3c-.9.4-1.8.7-2.8.8 1-.6 1.8-1.6 2.2-2.7-1 .6-2 1-3.1 1.2-.9-1-2.2-1.6-3.6-1.6-2.7 0-4.9 2.2-4.9 4.9 0 .4 0 .8.1 1.1C7.7 5.8 4.1 3.8 1.7.8c-.5.8-.7 1.6-.7 2.5 0 1.7.9 3.2 2.2 4.1-.8 0-1.6-.2-2.2-.6v.1c0 2.4 1.7 4.4 3.9 4.8-.4.1-.8.2-1.3.2-.3 0-.6 0-.9-.1.6 2 2.4 3.4 4.6 3.4-1.7 1.3-3.8 2.1-6.1 2.1-.4 0-.8 0-1.2-.1 2.2 1.4 4.8 2.2 7.5 2.2 9.1 0 14-7.5 14-14v-.6c1-.7 1.8-1.6 2.5-2.5z"
                              transform="translate(-935.000000, -3377.000000) translate(932.000000, 3322.000000) translate(3.000000, 55.000000)"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="22"
                      viewBox="0 0 14 22"
                    >
                      <g fill="none" fill-rule="evenodd">
                        <g fill="#242429" fill-rule="nonzero">
                          <g>
                            <path
                              d="M4.032 22L4 12H0V8h4V5.5C4 1.789 6.298 0 9.61 0c1.585 0 2.948.118 3.345.17v3.88H10.66c-1.8 0-2.15.856-2.15 2.112V8h5.241l-2 4H8.51v10H4.032z"
                              transform="translate(-1015.000000, -3375.000000) translate(932.000000, 3322.000000) translate(83.000000, 53.000000)"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="22"
                      viewBox="0 0 24 22"
                    >
                      <g fill="none" fill-rule="evenodd">
                        <g fill="#242429" fill-rule="nonzero">
                          <g>
                            <path
                              d="M23.8 6.6s-.2-1.7-1-2.4c-.9-1-1.9-1-2.4-1C17 3 12 3 12 3s-5 0-8.4.2c-.5.1-1.5.1-2.4 1-.7.7-1 2.4-1 2.4S0 8.5 0 10.5v1.8c0 1.9.2 3.9.2 3.9s.2 1.7 1 2.4c.9 1 2.1.9 2.6 1 1.9.2 8.2.2 8.2.2s5 0 8.4-.3c.5-.1 1.5-.1 2.4-1 .7-.7 1-2.4 1-2.4s.2-1.9.2-3.9v-1.8c0-1.9-.2-3.8-.2-3.8zM9.5 14.5V7.8l6.5 3.4-6.5 3.3z"
                              transform="translate(-1091.000000, -3375.000000) translate(932.000000, 3322.000000) translate(159.000000, 53.000000)"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                    >
                      <g fill="none" fill-rule="evenodd">
                        <g fill="#242429" fill-rule="nonzero">
                          <g>
                            <g transform="translate(-1173.000000, -3375.000000) translate(932.000000, 3322.000000) translate(159.000000, 53.000000) translate(82.000000, 0.000000)">
                              <path d="M11 1.982c2.937 0 3.285.011 4.445.064.697.008 1.388.136 2.042.379.478.176.91.457 1.265.823.366.355.647.787.823 1.265.243.654.37 1.345.379 2.042.053 1.16.064 1.508.064 4.445 0 2.937-.011 3.285-.064 4.445-.008.697-.136 1.388-.379 2.042-.37.96-1.129 1.718-2.088 2.088-.654.243-1.345.37-2.042.379-1.16.053-1.508.064-4.445.064-2.937 0-3.285-.011-4.445-.064-.697-.008-1.388-.136-2.042-.379-.478-.176-.91-.457-1.265-.823-.366-.355-.647-.787-.823-1.265-.243-.654-.37-1.345-.379-2.042-.053-1.16-.064-1.508-.064-4.445 0-2.937.011-3.285.064-4.445.008-.697.136-1.388.379-2.042.176-.478.457-.91.823-1.265.355-.366.787-.647 1.265-.823.654-.243 1.345-.37 2.042-.379 1.16-.053 1.508-.064 4.445-.064M11 0C8.013 0 7.638.013 6.465.066c-.912.019-1.815.192-2.67.511C2.315 1.15 1.147 2.32.577 3.8c-.32.855-.492 1.758-.511 2.67C.013 7.638 0 8.013 0 11s.013 3.362.066 4.535c.019.912.192 1.815.511 2.67.573 1.48 1.743 2.648 3.223 3.218.855.32 1.758.492 2.67.511C7.638 21.987 8.013 22 11 22s3.362-.013 4.535-.066c.912-.019 1.815-.192 2.67-.511 1.48-.573 2.648-1.743 3.218-3.223.32-.855.492-1.758.511-2.67.053-1.168.066-1.543.066-4.53s-.013-3.362-.066-4.535c-.019-.912-.192-1.815-.511-2.67C20.85 2.315 19.68 1.147 18.2.577c-.855-.32-1.758-.492-2.67-.511C14.362.013 13.987 0 11 0z" />
                              <path d="M11 5.351c-3.12 0-5.649 2.53-5.649 5.649 0 3.12 2.53 5.649 5.649 5.649 3.12 0 5.649-2.53 5.649-5.649 0-1.498-.595-2.935-1.655-3.994C13.935 5.946 12.498 5.35 11 5.35zm0 9.316c-2.025 0-3.667-1.642-3.667-3.667S8.975 7.333 11 7.333 14.667 8.975 14.667 11 13.025 14.667 11 14.667z" />
                              <circle cx="16.872" cy="5.128" r="1.32" />
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
export default Newsletter;
