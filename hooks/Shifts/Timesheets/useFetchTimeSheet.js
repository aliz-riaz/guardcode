import { toast } from "react-toastify";
import { vantageInstance } from "../../../axios/instance";
import { useQuery } from "@tanstack/react-query";

export default function useFetchTimesheet({ site_id, currentPage }) {
  return useQuery({
    queryKey: ["useFetchTimesheet", [site_id, currentPage]],
    queryFn: () =>
      vantageInstance
        .get(`/shift/timesheet/${site_id}/workers`)
        .then((res) => res.data.data),
    meta: {
      errorMessage: "Failed to fetch shift list.",
    },
  });
}
