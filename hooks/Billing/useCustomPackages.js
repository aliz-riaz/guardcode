import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";
import { useQuery } from "@tanstack/react-query";

export default function useCustomPackages(interval) {
  return useQuery({
    queryKey: ["customPackages", interval],
    queryFn: () =>
      vantageInstance
        .get(`/billing/all/plans?interval=${interval}`)
        .then((res) => res.data.data),
    meta: {
      errorMessage: "Failed to fetch custom packages.",
    },
  });
}
