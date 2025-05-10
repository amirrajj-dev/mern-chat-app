import { motion } from "framer-motion";
import AuthLayout from "../../../layouts/AuthLAyout";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchemaType, schema } from "../../../validations/signupSchema";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import FormError from "../../../components/ui/auth/FromError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../configs/axios";
import { toast } from "sonner";
import {useNavigate} from 'react-router-dom'
import { AxiosError } from "axios";

const SignUp = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient()
  const {mutate : signup , isPending , isSuccess} = useMutation({
    mutationFn : async (data : SignUpSchemaType)=>{
      const res = await axiosInstance.post('/api/auth/signup' , data)
      return res.data
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['me'], data.user); // Cache user data
      // invalidate sidebar conversations
      queryClient.invalidateQueries({queryKey : ['conversations']});
      toast.success('Signed up successfully');
      navigate('/');
    },
    onError: (err: AxiosError<{ message: string }>) => {
      toast.error(err.response?.data.message || 'Signup failed');
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields},
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    signup(data)
  };

   useEffect(()=>{
      document.title = 'SignUp'
    } , [])

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Join us today - it takes less than a minute"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center lg:hidden mb-6"
      >
        <img
          src="/logo.png"
          alt="Chat App Logo"
          className="size-20 mb-4"
        />
      </motion.div>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        onSubmit={handleSubmit(onSubmit)}
        className="backdrop-blur-sm bg-white/5 p-8 rounded-2xl shadow-lg space-y-4 border border-white/10"
      >
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <input
              {...register("name")}
              type="text"
              placeholder="Full Name"
              className={`input bg-base-content/5 border ${
                errors.name ? "border-rose-500" : "border-transparent"
              } outline-none text-base-content placeholder-base-content/60 w-full focus:ring-1 focus:ring-base-content/30`}
            />
            {errors.name && touchedFields.name && (
              <FormError message={errors.name.message!} />
            )}
          </motion.div>
          <motion.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <input
              {...register("username")}
              type="text"
              placeholder="Username"
              className="input bg-base-content/5 border-none outline-none text-base-content placeholder-base-content/60 w-full focus:border-none focus:outline-none focus:ring-1 focus:ring-base-content/30 focus:border-base-content/20"
            />
            {errors.username && touchedFields.username && (
              <FormError message={errors.username.message!} />
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="input bg-base-content/5 border-none outline-none text-base-content placeholder-base-content/60 w-full focus:border-none focus:outline-none focus:ring-1 focus:ring-base-content/30 focus:border-base-content/20"
          />
          {errors.email && touchedFields.email && (
            <FormError message={errors.email.message!} />
          )}
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative"
        >
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input bg-base-content/5 border-none outline-none text-base-content placeholder-base-content/60 w-full focus:border-none focus:outline-none focus:ring-1 focus:ring-base-content/30 focus:border-base-content/20"
          />
          {errors.password && touchedFields.password && (
            <FormError message={errors.password.message!} />
          )}
          <button
            className="absolute z-50 cursor-pointer top-2 right-2 text-base-content/50"
            onClick={(e) => {
              e.preventDefault();
              setShowPassword((prev) => !prev);
            }}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <input
              {...register("phone")}
              type="tel"
              placeholder="Phone"
              className="input bg-base-content/5 border-none outline-none text-base-content placeholder-base-content/60 w-full focus:border-none focus:outline-none focus:ring-1 focus:ring-base-content/30 focus:border-base-content/20"
            />
            {errors.phone && touchedFields.phone && (
              <FormError message={errors.phone.message!} />
            )}
          </motion.div>
          <motion.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <select
            defaultValue={''}
              {...register("gender")}
              className="bg-base-content/5 select border-none outline-none focus:border-none focus:outline-none border-base-content/10 text-base-content placeholder-base-content/60 w-full focus:ring-1 focus:ring-base-content/30 focus:border-base-content/20"
            >
              <option
                value={''}
                disabled
                className="bg-base-300/80 blur-lg text-base-content"
              >
                Gender
              </option>
              <option
                value={"male"}
                className="bg-base-300/80 blur-lg text-base-content"
              >
                Male
              </option>
              <option
                value={"female"}
                className="bg-base-300/80 blur-lg text-base-content"
              >
                Female
              </option>
            </select>
            {errors.gender && touchedFields.gender && (
              <FormError message={errors.gender.message!} />
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="pt-2"
        >
          <motion.button
            disabled={isPending || isSuccess}
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(99, 102, 241, 0.9)",
            }}
            whileTap={{ scale: 0.98 }}
            className="btn bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed border-none text-white w-full mt-2"
            type="submit"
          >
            {isPending ? (
              <span className="loading loading-spinner">
                <Loader/>
              </span>
            ) : isSuccess ?  (
              'Signed Up !'
            ) : "Sign Up"}
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="divider text-white/50 before:bg-white/10 after:bg-white/10 text-sm"
        >
          Already have an account?
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <Link
            to="/auth/signin"
            className="btn btn-outline border-white/20 hover:bg-white/5 hover:border-white/30 text-white w-full"
          >
            Login Instead
          </Link>
        </motion.div>
      </motion.form>
    </AuthLayout>
  );
};

export default SignUp;
