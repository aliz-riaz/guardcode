import React, { useState } from "react";
import { useRouter } from "next/router";
import { Nav, NavItem, NavLink } from "reactstrap";
import Link from "next/link";
import styles from "./NavigationBar.module.scss";
function NavigationBar() {
  const router = useRouter();

  return (
    <>
      <div className="page-tabs">
        <Nav tabs>
          <NavItem>
            <Link href="/shifts">
              <NavLink className={router.pathname == "/shifts" ? "active" : ""}>
                <span className="d-md-block">Shifts</span>
              </NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/shifts/sites">
              <NavLink
                className={router.pathname == "/shifts/sites" ? "active" : ""}
              >
                <span className="d-md-block">Sites</span>
              </NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/shifts/roles">
              <NavLink
                className={router.pathname == "/shifts/roles" ? "active" : ""}
              >
                <span className="d-md-block">Roles</span>
              </NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/shifts/timesheets">
              <NavLink
                className={
                  router.pathname == "/shifts/timesheets" ? "active" : ""
                }
              >
                <span className="d-md-block">Timesheets</span>
              </NavLink>
            </Link>
          </NavItem>
          <div
            className={`text-white ${styles.control_room} d-md-block d-none`}
          >
            <div className={styles.heading}>24/7 Control Room Contact</div>
            <div className={styles.phone_number}> 0330 660 0012</div>
          </div>
        </Nav>
      </div>
    </>
  );
}

export default NavigationBar;
