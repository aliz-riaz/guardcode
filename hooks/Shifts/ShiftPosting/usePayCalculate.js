import { toast } from "react-toastify";
import { vantageInstanceMultipart } from "../../../axios/instance";
import { useMutation } from "@tanstack/react-query";

export default function usePayCalculate() {
  return useMutation({
    mutationFn: (obj) => {
      return vantageInstanceMultipart
        .post("/shift/pay/calculation", obj)
        .then((res) => res.data.data);
    },
    onError: (error) => {
      toast.error(
        <div>
          Something went wrong while calculating pay:
          <br />
          {error.message}
        </div>
      );
    },
  });
}
