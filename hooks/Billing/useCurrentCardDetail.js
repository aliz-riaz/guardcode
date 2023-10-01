import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";
import { useQuery } from "@tanstack/react-query";

export default function useCurrentCardDetail() {
  return useQuery({
    queryKey: ["currentCardDetail"],
    queryFn: () =>
      vantageInstance.get(`/billing/card/details`).then((res) => res.data.data),
    meta: {
      errorMessage: "Failed to fetch default current card detail.",
    },
  });
}
