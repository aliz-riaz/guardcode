import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useBuyBoostCreditsForJobPosting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      return vantageInstance
        .post(`/stripe/payment-intent`, data)
        .then((res) => res.data.data);
    },
    onError: (error) => {
      toast.error(
        <div>
          Something went wrong paying for boost in job posting
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
