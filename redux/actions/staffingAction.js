import router from "next/router";
import { toast } from "react-toastify";
import * as t from "../types";
var _ = require("lodash");

export const setFilterForJobList = (filter) => {
  return {
    type: t.SET_FILTER_FOR_JOB_LIST,
    payload: filter,
  };
};

export const setDateOrderForJobList = (dateOrder) => {
  return {
    type: t.SET_DATE_ORDER_FOR_JOB_LIST,
    payload: dateOrder,
  };
};

export const setSearchKeywordForJobList = (searchKeyword) => {
  return {
    type: t.SET_SEARCH_KEYWORD_FOR_JOB_LIST,
    payload: searchKeyword,
  };
};

// export const setPaginationForJobList = (searchKeyword) => {
//   return ({
//   type: t.SET_PAGINATION_FOR_JOB_LIST,
//   payload : searchKeyword
//   })
// }

export const setCurrentPageForJobList = (currentPage) => {
  return {
    type: t.SET_CURRENT_PAGE_FOR_JOB_LIST,
    payload: currentPage,
  };
};
export const setScreenToShowOnStaffing = (screen) => {
  return {
    type: t.SET_SCREEN_TO_SHOW_ON_STAFFING,
    payload: screen,
  };
};
export const setJobToBeShownInApplicantTab = (job) => {
  return {
    type: t.SET_JOB_TO_BE_SHOWN_IN_APPLICANT_TAB,
    payload: job,
  };
};
export const setSelectedJobApplicants = (applicants) => {
  return {
    type: t.SET_SELECTED_JOB_APPLICANTS,
    payload: applicants,
  };
};
export const setDidUserClickedAJob = (status) => {
  return {
    type: t.SET_DID_USER_CLICKED_A_JOB,
    payload: status,
  };
};
export const setLatestJobId = (jobId) => {
  return {
    type: t.SET_LATEST_JOB_ID,
    payload: jobId,
  };
};
export const setCurrentPageForApplicantList = (page) => {
  return {
    type: t.SET_CURRENT_PAGE_FOR_APPLICANT_LIST,
    payload: page,
  };
};
export const setFilterForApplicantList = (filter) => {
  return {
    type: t.SET_FILTER_FOR_APPLICANT_LIST,
    payload: filter,
  };
};
export const setDateOrderForApplicantList = (dateOrder) => {
  return {
    type: t.SET_DATE_ORDER_FOR_APPLICANT_LIST,
    payload: dateOrder,
  };
};
export const setSearchKeywordForApplicantList = (keyword) => {
  return {
    type: t.SET_SEARCH_KEYWORD_FOR_APPLICANT_LIST,
    payload: keyword,
  };
};

export const setSWPProfileWindowToBeShown = (status) => {
  return {
    type: t.SET_SWP_PROFILE_WINDOW_STATUS,
    payload: status,
  };
};
export const setActiveStepForCloseJobDiscard = (status) => {
  return {
    type: t.SET_ACTIVE_STEP_FOR_CLOSE_JOB_DISCARD,
    payload: status,
  };
};
export const setRadioForJobDiscard = (status) => {
  return {
    type: t.SET_RADIO_FOR_JOB_DISCARD,
    payload: status,
  };
};
export const setCheckBoxListForCloseJobDiscard = (list) => {
  return {
    type: t.SET_CHECKBOX_LIST_FOR_CLOSE_JOB_DISCARD,
    payload: list,
  };
};
export const setInviteApplicants = (list) => {
  return {
    type: t.SET_INVITE_APPLICANTS,
    payload: list,
  };
};
export const setSelectedJobIdForCloseJobDiscard = (jobId) => {
  return {
    type: t.SET_SELECTED_JOB_ID_FOR_CLOSE_JOB_DISCARD,
    payload: jobId,
  };
};
export const setSelectedJobNameForCloseJobDiscard = (name) => {
  return {
    type: t.SET_SELECTED_JOB_NAME_FOR_CLOSE_JOB_DISCARD,
    payload: name,
  };
};
export const setClickedSWPProfileStatus = (status) => {
  return {
    type: t.SET_CLICKED_SWP_PROFILE_STATUS,
    payload: status,
  };
};
// export const setSWPProfileNotes = (status) => {
//     return ({
//         type: t.SET_SWP_PROFILE_NOTES,
//         payload : status
//     })
// }
export const setSWPProfileIndex = (status) => {
  return {
    type: t.SET_SWP_PROFILE_INDEX,
    payload: status,
  };
};
export const setSWPProfileForUnmount = (profile) => {
  return {
    type: t.SET_SWP_PROFILE_TO_BE_SHOWN,
    payload: profile,
  };
};
export const setSWPProfileNextCandidateStatus = (status) => {
  return {
    type: t.SET_NEXT_CANDIDATE_STATUS,
    payload: status,
  };
};

