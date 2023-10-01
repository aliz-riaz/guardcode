export const mapSalaryBeniftsBackToText = (value) => {
  value = parseInt(value);
  switch (value) {
    case 1:
      return "On-site parking";
    case 2:
      return "Company Car";
    case 3:
      return "Medical insurance";
    case 4:
      return "Sick pay";
    case 5:
      return "Uniform";
    case 6:
      return "Store discounts";
    default:
      return "";
  }
};
export const mapSalaryUnitBackToCompleteText = (value) => {
  switch (value) {
    case "H":
      return "per hour";
    case "M":
      return "per month";
    case "Y":
      return "per year";
    default:
      return "";
  }
};
export const mapCourseNumberBackToCourseName = (value) => {
  value = parseInt(value);
  switch (value) {
    case 12:
      return "SIA Door Supervisor Licence";
    case 13:
      return "SIA CCTV Licence";
    case 44:
      return "SIA Security Guarding Licence";
    case 29:
      return "SIA Close Protection Licence";
    default:
      return "";
  }
};
