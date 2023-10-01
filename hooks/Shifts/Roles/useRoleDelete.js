import { toast } from "react-toastify";
import { vantageInstance } from "../../../axios/instance";
import { useMutation } from "@tanstack/react-query";

export default function useRoleDelete() {
  return useMutation({
    mutationFn: (id) => {
      return vantageInstance.delete(`shift/role/${id}`, {});
    },
    onError: (error) => {
      toast.error(
        <div>
          Something went wrong while deleting role:
          <br />
          {error.message}
        </div>
      );
    },
  });
}