export const fetchJobPostedByUser =
  (
    userToken,
    jobStatus = "",
    keyword = "",
    dateOrder = "DESC",
    pageNumber = 1,
    url = "",
    userJobClickedStatus,
    members,
    listType
  ) =>
  async (dispatch) => {
    let request_status = false;
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: true,
    });
    let dataObj = {
      keyword: keyword,
      date_order: dateOrder,
      list_type: listType,
      ...(jobStatus != "" && { job_status: jobStatus }),
      ...(members?.length > 0 && { member_ids: members }),
    };

    const courses = await fetch(
      url != "" ? url : process.env.API_URL + "job?page=" + pageNumber,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + userToken,
        },
        body: JSON.stringify({ ...dataObj }),
      }
    )
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        if (userJobClickedStatus == false) {
          dispatch({
            type: t.SET_LATEST_JOB_ID,
            payload: result.data?.data[0]?.id,
          });
        }
        dispatch({
          type: t.SET_JOB_HEADER_STATS,
          payload: {
            total_jobs_count: result.employer.total_jobs,
            open_jobs_count: result.employer.open_jobs,
            closed_jobs_count: result.employer.closed_jobs,
          },
        });
        dispatch({
          type: t.SET_JOBS_POSTED_BY_USER,
          payload: result.data.data,
        });
        dispatch({
          type: t.SET_PAGINATION_FOR_JOB_LIST,
          payload: result.data.links,
        });
        dispatch({
          type: t.SET_TOTAL_PAGES_FOR_JOB_LIST,
          payload: result.data.last_page,
        });
        request_status = true;
      });
    // .catch(function (error) {
    //     toast.error("Something Went Wrong! Try Agian");
    // });
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: false,
    });
    return request_status;
  };

export const fetchJobCloseQuestions = (userToken) => async (dispatch) => {
  let request_status = false;
  dispatch({
    type: t.SET_IS_REQUEST_LOADER,
    payload: true,
  });

  const questions = await fetch(process.env.API_URL + "job/feedback/options", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + userToken,
    },
  })
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(function (result) {
      if (result.data?.yes) {
        dispatch({
          type: t.SET_YES_SCREEN_QUESTION_FOR_CLOSE_JOB_DISCARD,
          payload: result.data.yes,
        });
      }

      if (result.data?.no) {
        dispatch({
          type: t.SET_NO_SCREEN_QUESTION_FOR_CLOSE_JOB_DISCARD,
          payload: result.data.no,
        });
      }
      request_status = true;
    })
    .catch(function (error) {
      toast.error("Something Went Wrong! Try Agian");
    });
  dispatch({
    type: t.SET_IS_REQUEST_LOADER,
    payload: false,
  });
  return request_status;
};

export const fetchJobDescription = (userToken, jobId) => async (dispatch) => {
  let request_status = false;
  // dispatch({
  //     type: t.SET_IS_REQUEST_LOADER,
  //     payload: true,
  //   });

  const jobDescription = await fetch(
    `${process.env.API_URL}job/${jobId}/detail`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + userToken,
      },
    }
  )
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(function (result) {
      dispatch({
        type: t.SET_JOB_DESCRIPTION_DATA,
        payload: {
          job_title: result.data.title,
          type_of_employment: result.data.employment_type,
          company_name: result.data.organisation.organisation_name,
          job_description: result.data.description,
          specific_address: "yes",
          google_city_town: "",
          loqate_city_town: result.data.city,
          salary_pay: result.data.salary,
          salary_per_unit: result.data.salary_per,
          license_required: result.data.job_licenses.map(
            (license) => license.course_id
          ),
          contract_type: result.data.contract_type,
          salary_benefits: result.data.job_benefits,
          venue_type: result.data.venue_type,
          shift_schedule: result.data.shift_schedule,
          shift_timings: result.data.shift_timings,
          salary_type: result.data.salary_type,
          salary_min: result.data.salary_min,
          salary_max: result.data.salary_max,
        },
      });

      request_status = true;
    });
  // .catch(function (error) {
  //     toast.error("Something Went Wrong! Try Agian");
  // });
  // dispatch({
  //     type: t.SET_IS_REQUEST_LOADER,
  //     payload: false,
  //   });
  return request_status;
};

