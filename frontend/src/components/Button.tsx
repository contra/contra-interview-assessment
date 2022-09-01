import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  setState: (state: boolean) => void;
};

const Button = ({ children, setState }: Props) => {
  return (
    <motion.button
      className="w-full rounded-lg bg-[#f2c94c] font-semibold text-black"
      onClick={() => setState(true)}
      type="button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
