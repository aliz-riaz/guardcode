import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useChangeSubscriptionCard() {
  //   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (pm) => {
      const payload = { payment_method_id: pm };
      return vantageInstance.post(`billing/card/change`, payload);
    },
    onError: (error) => {
      toast.error(
        <div>
          Something went wrong while changing your card:
          <br />
          {error.message}
        </div>
      );
    },
    onSuccess: () => {
      //   queryClient.invalidateQueries({ queryKey: ["userCardList"] });
    },
  });
}