const fetchJobPostedByUserAfterStatusUpdate = async (
  userToken,
  jobStatus,
  keyword,
  dateOrder,
  pageNumber,
  dispatch,
  members,
  listType
) => {
  let request_status = false;
  dispatch({
    type: t.SET_IS_REQUEST_LOADER,
    payload: true,
  });
  let dataObj = {
    keyword: keyword,
    date_order: dateOrder,
    ...(listType && { list_type: listType }),
    ...(jobStatus != "" && { job_status: jobStatus }),
    ...(members?.length > 0 && { member_ids: members }),
  };

  const courses = await fetch(process.env.API_URL + "job?page=" + pageNumber, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + userToken,
    },
    body: JSON.stringify({ ...dataObj }),
  })
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(function (result) {
      dispatch({
        type: t.SET_JOBS_POSTED_BY_USER,
        payload: result.data.data,
      });
      dispatch({
        type: t.SET_JOB_HEADER_STATS,
        payload: {
          total_jobs_count: result.employer.total_jobs,
          open_jobs_count: result.employer.open_jobs,
          closed_jobs_count: result.employer.closed_jobs,
        },
      });
      dispatch({
        type: t.SET_PAGINATION_FOR_JOB_LIST,
        payload: result.data.links,
      });
      dispatch({
        type: t.SET_TOTAL_PAGES_FOR_JOB_LIST,
        payload: result.data.last_page,
      });

      request_status = true;
    })
    .catch(function (error) {
      toast.error("Something Went Wrong! Try Again");
    });
  dispatch({
    type: t.SET_IS_REQUEST_LOADER,
    payload: false,
  });
  return request_status;
};

export const setJobStatus =
  (
    userToken,
    jobId,
    status,
    jobStatus,
    keyword,
    dateOrder,
    pageNumber,
    report = "",
    fetchApplicantData,
    selected_applicants,
    members,
    listType
  ) =>
  async (dispatch) => {
    let request_status = false;
    // dispatch({
    //     type: t.SET_IS_REQUEST_LOADER,
    //     payload: true,
    //   });
    let dataObj = {
      job_id: jobId,
      status: status,
      ...(selected_applicants && { selected_applicants }),
      ...(report != "" && { report: report }),
    };
    const courses = await fetch(process.env.API_URL + "job/status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify({ ...dataObj }),
    })
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        dispatch({
          type: t.SET_CURRENT_PAGE_FOR_JOB_LIST,
          payload: "1",
        });
        fetchJobPostedByUserAfterStatusUpdate(
          userToken,
          jobStatus,
          keyword,
          dateOrder,
          "1",
          dispatch,
          members,
          listType
        );
        //   if(!_.isEmpty(fetchApplicantData))
        // {
        //   fetchApplicantsAgainstJobAfterStatusUpdate(userToken, fetchApplicantData?.jobId,
        //     fetchApplicantData.applicantStatus,
        //     fetchApplicantData.keyword,
        //     fetchApplicantData.dateOrder,
        //     fetchApplicantData.pageNumber,
        //     fetchApplicantData.url,
        //     dispatch);
        // }
        if (status == "1") {
          toast.success("Your job has been opened.");
        } else {
          toast.success("Your job has been closed.");
        }
        request_status = true;
      })
      .catch(function (error) {
        toast.error("Something Went Wrong! Try Again");
      });
    // dispatch({
    //     type: t.SET_IS_REQUEST_LOADER,
    //     payload: false,
    //   });
    return request_status;
  };

