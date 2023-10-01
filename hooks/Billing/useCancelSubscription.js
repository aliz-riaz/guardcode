import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCancelSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return vantageInstance.post("/billing/cancel/subscription");
    },
    onError: (error) => {
      toast.error(
        <div>
          Something went wrong canceling your subscription:
          <br />
          {error.message}
        </div>
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentActivePlan"] });
    },
  });
}
