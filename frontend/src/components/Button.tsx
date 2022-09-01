import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  setState: (state: boolean) => void;
};

const Button = ({ children, setState }: Props) => {
  return (
    <motion.button
      className="m-auto max-h-20 w-full max-w-lg rounded-lg bg-[#f2c94c] p-4 font-semibold text-black"
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
