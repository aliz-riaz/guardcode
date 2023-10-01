import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => {
      return vantageInstance.post(`billing/plan/subscribe`, payload);
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: ["currentActivePlan"] });
      queryClient.refetchQueries("userCardList");
      toast.error(
        <div>
          Something went while subscribing:
          <br />
          {error.message}
        </div>
      );
    },
  });
}
