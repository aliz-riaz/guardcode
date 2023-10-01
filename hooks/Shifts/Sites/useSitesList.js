import { toast } from "react-toastify";
import { vantageInstance } from "../../../axios/instance";
import { useQuery } from "@tanstack/react-query";

export default function useSitesList() {
  return useQuery({
    queryKey: ["shifSitesList"],
    queryFn: () =>
      vantageInstance.get(`/shift/site`).then((res) => res.data.data),
    meta: {
      errorMessage: "Failed to fetch sites list.",
    },
    enabled: false,
  });
}
