import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useMarkStripeCardAsDefault() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (pm) => {
      return vantageInstance.put(`stripe/payment-methods/${pm}/default`);
    },
    onError: (error) => {
      toast.error(
        <div>
          Something went wrong making your card default:
          <br />
          {error.message}
        </div>
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userCardList"] });
      //   toast.success("Email sent successfully.");
    },
  });
}