export const countViewContactDetailGeckoBoard =
  (userToken, applicantId) => async (dispatch) => {
    let request_status = false;

    let dataObj = {
      jobseeker_id: applicantId,
    };
    const courses = await fetch(
      `${process.env.GUARD_PASS_URL}api/geckoboard/storeswpinfoclick`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          Authorization: "Bearer " + userToken,
        },
        body: JSON.stringify({ ...dataObj }),
      }
    )
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        if (status == "1") {
          // toast.success("Count has been added");
        } else {
          // toast.success("Count not added");
        }
        request_status = true;
      })
      .catch(function (error) {
        toast.error("Something Went Wrong! Try Again");
      });

    return request_status;
  };

export const fetchApplicantsAgainstJob =
  (userToken, jobId, applicantStatus = "", keyword = "", dateOrder = "DESC") =>
  async (dispatch) => {
    let request_status = false;
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: true,
    });
    dispatch({
      type: t.SET_SELECTED_JOB_APPLICANTS_SHIMMER,
      payload: true,
    });
    let dataObj = {
      keyword: keyword,
      date_order: dateOrder,
      application_status: applicantStatus,
    };
    const courses = await fetch(
      process.env.API_URL + "job/" + jobId + "/applications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + userToken,
        },
        body: JSON.stringify({ ...dataObj }),
      }
    )
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        dispatch({
          type: t.SET_JOB_TO_BE_SHOWN_IN_APPLICANT_TAB,
          payload: { ...result.data.job },
        });
        dispatch({
          type: t.SET_SELECTED_JOB_APPLICANTS,
          payload: result.data.applicants,
        });
        dispatch({
          type: t.SET_INVITE_APPLICANTS,
          payload: result.data.matching,
        });
        dispatch({
          type: t.SET_NEXT_CANDIDATE_STATUS,
          payload: false,
        });
        // dispatch({
        //   type: t.SET_APPLICANT_IN_STATE_FOR_FEEDBACK,
        //   payload: result.data.job.applicants,
        // });
        request_status = true;
      })
      .catch(function (error) {
        toast.error("Something Went Wrong! Try Again");
      });
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: false,
    });
    dispatch({
      type: t.SET_SELECTED_JOB_APPLICANTS_SHIMMER,
      payload: false,
    });
    return request_status;
  };

