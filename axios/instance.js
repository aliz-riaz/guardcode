import axios from "axios";
// import configureStore from "../redux/store/store";

const VANTAGE_API_URL = process.env.NEXT_PUBLIC_VANTAGE_API;
const GUARD_PASS_API_URL = process.env.NEXT_PUBLIC_GUARDPASS_API;

const vantageInstance = axios.create({
  baseURL: VANTAGE_API_URL,
  headers: {
    // "Content-Type": "multipart/form-data",
    "Content-Type": "application/json",
  },
});
const vantageInstanceMultipart = axios.create({
  baseURL: VANTAGE_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    // "Content-Type": "application/x-www-form-urlencoded",
  },
});

const gudardPassInstance = axios.create({
  baseURL: GUARD_PASS_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

vantageInstance.interceptors.request.use(
  (config) => {
    const localStorageValue =
      typeof window !== "undefined" &&
      window.localStorage.getItem("persist:Vantage");
    const token = JSON.parse(
      JSON.parse(localStorageValue)?.userDataReducer
    )?.user_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
vantageInstanceMultipart.interceptors.request.use(
  (config) => {
    const localStorageValue =
      typeof window !== "undefined" &&
      window.localStorage.getItem("persist:Vantage");
    const token = JSON.parse(
      JSON.parse(localStorageValue)?.userDataReducer
    )?.user_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { vantageInstance, gudardPassInstance, vantageInstanceMultipart };
