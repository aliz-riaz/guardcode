import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";
import { useQuery } from "@tanstack/react-query";

export default function useShiftListCalendarView({
  site_id,
  role_id,
  view,
  shift_type,
  shift_timing,
  site_title,
  role_title,
  search,
  list_type,
}) {
  return useQuery({
    queryKey: [
      "useShiftListCalendarView",
      [site_id, role_id, shift_type, shift_timing, search, list_type],
    ],
    queryFn: () =>
      vantageInstance
        .get(
          `/shift/list?site_id=${site_id}&role_id=${role_id}&shift_type=${shift_type}&shift_timing=${shift_timing}&search=${search}&list_type=${list_type}&page=1`
        )
        .then((res) => res.data.data),
    meta: {
      errorMessage: "Failed to fetch shift list.",
    },
  });
}