export const inviteApplicantToJob =
  (userToken, jobId, jobSeekerId) => async (dispatch) => {
    let request_status = false;
    // dispatch({
    //     type: t.SET_IS_REQUEST_LOADER,
    //     payload: true,
    //   });
    const courses = await fetch(`${process.env.API_URL}job/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify({ jobseeker_id: jobSeekerId, job_id: jobId }),
    })
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        toast.success("Invite sent successfully.");
        // dispatch({
        //   type: t.SET_INVITE_APPLICANTS,
        //   payload: result.data
        // })
        // dispatch({
        //   type: t.SET_SELECTED_JOB_APPLICANTS,
        //   payload: result.data.applicants
        // })
        request_status = true;
      })
      .catch(function (error) {
        toast.error("Something Went Wrong! Try Again");
      });
    // dispatch({
    //     type: t.SET_IS_REQUEST_LOADER,
    //     payload: false,
    //   });
    return request_status;
  };

// export const fetchApplicantsAgainstJobAfterStatusUpdate = async (userToken, jobId, applicantStatus = "", keyword = "", dateOrder = "DESC", pageNumber=1, url="", dispatch) => {
//   let request_status = false;
//   dispatch({
//       type: t.SET_IS_REQUEST_LOADER,
//       payload: true,
//     });
//      let dataObj = {
//        keyword : keyword,
//        date_order : dateOrder,
//        application_status : applicantStatus,
//      }
//      const courses = await fetch(
//         process.env.API_URL+'job/'+jobId+'/applications?page='+pageNumber,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//             "Authorization" : "Bearer " + userToken
//           },
//           body: JSON.stringify({...dataObj})
//         }
//       )
//       .then(function (response) {
//         if (!response.ok) {
//           throw Error(response.statusText);
//        } else {
//           return response.json();
//        }
//       })
//       .then(function (result) {

//             dispatch({
//               type: t.SET_JOB_TO_BE_SHOWN_IN_APPLICANT_TAB,
//               payload: result.data.job
//             })
//             dispatch({
//               type: t.SET_SELECTED_JOB_APPLICANTS,
//               payload: result.data.applicants
//             })
//             // dispatch({
//             //   type: t.SET_PAGINATION_FOR_APPLICANT_LIST,
//             //   payload: result.data.applicants.links
//             // })
//             // dispatch({
//             //   type: t.SET_TOTAL_PAGES_FOR_APPLICANT_LIST,
//             //   payload: result.data.applicants.last_page
//             // })
//             // dispatch({
//             //   type: t.SET_FILTER_FOR_APPLICANT_LIST,
//             //   payload : "all"
//             //   })
//             // dispatch({
//             //   type: t.SET_DATE_ORDER_FOR_APPLICANT_LIST,
//             //   payload : "DESC"
//             //   })
//             // dispatch({
//             //   type: t.SET_SEARCH_KEYWORD_FOR_APPLICANT_LIST,
//             //   payload : ""
//             //   })
//             request_status = true;
//       })
//       .catch(function (error) {
//           toast.error("Something Went Wrong! Try Again");
//       });
//       dispatch({
//           type: t.SET_IS_REQUEST_LOADER,
//           payload: false,
//         });
//       return request_status;
// }

export const fetchUserSWPProfile =
  (userToken, jobId, jobSeekerSlug) => async (dispatch) => {
    let request_status = false;
    dispatch({
      type: t.SET_SWP_PROFILE_SHIMMER,
      payload: true,
    });
    const courses = await fetch(
      `${process.env.API_URL}job/${jobId}/swp/${jobSeekerSlug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + userToken,
        },
        // body: JSON.stringify({ slug })
      }
    )
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        dispatch({
          type: t.SET_SWP_PROFILE_TO_BE_SHOWN,
          payload: {
            id: result.data.jobseeker.id,
            first_name: result.data.jobseeker.first_name,
            last_name: result.data.jobseeker.last_name,
            middle_name: result.data.jobseeker.middle_name,
            fullname: result.data.jobseeker.fullname,
            profile_picture: result.data.jobseeker.profile_picture,
            city: result.data.jobseeker.city,
            postcode: result.data.jobseeker.postcode,
            mobile_number: result.data.jobseeker.mobile_number,
            email_address: result.data.jobseeker.email_address,
            education_history: result.data.jobseeker.education_history,
            license: result.data.jobseeker.license,
            work_history: result.data.jobseeker.work_history,
            slug: result.data.jobseeker.slug,
            has_screened: result.data.jobseeker.has_screened,
            is_enhanced_profile: result.data.jobseeker.is_enhanced_profile,
            profile_video: result.data.jobseeker.profile_video,
            is_video_requested: result.data.jobseeker.is_video_requested,
            screening_questions: result.data.jobseeker.screening_questions,
            skill_badges: result.data?.jobseeker?.skill_badges,
            thumbnail_image: result.data.jobseeker.thumbnail_image,
            is_invited_job: result.data.jobseeker.is_invited_job,
            created_at: result.data.jobseeker.created_at,
            chat_group_id: result.data.jobseeker.chat_group_id,
            experience_answer: result.data.jobseeker?.experience_answer,
            driving_answer: result.data.jobseeker?.driving_answer,
            guard_rank: result.data.jobseeker?.guard_rank,
            // applicant status for job
            applicant_status: result.data?.status,
            // applicant notes
            notes: result.data.notes?.notes,
            date_of_applied_job: result.data.notes?.created_at,
            tags: result.data.jobseeker.tags,
          },
        });
        // dispatch({
        //   type: t.SET_SWP_PROFILE_NOTES,
        //   payload: result.data.notes?.notes
        // })

        request_status = true;
      })
      .catch(function (error) {
        toast.error("Something Went Wrong! Try Again");
      });
    dispatch({
      type: t.SET_SWP_PROFILE_SHIMMER,
      payload: false,
    });
    return request_status;
  };

