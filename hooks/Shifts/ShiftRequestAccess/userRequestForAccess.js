import { toast } from "react-toastify";
import { vantageInstance } from "../../../axios/instance";
import { useMutation } from "@tanstack/react-query";

export default function userAccessRequest(setPendingStatus) {
  return useMutation({
    queryKey: ["userAccessRequest"],
    mutationFn: () => vantageInstance.post("shift/request-access"),
    onSuccess: () => setPendingStatus("Pending"),
    onError: () => toast.error("Request Failed"),
  });
}
