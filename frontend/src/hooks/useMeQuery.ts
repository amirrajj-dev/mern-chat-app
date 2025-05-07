import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../configs/axios";
import { UserI } from "../interfaces/interfaces";

export const useMeQuery = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/auth/me");
      return res.data.user as UserI;
    },
    select: (data) => {
      const { updatedAt, ...rest } = data;
      return rest;
    },
    retry: false,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};