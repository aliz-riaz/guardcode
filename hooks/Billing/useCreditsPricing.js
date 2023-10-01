import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";
import { useQuery } from "@tanstack/react-query";

export default function useCreditsPricing() {
  return useQuery({
    queryKey: ["useCreditsPricing"],
    queryFn: () =>
      vantageInstance
        .get(`/billing/v2/credits/rate`)
        .then((res) => res.data.data),
    meta: {
      errorMessage: "Failed to fetch credits price.",
    },
  });
}
