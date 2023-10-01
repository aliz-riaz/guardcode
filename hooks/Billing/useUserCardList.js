import { toast } from "react-toastify";
import { vantageInstance } from "../../axios/instance";
import { useQuery } from "@tanstack/react-query";

export default function useUserCardList() {
  return useQuery({
    queryKey: ["userCardList"],
    queryFn: () =>
      vantageInstance
        .get(`stripe/payment-methods`)
        .then((res) =>
          res.data.data.data?.sort(
            (a, b) => Number(b.is_default) - Number(a.is_default)
          )
        ),
    meta: {
      errorMessage: "Failed to fetch user cards list.",
    },
  });
}
