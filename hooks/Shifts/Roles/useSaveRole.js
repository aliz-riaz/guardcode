import { toast } from "react-toastify";
import { vantageInstanceMultipart } from "../../../axios/instance";
import { useMutation } from "@tanstack/react-query";

export default function useSendInvoice() {
  return useMutation({
    mutationFn: ({
      name,
      reference,
      jobDescription,
      license,
      uniform,
      uniformDescription,
      uniformImage,
      sitesList,
    }) => {
      const payload = {
        title: name,
        reference_no: reference,
        job_description: jobDescription,
        uniform: uniform,
        uniform_description: uniformDescription,
        uniform_picture: uniformImage,
        license: license,
        sites: sitesList,
      };
      return vantageInstanceMultipart.post("/shift/role", payload);
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
    // onSuccess: () => {
    //   toast.success("Role saved successfully.");
    // },
  });
}
