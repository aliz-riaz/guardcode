import { toast } from "react-toastify";
import { vantageInstance } from "../../../axios/instance";
import { useMutation } from "@tanstack/react-query";

export default function useSiteDelete() {
  return useMutation({
    mutationFn: (id) => {
      return vantageInstance.delete(`shift/site/${id}`, {});
    },
    onError: (error) => {
      toast.error(
        <div>
          Something went wrong while deleting site:
          <br />
          {error.message}
        </div>
      );
    },
  });
}
