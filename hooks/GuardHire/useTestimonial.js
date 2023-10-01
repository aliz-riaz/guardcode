import { gudardPassInstance } from "../../axios/instance";
import { useQuery } from "@tanstack/react-query";

export default function useTestimonial() {
  return useQuery({
    queryKey: ["landingTestimonial"],
    queryFn: () =>
      gudardPassInstance
        .get(`/public/testimonials`)
        .then((res) => res.data.data),
    meta: {
      errorMessage: "Failed to fetch landing testimonial.",
    },
  });
}
