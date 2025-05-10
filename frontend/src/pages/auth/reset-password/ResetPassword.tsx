import { motion } from "framer-motion";
import AuthLayout from "../../../layouts/AuthLAyout";
import { Link, useNavigate } from "react-router-dom";
import { MoveLeft, Loader, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../configs/axios";
import { toast } from "sonner";
import { useState } from "react";
import FormError from "../../../components/ui/auth/FromError";

const schema = z
  .object({
    password: z
      .string().nonempty('password is required')
      .min(8, "Password must be at least 8 characters")
      .max(20, "password should be atmost 20 characters long")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "password should contain atleast 1 special character,one uppercase letter , one lowercase letter and numbers"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordSchemaType = z.infer<typeof schema>;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const {
    mutate: resetPassword,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: ResetPasswordSchemaType) => {
      const token = localStorage.getItem("reset-pass-token");
      const res = await axiosInstance.post(`/api/auth/reset-password/${token}`, {
        password: data.password,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Password reset successful");
      localStorage.removeItem("reset-password-token");
      queryClient.invalidateQueries({queryKey : ['me']})
      setTimeout(() => {
        navigate("/auth/signin");
      }, 3000);
    },
    onError: () => {
      toast.error("Failed to reset password. Try again.");
    },
  });

  const onSubmit = (data: ResetPasswordSchemaType) => {
    resetPassword(data);
  };

  return (
    <AuthLayout
      title="Create New Password"
      subtitle="Make sure it's different from previous ones"
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
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="backdrop-blur-sm bg-white/5 p-8 rounded-2xl shadow-lg space-y-4 border border-white/10"
      >
        {/* Password */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            className="input bg-base-content/5 border-none outline-none text-base-content placeholder-base-content/60 w-full focus:ring-1 focus:ring-base-content/30"
          />
          {errors.password && touchedFields.password && (
            <FormError message={errors.password.message!} />
          )}
          <button
            className="absolute top-2 right-2 cursor-pointer text-base-content/50"
            onClick={(e) => {
              e.preventDefault();
              setShowPassword((prev) => !prev);
            }}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </motion.div>

        {/* Confirm Password */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <input
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            className="input bg-base-content/5 border-none outline-none text-base-content placeholder-base-content/60 w-full focus:ring-1 focus:ring-base-content/30"
          />
          {errors.confirmPassword && touchedFields.confirmPassword && (
            <FormError message={errors.confirmPassword.message!} />
          )}
          <button
            className="absolute cursor-pointer top-2 right-2 text-base-content/50"
            onClick={(e) => {
              e.preventDefault();
              setShowConfirmPassword((prev) => !prev);
            }}
          >
            {showConfirmPassword ? <EyeOff /> : <Eye />}
          </button>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-2"
        >
          <motion.button
            disabled={isPending || isSuccess}
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(99, 102, 241, 0.9)",
            }}
            whileTap={{ scale: 0.98 }}
            className="btn bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 border-none text-white w-full mt-2"
            type="submit"
          >
            {isPending ? (
              <span className="loading loading-spinner">
                <Loader />
              </span>
            ) : isSuccess ? (
              "Password Reset!"
            ) : (
              "Reset Password"
            )}
          </motion.button>
        </motion.div>

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-white/60 mt-4"
        >
          <Link
            to="/auth/signin"
            className="hover:text-white/80 flex items-center justify-center"
          >
            <MoveLeft className="mr-2" />
            Back to Sign In
          </Link>
        </motion.div>
      </motion.form>
    </AuthLayout>
  );
};

export default ResetPassword;
