import { useEffect } from "react";
import Header from "../../components/Header/index";
import Sidenav from "../../components/LeftNav";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { protectedRoute } from "../../utilites/utility";

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};

function JobPostThankyou(props) {
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get("jobPostThankyou")) {
      router.push("/jobpost");
    }
  }, []);

  return (
    <>
      <Header isNavBarOpenCookie={props.isNavBarOpenCookie} />
      <div className="main-layout">
        <Sidenav isNavBarOpenCookie={props.isNavBarOpenCookie} />
        <div className="main-content">
          <h1>Thank you</h1>

          {/* <SlideControl nextUrl="/booking/step-2" /> */}
        </div>
      </div>
    </>
  );
}

export default JobPostThankyou;
