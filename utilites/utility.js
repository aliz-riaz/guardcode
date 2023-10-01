// Get the user's session based on the request
import * as cookie from "cookie";
import { serialize } from "cookie";
export const protectedRoute = async function ({
  req,
  res,
  resolvedUrl,
  query,
}) {
  const cookies = cookie.parse(
    req ? req.headers.cookie || "" : document.cookie
  );
  const jobpostGuard =
    Buffer.from(cookies?.natprp?.toString() ?? "", "base64").toString() ?? "";
  if (!cookies.user) {
    res.setHeader(
      "Set-Cookie",
      serialize("intended", resolvedUrl, { path: "/" })
    );
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  if (
    !cookies.isOrgSelected &&
    resolvedUrl != "/organisation" &&
    !resolvedUrl.includes("/organisation/add") &&
    !cookies.intended &&
    !query.organisationid
  ) {
    return {
      redirect: {
        destination: "/organisation",
      },
    };
  }

  if (resolvedUrl == "/jobpost" && jobpostGuard == 0) {
    return {
      redirect: {
        destination: "/staffing",
      },
    };
  } else if (resolvedUrl == "/shifts/post" && jobpostGuard == 0) {
    return {
      redirect: {
        destination: "/shifts",
      },
    };
  }

  return {
    props: {
      isNavBarOpenCookie: cookies?.isNavBarOpenCookie ?? true,
      jobPostActiveStep: cookies?.jobPostActiveStep ?? 1,
      query,
    },
  };
};

export const protectLoginPageIfLogin = async function ({
  req,
  res,
  query,
  resolvedUrl,
}) {
  const user = req.cookies["user"];

  if (query.claim && user) {
    return {
      redirect: {
        destination: `/account-settings?claim=${query.claim}`,
        permanent: false,
      },
    };
  }
  if (user) {
    return {
      redirect: {
        destination: "/organisation",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export const shiftTimings = [
  { value: "1", label: "Day & Night" },
  { value: "2", label: "Night only" },
  { value: "3", label: "Day only" },
];
