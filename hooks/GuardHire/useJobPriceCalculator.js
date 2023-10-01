import { gudardPassInstance } from "../../axios/instance";
import { useQuery } from "@tanstack/react-query";

export default function useJobPriceCalculator() {
  return useQuery({
    queryKey: ["landingJobPriceCalculator"],
    queryFn: () =>
      gudardPassInstance
        .get(`/public/credits/rate`)
        .then((res) => res.data.data),
    meta: {
      errorMessage: "Failed to fetch landing JobPriceCalculator.",
    },
  });
}
