import { motion } from "framer-motion";
import AuthLayout from "../../../layouts/AuthLAyout";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../configs/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import FormError from "../../../components/ui/auth/FromError";
import { useState } from "react";

// Validation Schema
const schema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email Format"),
});

type ForgotPasswordSchemaType = z.infer<typeof schema>;

const ForgotPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ForgotPasswordSchemaType) => {
      const res = await axiosInstance.post("/api/auth/forgot-password", data);
      console.log(res);
      localStorage.setItem('reset-pass-token' , res.data.token)
      return res.data;
    },
    onSuccess: () => {
      toast.success("Reset link sent to your email");
      setIsSuccess(true);
    },
    onError: (err: AxiosError<{ message: string }>) => {
      if (err.response?.data.message === "connect ECONNREFUSED 108.177.119.108:465"){
        toast.error("Turn Off Your Vpn And Try Again");
      }else{
        toast.error(err.response?.data.message || "Something went wrong");
      }
    },
  });

  const onSubmit = (data: ForgotPasswordSchemaType) => {
    mutate(data);
  };

  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Enter your email to receive a reset link"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center lg:hidden mb-6"
      >
        <img src="/logo.png" alt="Chat App Logo" className="size-20 mb-4" />
      </motion.div>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        onSubmit={handleSubmit(onSubmit)}
        className="backdrop-blur-sm bg-white/5 p-8 rounded-2xl shadow-lg space-y-6 border border-white/10"
      >
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <input
            {...register("email")}
            type="email"
            placeholder="Your registered email"
            className={`input bg-base-content/5 outline-none w-full text-base-content placeholder-base-content/60 focus:ring-1 focus:ring-base-content/30 focus:border-base-content/20 ${
              errors.email ? "border-rose-500" : "border-none"
            }`}
          />
          {errors.email && touchedFields.email && (
            <FormError message={errors.email.message as string} />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="pt-2"
        >
          <motion.button
            type="submit"
            disabled={isPending || isSuccess}
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(99, 102, 241, 0.9)",
            }}
            whileTap={{ scale: 0.98 }}
            className="btn bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed border-none text-white w-full mt-2"
          >
            {isPending ? (
              <span className="loading loading-spinner">
                <Loader />
              </span>
            ) : isSuccess ? (
              "Link Sent!"
            ) : (
              "Send Reset Link"
            )}
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="divider text-white/50 before:bg-white/10 after:bg-white/10 text-sm"
        >
          Remember your password?
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to="/auth/signin"
            className="btn btn-outline border-white/20 hover:bg-white/5 hover:border-white/30 text-white w-full"
          >
            Sign In Instead
          </Link>
        </motion.div>
      </motion.form>
    </AuthLayout>
  );
};

export default ForgotPassword;