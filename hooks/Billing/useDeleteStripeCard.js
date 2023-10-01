import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteStripeCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (pm) => {
      return vantageInstance.delete(`/stripe/payment-methods/${pm}`);
    },
    onError: (error) => {
      toast.error(
        <div>
          Something went wrong while deleting card:
          <br />
          {error.message}
        </div>
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userCardList"] });
    },
  });
}
