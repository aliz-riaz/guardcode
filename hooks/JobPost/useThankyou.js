import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";
import { useMutation } from "@tanstack/react-query";

export default function useThankyou() {
  return useMutation({
    mutationFn: (job_id) => {
      const payload = {
        keyword: "",
        date_order: "DESC",
        application_status: "all",
      };
      return vantageInstance.post(`/job/${job_id}/applications`, payload);
    },
    onError: (error) => {
      toast.error(
        <div>
          Something went wrong while matching applicant:
          <br />
          {error.message}
        </div>
      );
    },
    onSuccess: () => {
      //toast.success("Matching applicant fetch successfully.");
    },
  });
}
