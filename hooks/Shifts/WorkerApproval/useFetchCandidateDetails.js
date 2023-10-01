import { vantageInstance } from "../../../axios/instance";
import { useQuery } from "@tanstack/react-query";

export default function useFetchCandidateDetails(id, setLoading, shift_id) {
  return useQuery({
    queryKey: ["useFetchCandidateDetails"],
    queryFn: () =>
      vantageInstance
        .get(`shift/worker-approval/${shift_id}/candidate/${id}`)
        .then((res) => res.data)
        .finally(() => setLoading(false)),
    meta: {
      errorMessage: "Failed to get your status response.",
    },
  });
}
