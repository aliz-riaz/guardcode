import { toast } from "react-toastify";
import { vantageInstanceMultipart } from "../../../axios/instance";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateSite() {
  return useMutation({
    mutationFn: ({ obj, id }) => {
      return vantageInstanceMultipart.post(`shift/site/${id}`, obj);
    },
    onError: (error) => {
      toast.error(
        <div>
          Something went wrong while updating site:
          <br />
          {error.message}
        </div>
      );
    },
  });
}
