import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";

import { useMutation } from "@tanstack/react-query";

export default function useCreateAbunduntOrder() {
  return useMutation({
    mutationFn: (payload) => {
      return vantageInstance.post(`billing/v2/orders/store/abandoned`, payload);
    },
    // onError: (error) => {
    //   toast.error(
    //     <div>
    //       Something went while purchasing credits:
    //       <br />
    //       {error.message}
    //     </div>
    //   );
    // },
  });
}
