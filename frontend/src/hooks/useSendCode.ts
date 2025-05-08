import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../configs/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { SignnInSchemaPhoneType } from "../validations/signin/signInSchemaPhone";
import { AxiosError } from "axios";

export const useSendCode = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async (data : SignnInSchemaPhoneType) => {
            localStorage.setItem('user-otp-phone' , data.phone)
            const res = await axiosInstance.post("/api/auth/signin", data);
            console.log(res);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Code sent successfully");
            setTimeout(() => {
                toast.info('code will expire after 60 seconds');
            }, 3000);
            navigate("/auth/verify-code");
        },
        onError: (e : AxiosError<{ message: string }>) => {
            console.log(e);
            toast.error(e.response?.data.message || "Failed to send code");
        },
    });
};