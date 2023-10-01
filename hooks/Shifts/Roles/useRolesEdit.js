import { toast } from "react-toastify";
import { vantageInstance } from "../../../axios/instance";
import { useQuery } from "@tanstack/react-query";

export default function useRolesEdit(id) {
  return useQuery({
    queryKey: ["shiftRoleEdit", id],
    queryFn: () =>
      vantageInstance.get(`/shift/role/${id}`).then((res) => res.data.data),
    meta: {
      errorMessage: "Failed to fetch edit role.",
    },
    enabled: false,
  });
}
