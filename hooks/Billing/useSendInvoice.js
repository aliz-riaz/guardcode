import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";
import { useMutation } from "@tanstack/react-query";

export default function useSendInvoice() {
  return useMutation({
    mutationFn: ({ id, emails }) => {
      const payload = { receipt_id: id, emails: emails };
      return vantageInstance.post("billing/v2/email/receipt", payload);
    },
    onError: (error) => {
      toast.error(
        <div>
          Something went wrong while sending email:
          <br />
          {error.message}
        </div>
      );
    },
    onSuccess: () => {
      toast.success("Invoice sent successfully.");
    },
  });
}
