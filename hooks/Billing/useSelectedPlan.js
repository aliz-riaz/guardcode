import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";
import { useQuery } from "@tanstack/react-query";

export default function useSelectedPlan(planId, interval) {
  return useQuery({
    queryKey: ["selectedPackages", planId, interval],
    queryFn: () =>
      vantageInstance
        .get(`/billing/all/plans/${planId}?interval=${interval}`)
        .then((res) => res.data.data),
    meta: {
      errorMessage: "Failed to fetch selected package details.",
    },
  });
}
