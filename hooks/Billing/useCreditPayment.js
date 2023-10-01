import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreditPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => {
      return vantageInstance.post(`billing/v2/orders/store`, payload);
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: ["useCreditsDetail"] });
      toast.error(
        <div>
          Something went while purchasing credits:
          <br />
          {error.message}
        </div>
      );
    },
  });
}
