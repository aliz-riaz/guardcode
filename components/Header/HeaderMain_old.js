import React, { useState } from 'react';
import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    FormGroup,
    Input,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Row,
    Col
} from 'reactstrap';
import Link from 'next/link'
import { connect } from 'react-redux';
import router from 'next/router';
import styles from "../../pages/Home.module.scss"

const HeaderMain = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };
    return (
        <header id="header_main">
            <section className={`top_row`}>
                <div className="container">
                    <div className="row no-gutters">
                        <Col className='col-12 col-lg-12'>
                            <p className='text-center fs-6 fw-normal'>Sign up today and get your first 10 job posts worth £1500 for FREE</p>
                        </Col>
                    </div>
                </div>
            </section>
            <section className={`home_tab_gradient py-0 text-white top_navbar`}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-sm-inline-block d-flex justify-content-between">
                            <a className="text-white" href="https://www.get-licensed.co.uk" >Book training </a>
                            <a className="text-white" href="https://www.get-licensed.co.uk/jobs" >Find work </a>
                            <a className={`active`} href="https://www.get-licensed.co.uk/employers" >Post jobs</a>
                            <a className={`text-white`} href="https://www.get-licensed.co.uk/e-learning" >E-learning</a>
                            <a className={`text-white`} href="https://shop.get-licensed.co.uk/" >Shop</a>
                        </div>
                    </div>
                </div>
            </section>
            <Container>

                <Navbar expand="md">
                    <Link href="/" >
                        <NavbarBrand>
                            <img src={process.env.APP_URL + "/images/logo-new.svg"} height="56px" />
                        </NavbarBrand>
                    </Link>
                    {/* <div className="d-block d-md-none" onClick={toggle}>Ali</div> */}
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <div className="d-block d-md-none close-mobile-menu cursor-pointer" onClick={toggle}>Close</div>
                        {/* <FormGroup className="gl-search-location mb-0 d-none d-md-flex">
                        <Input type="search" className="forn-control" placeholder="Search a company" />
                        <Button className="btn btn-green">
                            <img src={process.env.APP_URL+"/images/arrow-img.svg"} alt="arrow-icon" />
                        </Button>
                    </FormGroup> */}
                        {/* <Nav className="mr-auto" navbar>
                            <NavItem className="">
                                <NavLink href={process.env.APP_URL+'/login'} >Post a job</NavLink>
                            </NavItem>
                            <NavItem className="">
                                <NavLink href={process.env.APP_URL+"/dashboard"} >Book a course</NavLink>
                            </NavItem>
                        </Nav>     */}
                        <Nav className="mr-auto" navbar>
                            <NavItem className="d-block d-md-none">
                                {props.user_token != "" ? <NavLink href={process.env.APP_URL + "/dashboard"} className="underline-opening">Dashboard</NavLink> : <NavLink href={process.env.APP_URL + "/login"} className="underline-opening">Sign In</NavLink>}
                            </NavItem>
                            <NavItem className="d-block d-md-none">
                                {props.user_token != "" ? <NavLink href={process.env.APP_URL + "/staffing"} className="underline-opening">Staffing</NavLink> : <NavLink href={process.env.APP_URL + "/signup"} className="underline-opening">Join Now</NavLink>}
                            </NavItem>
                            <NavItem className="d-block d-md-none">
                                <NavLink href="https://www.get-licensed.co.uk/about" className="underline-opening">About</NavLink>
                            </NavItem>
                            {/* <NavItem>
                                <NavLink href="/components/" className="underline-opening">Training</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/" className="underline-opening">Vetting</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/" className="underline-opening">Staffing</NavLink>
                            </NavItem> */}
                            {/* <NavItem className="d-block d-md-none">
                                <NavLink href="/" className="underline-opening">Faq</NavLink>
                            </NavItem>
                            <NavItem className="d-block d-md-none">
                                <NavLink href="/" className="underline-opening">Help</NavLink>
                            </NavItem> */}

                        </Nav>
                        {/* onClick={() => router.push("/dashboard")} */}
                        <NavbarText className="pl-5 pr-5 pl-md-5 text-right find_job d-none">
                            <Link href="/" >
                                <a className="text-decoration-line fw-normal">Find a job</a>
                            </Link>
                        </NavbarText>
                        {props.user_token != "" ? <>
                            <NavItem className="d-none d-md-flex user_login">
                                <NavLink className="cursor-pointer btn btn-link" onClick={() => router.push("/dashboard")}>
                                    <span className="userAvatar">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 31">
                                            <g fill="none" fill-rule="evenodd">
                                                <g stroke-width="2">
                                                    <g transform="translate(-1.000000, 0.000000) translate(1.000000, 0.000000)">
                                                        <path stroke-linecap="square" d="M15 20h0c-2.209 0-4-1.97-4-4.4v-2.2c0-2.43 1.791-4.4 4-4.4h0c2.209 0 4 1.97 4 4.4v2.2c0 2.43-1.791 4.4-4 4.4z" />
                                                        <path d="M22 25c-1.172-1.802-2.952-3-4.903-3H13.9c-1.967 0-3.728 1.163-4.9 2.99" />
                                                        <circle cx="15" cy="15" r="12" stroke-linecap="square" />
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </span>
                                    <span className="valTxt ml-1">{props.decision_maker_first_name + ' ' +
                                        props.decision_maker_last_name}</span>
                                </NavLink>
                            </NavItem>
                        </> :
                            <>
                                <NavbarText className="joinNow d-none d-md-block">
                                    <Link href={process.env.APP_URL + "/signup"} >
                                        <a className="btn btn-sm btn-secondary text-white">Post a job</a>
                                    </Link>
                                </NavbarText>
                                <NavbarText className="signin d-none d-md-block">
                                    <Link href={process.env.APP_URL + "/login"} >
                                        <a >Sign in</a>
                                    </Link>
                                </NavbarText>
                            </>}

                    </Collapse>
                </Navbar>
            </Container>
        </header>
    );
}

const mapStateToProps = (state) => ({
    user_token: state.vantage.userDataReducer.user_token,
    decision_maker_first_name: state.vantage.userDataReducer.decision_maker_first_name,
    decision_maker_last_name: state.vantage.userDataReducer.decision_maker_last_name,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMain);