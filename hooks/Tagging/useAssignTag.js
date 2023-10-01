import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";
import { useMutation } from "@tanstack/react-query";

export default function useAssignTag() {
  return useMutation({
    mutationFn: ({ tagID, notes, jobseekerID }) => {
      const payload = {
        tag_id: tagID,
        notes: notes,
        jobseeker_id: jobseekerID,
      };
      return vantageInstance.post(`employer/company_tag/assign/tag`, payload);
    },
    onError: (error) => {
      toast.error(
        <div>
          Something went wrong while assigning tag:
          <br />
          {error.message}
        </div>
      );
    },
    // onSuccess: () => {
    //   toast.success("Tag assigned successfully.");
    // },
  });
}
