import React, { useState } from "react";
import { useRouter } from "next/router";
import { Nav, NavItem, NavLink } from "reactstrap";
import Link from "next/link";

// reactstrap components
import { Form, FormGroup, Label, Input } from "reactstrap";
// import { route } from 'next/dist/next-server/server/router';
import router from "next/router";

function PageTabDashboard(props) {
  const router = useRouter();

  const goToDashboard = () => {
    router.push("/all-courses");
  };

  return (
    <>
      <div className="page-tabs">
        <Nav tabs>
          <NavItem>
            {/* <Link > */}
            <NavLink
              className={router.pathname == "/all-courses" ? "active" : ""}
            >
              <span
                className="d-none d-md-block"
                onClick={() => goToDashboard()}
              >
                All bookings
              </span>
              <span
                className="d-block d-md-none"
                onClick={() => goToDashboard()}
              >
                All
              </span>
            </NavLink>
            {/* </Link> */}
          </NavItem>
          <NavItem>
            <Link href="/upcoming-course">
              <NavLink
                className={
                  router.pathname == "/upcoming-course" ? "active" : ""
                }
              >
                <span className="d-none d-md-block">Upcoming courses</span>
                <span className="d-block d-md-none">Upcoming</span>
              </NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/past-course">
              <NavLink
                className={router.pathname == "/past-course" ? "active" : ""}
              >
                <span className="d-none d-md-block">Past courses</span>
                <span className="d-block d-md-none">Past</span>
              </NavLink>
            </Link>
          </NavItem>
        </Nav>
      </div>
    </>
  );
}

export default PageTabDashboard;
