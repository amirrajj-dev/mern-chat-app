import { motion } from "framer-motion";
import { ShieldX } from "lucide-react";

const FormError = ({ message }: { message: string }) => (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-1 mt-1 text-xs text-rose-500"
    >
      <ShieldX/>
      <span className="capitalize">{message}</span>
    </motion.div>
  );
  
  export default FormError  