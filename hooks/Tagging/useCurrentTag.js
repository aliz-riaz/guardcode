import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";
import { useQuery } from "@tanstack/react-query";

export default function useCurrentTag() {
  return useQuery({
    queryKey: ["currentTag"],
    queryFn: () =>
      vantageInstance.get(`employer/company_tag`).then((res) => res.data.data),
    meta: {
      errorMessage: "Failed to fetch current tag.",
    },
  });
}
