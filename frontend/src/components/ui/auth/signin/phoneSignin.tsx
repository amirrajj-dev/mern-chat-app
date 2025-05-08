import { motion } from "framer-motion";
import {SignnInSchemaPhoneType , schema} from '../../../../validations/signin/signInSchemaPhone';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from '../FromError'
import { useSendCode } from "../../../../hooks/useSendCode";
import { Loader } from "lucide-react";

const PhoneSignIn = () => {
  const {handleSubmit , register , formState : {errors , touchedFields}} = useForm<SignnInSchemaPhoneType>({
    resolver : zodResolver(schema),
    mode: "onBlur"
  })
  const {mutate : sendCode , isPending , isSuccess} = useSendCode()
  const onSumbit = async (data : SignnInSchemaPhoneType) => {
    await sendCode(data);
  };

  return (
    <motion.form onSubmit={handleSubmit(onSumbit)} layout className="space-y-4">
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <input
          {...register("phone")}
          type="tel"
          placeholder="Phone Number"
          className="input bg-white/5 border-white/10 text-white placeholder-white/50 w-full focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/30 transition-all"
        />
        {errors.phone && touchedFields.phone && <FormError message={errors.phone.message as string} />}
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
            "Code Sent Successfully"
          ) : (
            "Send Verification Code"
          )}
        </motion.button>
      </motion.div>
    </motion.form>
  );
};

export default PhoneSignIn;