export const updateApplicationStatusOfJob =
  (userToken, jobId, applicantId, status) => async (dispatch) => {
    let request_status = false;
    // dispatch({
    //     type: t.SET_IS_REQUEST_LOADER,
    //     payload: true,
    // });

    let dataObj = {
      job_id: jobId,
      applicant_id: applicantId,
      status: status,
    };

    await fetch(process.env.API_URL + "job/application/status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify(dataObj),
    })
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        if (status != "Reviewed") {
          toast.success("Applicant status updated successfully.");
        }
        request_status = true;
      })
      .catch(function (error) {
        toast.error("Something Went Wrong! Try Again");
      });

    // dispatch({
    //     type: t.SET_IS_REQUEST_LOADER,
    //     payload: false,
    // });
    return request_status;
  };

export const postNotesAgainstSWPProfile =
  (userToken, jobId, applicantId, notes) => async (dispatch) => {
    let request_status = false;
    // dispatch({
    //     type: t.SET_IS_REQUEST_LOADER,
    //     payload: true,
    // });

    let dataObj = {
      job_id: jobId,
      applicant_id: applicantId,
      notes: notes,
    };

    await fetch(process.env.API_URL + "job/application/notes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify(dataObj),
    })
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        request_status = true;
      })
      .catch(function (error) {
        toast.error("Something Went Wrong! Try Again");
      });

    // dispatch({
    //     type: t.SET_IS_REQUEST_LOADER,
    //     payload: false,
    // });
    return request_status;
  };

export const shareSWPProfile =
  (userToken, slug, emailAddress) => async (dispatch) => {
    let request_status = false;
    // dispatch({
    //     type: t.SET_IS_REQUEST_LOADER,
    //     payload: true,
    // });

    let dataObj = {
      slug: slug,
      email_address: emailAddress,
    };

    await fetch(process.env.API_URL + "job/share/swp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify(dataObj),
    })
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          toast.success("Profile Shared Successfully");
        }
      })
      .then(function (result) {
        request_status = true;
      })
      .catch(function (error) {
        toast.error("Something Went Wrong! Try Again");
      });

    // dispatch({
    //     type: t.SET_IS_REQUEST_LOADER,
    //     payload: false,
    // });
    return request_status;
  };

// export const getNotesAgainstSWPProfile = (userToken, jobId, applicantId) => async dispatch => {
//   let request_status = false;
//   // dispatch({
//   //     type: t.SET_IS_REQUEST_LOADER,
//   //     payload: true,
//   // });

//   // let dataObj = {
//   //     job_id: jobId,
//   //     applicant_id: applicantId,
//   //     notes: notes,
//   // }

//   await fetch(
//       process.env.API_URL + 'job/'+jobId+'/applicant/'+applicantId,
//       {
//           method: "GET",
//           headers: {
//               "Content-Type": "application/json",
//               "Accept": "application/json",
//               "Authorization": "Bearer " + userToken
//           },
//           // body: JSON.stringify(dataObj)
//       }
//   ).then(function (response) {
//       if (!response.ok) {
//           throw Error(response.statusText);
//       } else {
//           return response.json();
//       }
//   }).then(function (result) {
//     if(result.data.notes != null) {
//       dispatch({
//         type: t.SET_SWP_PROFILE_NOTES,
//         payload: result.data.notes
//       })
//     } else{
//       dispatch({
//         type: t.SET_SWP_PROFILE_NOTES,
//         payload: ''
//       })
//     }

//       request_status = true;
//   }).catch(function (error) {
//       toast.error("Something Went Wrong! Try Again");
//   });

//   // dispatch({
//   //     type: t.SET_IS_REQUEST_LOADER,
//   //     payload: false,
//   // });
//   return request_status;
// }

export const downloadUserSWPProfileCV =
  (userToken, slug, userName) => async (dispatch) => {
    let request_status = false;
    // dispatch({
    //     type: t.SET_IS_REQUEST_LOADER,
    //     payload: true,
    //   });
    const courses = await fetch(process.env.API_URL + "job/download/swp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify({ slug }),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.blob();
        }
      })
      .then((blob) => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = `${userName}.pdf`;
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();
        a.remove();
        request_status = true;
      })
      .catch(function (error) {
        toast.error("Something went wrong, Try Again!");
      });
    // dispatch({
    //     type: t.SET_IS_REQUEST_LOADER,
    //     payload: false,
    //   });
    return request_status;
  };

