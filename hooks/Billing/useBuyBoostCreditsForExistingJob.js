import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useBuyBoostCreditsForExistingJob() {
  //   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (jobId) => {
      return vantageInstance
        .post(`/billing/job/${jobId}/boost/intent`)
        .then((res) => res.data.data);
    },
    onError: (error) => {
      toast.error(
        <div>
          Something went wrong paying for boost
          <br />
          {error.message}
        </div>
      );
    },
    onSuccess: () => {
      //   queryClient.invalidateQueries({ queryKey: ["userCardList"] });
      //   toast.success("Email sent successfully.");
    },
  });
}
