import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";
import { useMutation } from "@tanstack/react-query";

export default function useRemoveTag() {
  return useMutation({
    mutationFn: ({ jobseekerId }) => {
      const payload = { jobseeker_id: jobseekerId };
      return vantageInstance.post("employer/company_tag/remove/tag", payload);
    },
    onError: (error) => {
      toast.error(
        <div>
          Something went wrong while removing tag:
          <br />
          {error.message}
        </div>
      );
    },
    // onSuccess: () => {
    //   toast.success("Tag removed successfully.");
    // },
  });
}
