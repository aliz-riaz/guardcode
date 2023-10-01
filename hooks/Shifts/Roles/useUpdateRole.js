import { toast } from "react-toastify";
import { vantageInstanceMultipart } from "../../../axios/instance";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateRole() {
  return useMutation({
    mutationFn: ({ obj, id }) => {
      return vantageInstanceMultipart.post(`shift/role/${id}`, obj);
    },
    onError: (error) => {
      toast.error(
        <div>
          Something went wrong while saving role:
          <br />
          {error.message}
        </div>
      );
    },
  });
}
