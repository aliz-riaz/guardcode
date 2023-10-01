import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";
import { useMutation } from "@tanstack/react-query";

export default function useDownloadInvoice() {
  return useMutation({
    mutationFn: async ({ id, fileName }) => {
      const payload = { receipt_id: id };
      const response = await vantageInstance.post(
        "billing/v2/download/receipt",
        payload,
        { responseType: "blob" } // Set response type as blob
      );

      // Create a blob URL
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoince " + fileName + ".pdf"); // Or any other extension based on the file type
      document.body.appendChild(link);
      link.click();
    },
    onError: (error) => {
      toast.error(
        <div>
          Something went wrong while downloading invoice:
          <br />
          {error.message}
        </div>
      );
    },
    // onSuccess: () => {
    //   toast.success("Invoice download successfully.");
    // },
  });
}
