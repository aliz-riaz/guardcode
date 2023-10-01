import * as t from "../types";

const defaultState = {
  licenseType: [],
  location: "",
  latitude: null,
  longitude: null,
  selectedLocationFromGoogle: false,
  distance: 9,
  videoOnlyCheck: false,
  showCVSearchProfile: false,
  swpProfileId: null,
  isSWPProfileLoading: false,
  cvSearchViewsTotal: 0,
  cvSearchViews: 0,
};

const cvSearchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case t.SET_LICENSE_TYPE:
      return {
        ...state,
        licenseType: action.payload,
      };

    case t.SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };

    case t.SET_DISTANCE:
      return {
        ...state,
        distance: action.payload,
      };

    case t.SET_VIDEO_ONLY_CHECK:
      return {
        ...state,
        videoOnlyCheck: action.payload,
      };
    case t.SET_SHOW_CV_SEARCH_PROFILE:
      return {
        ...state,
        showCVSearchProfile: action.payload,
      };
    case t.SET_SWP_PROFILE_ID:
      return {
        ...state,
        swpProfileId: action.payload,
      };
    case t.SET_LATITUDE_FOR_CV_SEARCH:
      return {
        ...state,
        latitude: action.payload,
      };
    case t.SET_LONGITUDE_FOR_CV_SEARCH:
      return {
        ...state,
        longitude: action.payload,
      };
    case t.SET_SELECTED_LOCATION_FROM_GOOGLE_CV_SEARCH:
      return {
        ...state,
        selectedLocationFromGoogle: action.payload,
      };
    case t.SET_CV_SEARCH_VIEWS:
      return {
        ...state,
        cvSearchViews: action.payload,
      };
    case t.SET_IS_SWP_PROFILE_LOADING:
      return {
        ...state,
        isSWPProfileLoading: action.payload,
      };
    case t.SET_CV_SEARCH_VIEWS_TOTAL:
      return {
        ...state,
        cvSearchViewsTotal: action.payload,
      };

    case t.RESET_CV_SEARCH_REDUCER:
      return {
        ...state,
        licenseType: [],
        location: "",
        latitude: null,
        longitude: null,
        selectedLocationFromGoogle: false,
        distance: 9,
        videoOnlyCheck: false,
        showCVSearchProfile: false,
        swpProfileId: null,
        isSWPProfileLoading: false,
        cvSearchViewsTotal: 0,
        cvSearchViews: 0,
      };
    default:
      return state;
  }
};

export default cvSearchReducer;
