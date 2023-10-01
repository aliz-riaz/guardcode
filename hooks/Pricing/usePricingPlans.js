import { toast } from "react-toastify";
import { gudardPassInstance } from "../../axios/instance";
import { useQuery } from "@tanstack/react-query";

export default function usePricingPlans(interval) {
  return useQuery({
    queryKey: ["landingPackages", interval],
    queryFn: () =>
      gudardPassInstance
        .get(`/public/billing/plans?interval=${interval}`)
        .then((res) => res.data.data),
    meta: {
      errorMessage: "Failed to fetch custom packages.",
    },
  });
}
