import { motion } from 'motion/react';
import type { PropsWithChildren } from 'react';

export function FilmCut({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ filter: 'blur(7px)', scale: 1.02, opacity: 0 }}
      animate={{ filter: 'blur(0px)', scale: 1, opacity: 1 }}
      exit={{ filter: 'blur(5px)', scale: 0.99, opacity: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  );
}
