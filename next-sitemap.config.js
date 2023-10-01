module.exports = {
  siteUrl: `${process.env.APP_URL}`,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: ["/"],
      },
      {
        userAgent: "*",
        disallow: [
          "/dashboard",
          "/account-settings",
          "/chat",
          "/booking/*",
          "/staffing",
          "/jobpost/*",
          "/cv-search",
          "/past-course",
          "/upcoming-course",
          "/vetting",
          "/thankyou",
        ],
      },
    ],
  },
  exclude: [
    "/dashboard",
    "/account-settings",
    "/chat",
    "/booking/*",
    "/staffing",
    "/jobpost/*",
    "/cv-search",
    "/past-course",
    "/upcoming-course",
    "/vetting",
    "/thankyou",
  ], // <= exclude here
};
