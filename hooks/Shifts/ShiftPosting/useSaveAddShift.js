import { toast } from "react-toastify";
import { vantageInstanceMultipart } from "../../../axios/instance";
import { useMutation } from "@tanstack/react-query";

export default function useSaveAddShift() {
  return useMutation({
    mutationFn: (obj) => {
      return vantageInstanceMultipart.post("/shift/save", obj);
    },
    onError: (error) => {
      toast.error(
        <div>
          Something went wrong while posting shift:
          <br />
          {error.message}
        </div>
      );
    },
  });
}
