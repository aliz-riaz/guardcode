import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";
import { useQuery } from "@tanstack/react-query";

export default function useCurrentBillingHistory({ currentPage, search }) {
  return useQuery({
    queryKey: ["currentBillingHistory", [currentPage, search]],
    queryFn: () =>
      vantageInstance
        .get(`billing/v2/payment_receipts?page=${currentPage}&q=${search}`)
        .then((res) => res.data.data),
    meta: {
      errorMessage: "Failed to fetch current billing history.",
    },
  });
}
