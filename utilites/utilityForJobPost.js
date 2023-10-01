const jobPostData = (props) => {
  return {
    title: props.job_title,
    ref_number: props.job_ref_number,
    employment_type: props.type_of_employment,
    license_course_id: props.license_required,
    contract_type: props.contract_type,
    venue_type:
      props.venue_type == "Other"
        ? props.venue_type_other_value
        : props.venue_type,
    is_immediate: props.is_immediate,
    shift_schedule: props.shift_schedule,
    shift_timings: props.shift_timing,
    description: props.job_description,
    is_report_specific_address: props.specific_address == "yes" ? 1 : 0,
    address:
      props.specific_address == "yes" ? props.loqate_address_line_one : "",
    address2:
      props.specific_address == "yes" ? props.loqate_address_line_two : "",
    city:
      props.specific_address == "yes"
        ? props.loqate_city_town
        : props.google_city_town,
    // city: "London",
    postal_code:
      props.specific_address == "yes"
        ? props.loqate_postal_code
        : props.google_post_code,
    salary_type: props.salary_type,
    salary: props.salary_type == "Fixed Rate" ? props.salary_pay : null,
    salary_min:
      props.salary_type == "Fixed Rate" ? null : props.salary_range_min,
    salary_max:
      props.salary_type == "Fixed Rate" ? null : props.salary_range_max,
    pay_frequency: props.salary_per_unit,
    benefit_id: props.salary_benefits,
    updating_email: props.daily_updates_about_this_job_email,
    latitude:
      props.specific_address == "yes"
        ? props.center_for_map_loqate.lat
        : props.center_for_google_map.lat,
    longitude:
      props.specific_address == "yes"
        ? props.center_for_map_loqate.lng
        : props.center_for_google_map.lng,
    working_hours: props.salary_work_hour_per_week,
    external_link: props.websiteLink,
  };
};

export const JobPostWhenBoostNotApplicableJobPostPage = async (props) => {
  props.setSubmitting(true);

  const data = jobPostData(props);

  if (
    (props.saveJobAsTemplate && props.fromJobTemplate === false) ||
    (props.updateJobTemplate &&
      props.fromJobTemplate &&
      props.saveJobAsTemplate)
  ) {
    data.save_job_as_template = props.saveJobAsTemplate;
    data.is_available_for_team = props.isAvailableForTeam;
    data.template_name = props.jobTemplate.name;
  } else if (
    props.updateJobTemplate &&
    props.fromJobTemplate &&
    props.saveJobAsTemplate == false
  ) {
    data.update_job_template = Number(props.updateJobTemplate);
    data.is_available_for_team = props.isAvailableForTeam;
    data.template_name = props.jobTemplate.name;
    data.template_id = props.templateId;
  }
  // ===> add keys into api call for draft <===
  if (props.is_job_draft) {
    // this block will run when user post job with draft template
    data.draft_template_id = props.templateId;
  }

  if (props.avalible_connects > 0) {
    // if(false) {
    await props
      .fetchMatchingCandidatesForBoost(props.user_token, {
        latitude:
          props.specific_address == "yes"
            ? props.center_for_map_loqate.lat
            : props.center_for_google_map.lat,
        longitude:
          props.specific_address == "yes"
            ? props.center_for_map_loqate.lng
            : props.center_for_google_map.lng,
      })
      .then(async (response) => {
        if (response.data.is_boost_applicable == false) {
          await props.postJob(data, props.user_token).then((res) => {
            props.setSubmitting(false);
            if (res) {
              props.setJobPostModalStatus(false);
              props.goToNext(2);
            }
          });
        } else {
          props.setJobPostModalStatus(true);
        }
      });
    props.setSubmitting(false);
  } else {
    props.setSubmitting(false);
    props.setShowBillingModal(true);
    props.setShowJobPostCalculator(true);
  }
};

