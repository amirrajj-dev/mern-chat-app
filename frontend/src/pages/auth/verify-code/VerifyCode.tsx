import { motion } from "framer-motion";
import AuthLayout from "../../../layouts/AuthLAyout";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import {MoveLeft} from 'lucide-react'

const VerifyCode = () => {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto focus to next input
      if (value && index < 4) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };
  return (
    <AuthLayout
      title="Verify Your Identity"
      subtitle={`Enter the code sent to user email or phone`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center lg:hidden mb-6"
      >
        <img
          src="https://img.icons8.com/?size=512w&id=yg_1BRRCDTMO&format=png"
          alt="Chat App Logo"
          className="size-20 mb-4"
        />
      </motion.div>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="backdrop-blur-sm bg-white/5 p-8 rounded-2xl shadow-lg space-y-6 border border-white/10"
      >
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center space-x-3"
        >
          {code.map((digit, index) => (
            <motion.input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              value={digit}
              onChange={e=>handleChange(index , e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              type="text"
              maxLength={1}
              className="input bg-base-content/5 border-none outline-none text-center text-xl text-base-content w-12 h-12 focus:ring-1 focus:ring-indigo-400/50"
              whileFocus={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              autoFocus={index === 0}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-white/60"
        >
          <p>
            Code expires in <span className="font-semibold">60 seconds</span>
          </p>
          <button
            type="button"
            className="text-indigo-400 hover:text-indigo-300 mt-1"
          >
            Resend Code
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-2"
        >
          <motion.button
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(99, 102, 241, 0.9)",
            }}
            whileTap={{ scale: 0.98 }}
            className="btn bg-indigo-600 hover:bg-indigo-700 border-none text-white w-full mt-2"
            type="submit"
          >
            Verify & Sign In
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-white/60"
        >
          <Link
            to="/auth/signin"
            className="hover:text-white/80 flex items-center justify-center"
          >
          <MoveLeft className="mr-2" />
            Use different email/phone
          </Link>
        </motion.div>
      </motion.form>
    </AuthLayout>
  );
};

export default VerifyCode;
