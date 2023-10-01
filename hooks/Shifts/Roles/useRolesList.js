import { toast } from "react-toastify";
import { vantageInstance } from "../../../axios/instance";
import { useQuery } from "@tanstack/react-query";

export default function useRolesList() {
  return useQuery({
    queryKey: ["shiftRoleList"],
    queryFn: () =>
      vantageInstance.get(`/shift/role`).then((res) => res.data.data),
    meta: {
      errorMessage: "Failed to fetch role list.",
    },
    enabled: false,
  });
}