export const JobPostWithoutBoostJobPostModal = async ({
  props,
  setIsPostWithoutBoost,
}) => {
  setIsPostWithoutBoost(true);

  const data = jobPostData(props);

  data.template_name = props.jobTemplate.name;

  if (props.is_job_draft) {
    // this block will run when user post job with draft template
    data.draft_template_id = props.templateId;
  }

  if (
    (props.saveJobAsTemplate && props.fromJobTemplate === false) ||
    (props.updateJobTemplate &&
      props.fromJobTemplate &&
      props.saveJobAsTemplate)
  ) {
    data.save_job_as_template = props.saveJobAsTemplate;
    data.is_available_for_team = props.isAvailableForTeam;
    data.template_name = props.jobTemplate.name;
  } else if (
    props.updateJobTemplate &&
    props.fromJobTemplate &&
    props.saveJobAsTemplate == false
  ) {
    data.update_job_template = Number(props.updateJobTemplate);
    data.is_available_for_team = props.isAvailableForTeam;
    data.template_name = props.jobTemplate.name;
    data.template_id = props.templateId;
  }

  await props.postJob(data, props.user_token).then((res) => {
    if (res) {
      props.setJobPostModalStatus(false);
      props.setActiveStep(6);
      // props.setIsPostWithoutBoot(false);
    }
  });
};

export const JobPostWithBoostJobPostModal = async ({
  props,
  setIsPostWithBoost,
}) => {
  setIsPostWithBoost(true);

  const data = jobPostData(props);

  data.should_boost = true;
  data.template_name = props.jobTemplate.name;

  if (
    (props.saveJobAsTemplate && props.fromJobTemplate === false) ||
    (props.updateJobTemplate &&
      props.fromJobTemplate &&
      props.saveJobAsTemplate)
  ) {
    data.save_job_as_template = props.saveJobAsTemplate;
    data.is_available_for_team = props.isAvailableForTeam;
    data.template_name = props.jobTemplate.name;
  } else if (
    props.updateJobTemplate &&
    props.fromJobTemplate &&
    props.saveJobAsTemplate == false
  ) {
    data.update_job_template = Number(props.updateJobTemplate);
    data.is_available_for_team = props.isAvailableForTeam;
    data.template_name = props.jobTemplate.name;
    data.template_id = props.templateId;
  }

  await props.postJob(data, props.user_token).then((res) => {
    if (res) {
      props.setJobPostModalStatus(false);
      props.setActiveStep(6);
      setIsPostWithBoost(false);
    }
  });
};

export const RepostJobFromJobList = async (props) => {
  props.setSubmitting(true);

  const data = jobPostData(props);

  if (
    (props.saveJobAsTemplate && props.fromJobTemplate === false) ||
    (props.updateJobTemplate &&
      props.fromJobTemplate &&
      props.saveJobAsTemplate)
  ) {
    data.save_job_as_template = props.saveJobAsTemplate;
    data.is_available_for_team =
      props.isAvailableForTeam == undefined ? 0 : props.isAvailableForTeam;
    data.template_name = props.jobTemplate.name;
  } else if (
    props.updateJobTemplate &&
    props.fromJobTemplate &&
    props.saveJobAsTemplate == false
  ) {
    data.update_job_template = Number(props.updateJobTemplate);
    data.is_available_for_team = props.isAvailableForTeam;
    data.template_name = props.jobTemplate.name;
    data.template_id = props.templateId;
  }

  if (props.avalible_connects > 0) {
    // if(false) {
    await props
      .fetchMatchingCandidatesForBoost(props.user_token, {
        latitude:
          props.specific_address == "yes"
            ? props.center_for_map_loqate.lat
            : props.center_for_google_map.lat,
        longitude:
          props.specific_address == "yes"
            ? props.center_for_map_loqate.lng
            : props.center_for_google_map.lng,
      })
      .then(async (response) => {
        if (response.data.is_boost_applicable == false) {
          await props.postJob(data, props.user_token).then((res) => {
            props.setSubmitting(false);
            if (res) {
              props.setJobPostModalStatus(false);
              props.goToNext(2);
            }
          });
        } else {
          props.setJobPostModalStatus(true);
        }
      });
    props.setSubmitting(false);
  } else {
    props.setSubmitting(false);
    props.setShowBillingModal(true);
    props.setShowJobPostCalculator(true);
  }
};

export const SaveJobTemplateFromRepost = async (props) => {
  props.setSubmitting(true);

  const data = jobPostData(props);

  if (props.is_job_draft) {
    // when user click on draft
    data.save_job_as_template = 0;
    data.template_id = props.templateId;
    data.update_job_template = 1;
    data.is_draft = 1;
  } else {
    // when user comes from by clicking on repost job
    data.save_job_as_template = 1;
    data.is_draft = 1;
  }

  await props.saveJobAsTemplateFromRepost(data, props.user_token);
  props.setSubmitting(false);
};
