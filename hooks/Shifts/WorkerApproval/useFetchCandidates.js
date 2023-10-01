import { vantageInstance } from "../../../axios/instance";
import { useQuery } from "@tanstack/react-query";

export default function useFetchCandidates(shiftId, type) {
  return useQuery({
    queryKey: ["useFetchCandidates", type],
    queryFn: () =>
      vantageInstance
        .get(`/shift/worker-approval/${shiftId}/candidates?type=${type}`)
        .then((res) => res.data),
    meta: {
      errorMessage: "Failed to get your status response.",
    },
  });
}
