import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";
import { useMutation } from "@tanstack/react-query";

export default function Logout() {
  return useMutation({
    mutationFn: () => {
      return vantageInstance.post(`/auth/logout`).then((res) => res.data.data);
    },
    onError: (error) => {
      toast.error(
        <div>
          Something went wrong while loging out
          <br />
          {error.message}
        </div>
      );
    },
  });
}
