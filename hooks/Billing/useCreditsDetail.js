import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";
import { useQuery } from "@tanstack/react-query";

export default function useCreditsDetail() {
  return useQuery({
    queryKey: ["useCreditsDetail"],
    queryFn: () =>
      vantageInstance.get(`/billing/v2/credits`).then((res) => res.data.data),
    meta: {
      errorMessage: "Failed to fetch credit details.",
    },
  });
}
