import * as t from "../types";
import { toast } from "react-toastify";

export const getEventDetailsAction = (event_id) => async (dispatch) => {
  let request_status = false;
  let request_data = "";
  // dispatch({
  //   type: t.SET_IS_REQUEST_LOADER,
  //   payload: true
  // })
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer '+token,
      },
      // body: JSON.stringify({ email: email_perameter , password: password_perameter }),
    };
    const courses = await fetch(
      process.env.API_TRAINING_HUB_URL + "events/" + event_id + "?plans=true",
      requestOptions
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        if (result.error) {
          toast.error(result.error);
        } else {
          // toast.success(result.message);
          dispatch({
            type: t.SET_SELECTED_LOCATION_OBJECT,
            payload: result.data,
          });
          request_status = true;
          request_data = result.data;
        }
      })
      .catch(function (error) {
        toast.error(error);
      });
  } catch (error) {}
  // dispatch({
  //   type: t.SET_IS_REQUEST_LOADER,
  //   payload: false
  // })
  if (request_status) return request_data;
  else return false;
};
