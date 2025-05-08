import { motion } from "framer-motion";
import { SignInSchemaEmailType, schema } from "../../../../validations/signin/signInSchemaEmail";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { axiosInstance } from "../../../../configs/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import FormError from "../FromError";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EmailSignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<SignInSchemaEmailType>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: signin,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: SignInSchemaEmailType) => {
      const res = await axiosInstance.post("/api/auth/signin", data);
      return res.data;
    },
    onSuccess: (data: any) => {
      console.log(data);
      queryClient.setQueryData(["me"], data.user);
      toast.success("Signed in successfully");
      navigate("/");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data.message || "Signin failed");
    },
  });

  const onSubmit = async (data: SignInSchemaEmailType) => {
    await signin(data);
  };

  return (
    <motion.form onSubmit={handleSubmit(onSubmit)} layout className="space-y-4">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <input
          type="email"
          {...register("email")}
          placeholder="Email Address"
          className="input bg-white/5 border-white/10 text-white placeholder-white/50 w-full focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/30 transition-all"
        />
        {errors.email && touchedFields.email && (
          <FormError message={errors.email.message as string} />
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="input bg-white/5 border-white/10 text-white placeholder-white/50 w-full focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/30 transition-all"
        />
        {errors.password && touchedFields.password && (
          <FormError message={errors.password.message as string} />
        )}
      </motion.div>

      <motion.div layout className="pt-1">
        <motion.button
          whileHover={{
            scale: 1.02,
            backgroundColor: "rgba(99, 102, 241, 0.9)",
            boxShadow: "0 4px 14px rgba(99, 102, 241, 0.3)",
          }}
          whileTap={{ scale: 0.98 }}
          className="btn bg-indigo-600 hover:bg-indigo-700 border-none text-white w-full mt-2 shadow-md"
          type="submit"
          disabled={isPending || isSuccess}
        >
          {isPending ? (
            <span className="loading loading-spinner">
              <Loader />
            </span>
          ) : isSuccess ? (
            "SignedIn !"
          ) : (
            "SignIn"
          )}
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <Link
          to="/auth/forgot-password"
          className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Forgot password?
        </Link>
      </motion.div>
    </motion.form>
  );
};

export default EmailSignIn;