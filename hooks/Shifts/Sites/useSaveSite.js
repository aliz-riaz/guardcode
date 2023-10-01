import { toast } from "react-toastify";
import { vantageInstanceMultipart } from "../../../axios/instance";
import { useMutation } from "@tanstack/react-query";

export default function useSendInvoice() {
  return useMutation({
    mutationFn: (obj) => {
      // const payload = {obj};
      return vantageInstanceMultipart.post("/shift/site", obj);
    },
    onError: (error) => {
      toast.error(
        <div>
          Something went wrong while saving site:
          <br />
          {error.message}
        </div>
      );
    },
    // onSuccess: () => {
    //   toast.success("Role saved successfully.");
    // },
  });
}
