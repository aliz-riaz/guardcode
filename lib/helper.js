export const mapLicenseIdToText = (id) => {
  switch (id.toString()) {
    case "12":
      return "Door Supervisor Licence";
    case "13":
      return "CCTV Licence";
    case "44":
      return "Security Guarding Licence";
    case "29":
      return "Close Protection Licence";
    default:
      return "";
  }
};

export const arrYesForSWPProfile = [
  {
    name: "Valid ID",
    value: "I have a valid ID (passport or driving licence)",
  },
  {
    name: "Address proof",
    value: "I have utility bills in my name on the current address",
  },
  {
    name: "No bankruptcy",
    value: "I have been convicted of a criminal offence",
  },
  { name: "No criminal record", value: "I have been bankrupt in the past" },
  {
    name: "No CCJs",
    value: "I have a CCJ (County Court Judgement) issued in the past 6 years",
  },
];

export const arrNoForSWPProfile = [
  {
    name: "Valid ID",
    value: "I don't have a valid ID (passport or driving licence)",
  },
  {
    name: "Address proof",
    value: "I don't have utility bills in my name on the current address",
  },
  {
    name: "No bankruptcy",
    value: "I have never been convicted of a criminal offence",
  },
  {
    name: "No criminal record",
    value: "I have never been bankrupt in the past",
  },
  {
    name: "No CCJs",
    value:
      "I don't have any CCJS (County Court Judgement) issued in the past 6 years",
  },
];

export const imgYesForSWPProfile = [
  "c-check.svg",
  "c-check.svg",
  "c-warning.svg",
  "c-warning.svg",
  "c-warning.svg",
];
export const imgNoForSWPProfile = [
  "c-warning.svg",
  "c-warning.svg",
  "c-check.svg",
  "c-check.svg",
  "c-check.svg",
];

export const serviceOptions = [
  { value: "1", label: "Door Supervision" },
  { value: "2", label: "CCTV Monitoring" },
  { value: "3", label: "Security Guarding" },
  { value: "4", label: "Close Protection" },
  { value: "5", label: "Key Holding" },
  { value: "6", label: "Vehicle Immobilisation" },
];

export const serverSideRedirectionTo = (value) => {
  return {
    redirect: {
      destination: `/${value}`,
    },
  };
};