export const videoRequest =
  (userToken, jobsekerID, jobID, organisationID) => async (dispatch) => {
    let request_status = false;

    await fetch(process.env.API_URL + "employer/jobseeker/video/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify({
        jobseeker_id: jobsekerID,
        job_id: jobID,
        organisation_id: organisationID,
      }),
    })
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        request_status = true;
      })
      .catch(function (error) {
        toast.error("Something Went Wrong! Try Again");
      });
    return request_status;
  };

export const addUserInFeedbackList = (data) => async (dispatch) => {
  dispatch({
    type: t.SET_APPLICANT_IN_STATE_FOR_FEEDBACK,
    payload: data,
  });
};

export const fetchApplicantsByJobId =
  (userToken, jobId) => async (dispatch) => {
    let request_status = false;
    const courses = await fetch(
      `${process.env.API_URL}job/feedback/${jobId}/applicants`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + userToken,
        },
      }
    )
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        dispatch({
          type: t.SET_APPLICANT_IN_STATE_FOR_FEEDBACK,
          payload: result.data,
        });
        request_status = true;
      })
      .catch(function (error) {
        toast.error("Something Went Wrong! Try Again");
      });
    return request_status;
  };

export const setJobId = (jobId) => {
  return {
    type: t.SET_CLICKED_JOB_ID_FOR_EDIT,
    payload: jobId,
  };
};

