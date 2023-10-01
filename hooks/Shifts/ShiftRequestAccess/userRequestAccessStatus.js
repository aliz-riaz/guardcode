import { vantageInstance } from "../../../axios/instance";
import { useQuery } from "@tanstack/react-query";

export default function userRequestStatus() {
  return useQuery({
    queryKey: ["userRequestStatus"],
    queryFn: () =>
      vantageInstance
        .get("employer/additional_features")
        .then((res) => res.data.data),
    meta: {
      errorMessage: "Failed to get your status response.",
    },
  });
}
