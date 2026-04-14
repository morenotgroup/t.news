import { motion } from 'motion/react';
import type { PropsWithChildren } from 'react';

export function MorphDissolve({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'saturate(0.7) contrast(0.9)' }}
      animate={{ opacity: 1, filter: 'saturate(1) contrast(1)' }}
      exit={{ opacity: 0, filter: 'saturate(1.3) contrast(1.1)' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  );
}