export const fetchJobDescriptionForEdit =
  (userToken, jobId) => async (dispatch) => {
    let request_status = false;
    // dispatch({
    //     type: t.SET_IS_REQUEST_LOADER,
    //     payload: true,
    //   });

    const jobDescription = await fetch(
      `${process.env.API_URL}job/${jobId}/detail`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + userToken,
        },
      }
    )
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        dispatch({
          type: t.SET_JOB_TITLE,
          payload: result.data.title,
        });
        dispatch({
          type: t.SET_JOB_REF_NUMBER,
          payload: result.data.ref_number,
        });
        dispatch({
          type: t.SET_TYPE_OF_EMPLOYMENT,
          payload: result.data.employment_type,
        });
        dispatch({
          type: t.SET_SIA_LICENSE,
          payload: result.data.job_licenses.map((list) => {
            return list.course_id.toString();
          }),
        });
        dispatch({
          type: t.SET_CONTRACT,
          payload: result.data.contract_type,
        });
        dispatch({
          type: t.SET_SHIFT_SCHEDULE,
          payload: result.data.shift_schedule,
        });
        dispatch({
          type: t.SET_SHIFT_TIMING,
          payload: result.data.shift_timings_raw?.toString(),
        });

        if (
          result.data.venue_type == "Retail" ||
          result.data.venue_type == "Corporate" ||
          result.data.venue_type == "Bar/Club" ||
          result.data.venue_type == "Event" ||
          result.data.venue_type == "Mobile"
        ) {
          dispatch({
            type: t.SET_VENUE_TYPE,
            payload: result.data.venue_type,
          });

          dispatch({
            type: t.SET_VENUE_TYPE_OTHER_VALUE,
            payload: "",
          });
        } else {
          dispatch({
            type: t.SET_VENUE_TYPE,
            payload: "Other",
          });

          dispatch({
            type: t.SET_VENUE_TYPE_OTHER_VALUE,
            payload: result.data.venue_type,
          });
        }

        dispatch({
          type: t.SET_IMMEDIATE_HIRING,
          payload: result.data.is_immediate.toString(),
        });

        dispatch({
          type: t.SET_EDITOR,
          payload: result.data.description,
        });

        dispatch({
          type: t.SET_RADIO,
          payload: result.data.job_licenses.length === 0 ? "no" : "yes",
        });

        dispatch({
          type: t.SET_WILL_REPORT_TO_SPECIFIC_ADDRESS,
          payload: result.data.is_report_specific_address == 0 ? "no" : "yes",
        });

        if (result.data.is_report_specific_address == 0) {
          dispatch({
            type: t.SET_WILL_NOT_REPORT_TO_CITY,
            payload: result.data.city,
          });

          dispatch({
            type: t.SET_SHOW_GOOGLE_MAP_FOR_GOOGLE,
            payload: true,
          });

          dispatch({
            type: t.SET_SELECTED_LOCATION_FROM_GOOGLE,
            payload: true,
          });
        } else if (result.data.is_report_specific_address == 1) {
          dispatch({
            type: t.SET_WILL_REPORT_TO_WORK_POST_CODE,
            payload: result.data.postal_code,
          });

          dispatch({
            type: t.SET_WILL_REPORT_TO_WORK_CITY,
            payload: result.data.city,
          });

          dispatch({
            type: t.SET_WILL_REPORT_TO_WORK_FIELDS_SHOW_HIDE,
            payload: false,
          });

          dispatch({
            type: t.SET_SHOW_GOOGLE_MAP_FOR_LOQATE,
            payload: true,
          });

          dispatch({
            type: t.SET_WILL_REPORT_TO_WORK_ADDRESS_ONE,
            payload: result.data.address,
          });

          dispatch({
            type: t.SET_WILL_REPORT_TO_WORK_ADDRESS_TWO,
            payload: result.data.address2,
          });
        }

        dispatch({
          type: t.SET_SHOW_GOOGLE_MAP_FOR_LOQATE,
          payload: true,
        });

        dispatch({
          type: t.SET_CENTER_FOR_MAP_LOQATE,
          payload: {
            lat: parseFloat(result.data.latitude),
            lng: parseFloat(result.data.longitude),
          },
        });

        dispatch({
          type: t.SET_CENTER_FOR_MAP_GOOGLE,
          payload: {
            lat: parseFloat(result.data.latitude),
            lng: parseFloat(result.data.longitude),
          },
        });

        dispatch({
          type: t.SET_SALARY_TYPE,
          payload: result.data.salary_type,
        });

        if (result.data.salary_type == "Range") {
          dispatch({
            type: t.SET_SALARY_RANGE_MIN,
            payload: result.data.salary_min,
          });
          dispatch({
            type: t.SET_SALARY_RANGE_MAX,
            payload: result.data.salary_max,
          });
        } else if (result.data.salary_type == "Fixed Rate") {
          dispatch({
            type: t.SET_SALARY_VALUE,
            payload: result.data.salary,
          });
        }

        dispatch({
          type: t.SET_SALARY_WORK_HOUR_PER_WEEK,
          payload: result.data.working_hours,
        });

        dispatch({
          type: t.SET_SALARY_VALUE_PER_UNIT,
          payload: result.data.pay_frequency,
        });

        dispatch({
          type: t.SET_SALARY_BENEFITS,
          payload: result.data.job_benefits.map((list) => {
            return list.benefit_id.toString();
          }),
        });

        dispatch({
          type: t.SET_AVAILABLE_FOR_TEAM,
          payload: result.data.is_available_for_team,
        });

        dispatch({
          type: t.SET_SETTINGS_EMAIL,
          payload: result.data.updating_email,
        });
        dispatch({
          type: t.WEBSITE_LINK,
          payload: result.data.external_link,
        });
        // dispatch({
        //   type: t.SET_JOB_DESCRIPTION_DATA,
        //   payload: {
        //     job_title: result.data.title,
        //     type_of_employment: result.data.employment_type,
        //     company_name: result.data.organisation.organisation_name,
        //     job_description: result.data.description,
        //     specific_address: "yes",
        //     google_city_town: "",
        //     loqate_city_town: result.data.city,
        //     salary_pay: result.data.salary,
        //     salary_per_unit: result.data.salary_per,
        //     license_required: result.data.job_licenses.map(
        //       (license) => license.course_id
        //     ),
        //     contract_type: result.data.contract_type,
        //     salary_benefits: result.data.job_benefits,
        //     venue_type: result.data.venue_type,
        //     shift_schedule: result.data.shift_schedule,
        //     shift_timings: result.data.shift_timings,
        //     salary_type: result.data.salary_type,
        //     salary_min: result.data.salary_min,
        //     salary_max: result.data.salary_max,
        //   },
        // });

        request_status = result;
      });
    // .catch(function (error) {
    //     toast.error("Something Went Wrong! Try Agian");
    // });
    // dispatch({
    //     type: t.SET_IS_REQUEST_LOADER,
    //     payload: false,
    //   });
    return request_status;
  };
