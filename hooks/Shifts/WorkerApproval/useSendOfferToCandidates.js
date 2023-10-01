import { toast } from "react-toastify";
import { vantageInstance } from "../../../axios/instance";
import { useMutation } from "@tanstack/react-query";

export default function useSendOfferToCandidates() {
  return useMutation({
    mutationFn: ({ shiftId, workers }) => {
      return vantageInstance
        .post(`/shift/worker-approval/${shiftId}/candidates/offer`, {
          workers,
        })
        .then((res) => res.data.data);
    },
    onError: (error) => {
      toast.error(
        <div>
          Something went wrong while send offer
          <br />
          {error.message}
        </div>
      );
    },
    onSuccess: (data, variables) => {
      toast.success("Offer send successfully");
    },
  });
}
