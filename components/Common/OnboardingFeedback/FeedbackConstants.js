const step1keys = {
  hiring: false,
  traning: false,
};

const step2keys = {
  linkedin: false,
  indeed: false,
  reed: false,
  jobToday: false,
  others: false,
};
const step3keys = {
  temporary: false,
  permenant: false,
  shiftBased: false,
  placement: false,
};
const step4keys = {
  corporate: false,
  retail: false,
  barClub: false,
  events: false,
  mobile: false,
  venueOthers: false,
};
const step5keys = {
  ds: false,
  cctv: false,
  topUpDS: false,
  cp: false,
  topUpSG: false,
  sg: false,
  efaw: false,
  aplh: false,
};

const initialValues = {
  //step 1
  ...step1keys,
  //step 2
  ...step2keys,
  //step3
  ...step3keys,
  //step 4
  ...step4keys,
  // step 5
  ...step5keys,
};

const PLATFORM_DATA = (linkedin, indeed, reed, jobToday, others) => ({
  linkedin: linkedin,
  indeed: indeed,
  reed: reed,
  job_today: jobToday,
  others: others,
});

const JOB_TYPE_DATA = (temporary, permenant, shiftBased, placement) => ({
  temporary: temporary,
  permenant: permenant,
  shift_based: shiftBased,
  placement: placement,
});

const VENUE_TYPE_DATA = (
  corporate,
  retail,
  barClub,
  events,
  mobile,
  venueOthers
) => ({
  corporate: corporate,
  retail: retail,
  barclub: barClub,
  events: events,
  mobile: mobile,
  others: venueOthers,
});

const COURSES_DATA = (ds, cctv, topUpDS, cp, topUpSG, sg, efaw, aplh) => ({
  ds: ds,
  cctv: cctv,
  topup_ds: topUpDS,
  cp: cp,
  topup_sg: topUpSG,
  sg: sg,
  efaw: efaw,
  aplh: aplh,
});

const mapObjToApiObject = ({
  hiring,
  traning,
  linkedin,
  indeed,
  reed,
  jobToday,
  others,
  temporary,
  permenant,
  shiftBased,
  placement,
  corporate,
  retail,
  barClub,
  events,
  mobile,
  venueOthers,
  ds,
  cctv,
  topUpDS,
  cp,
  topUpSG,
  sg,
  efaw,
  aplh,
}) => {
  return {
    purpose: {
      hiring: hiring,
      training: traning,
    },
    platform: {
      ...(traning && !hiring
        ? PLATFORM_DATA(false, false, false, false, false)
        : PLATFORM_DATA(linkedin, indeed, reed, jobToday, others)),
    },
    job_type: {
      ...(traning && !hiring
        ? JOB_TYPE_DATA(false, false, false, false)
        : JOB_TYPE_DATA(temporary, permenant, shiftBased, placement)),
    },
    venue_type: {
      ...(traning && !hiring
        ? VENUE_TYPE_DATA(false, false, false, false, false, false)
        : VENUE_TYPE_DATA(
            corporate,
            retail,
            barClub,
            events,
            mobile,
            venueOthers
          )),
    },
    courses: {
      ...(!traning && hiring
        ? COURSES_DATA(false, false, false, false, false, false, false, false)
        : COURSES_DATA(ds, cctv, topUpDS, cp, topUpSG, sg, efaw, aplh)),
    },
  };
};

export {
  step1keys,
  step2keys,
  step3keys,
  step4keys,
  step5keys,
  initialValues,
  mapObjToApiObject,
};
