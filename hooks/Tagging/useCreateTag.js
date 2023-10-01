import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";
import { useMutation } from "@tanstack/react-query";

export default function useCreateTag() {
  return useMutation({
    mutationFn: ({ name, color }) => {
      const payload = { name: name, color: color };
      return vantageInstance.post("employer/company_tag", payload);
    },
    onError: (error) => {
      toast.error(
        <div>
          Something went wrong while creating tag:
          <br />
          {error.message}
        </div>
      );
    },
    // onSuccess: () => {
    //   toast.success("Tag created successfully.");
    // },
  });
}
