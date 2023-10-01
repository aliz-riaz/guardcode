import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";
import { useMutation } from "@tanstack/react-query";

export default function useSaveNewCard() {
  return useMutation({
    mutationFn: ({ pm, is_default }) => {
      const payload = { should_default: is_default ? "1" : "0" };
      return vantageInstance.put(
        `stripe/payment-methods/${pm}/attach`,
        payload
      );
    },
    onError: (error) => {
      toast.error(
        <div>
          {/* Something went wrong while adding new card:
          <br /> */}
          {error.response.data.message}
        </div>
      );
    },
  });
}
