import { toast } from "react-toastify";
import { vantageInstanceMultipart } from "../../axios/instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useOpenCloseShifts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (shift_system_id) => {
      return vantageInstanceMultipart.post(`/shift/${shift_system_id}/closing`);
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useShiftsListView"] });
    },
  });
}
