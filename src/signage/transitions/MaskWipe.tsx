import { motion } from 'motion/react';
import type { PropsWithChildren } from 'react';

export function MaskWipe({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ clipPath: 'inset(0 100% 0 0 round 12px)', opacity: 0.6 }}
      animate={{ clipPath: 'inset(0 0% 0 0 round 0px)', opacity: 1 }}
      exit={{ clipPath: 'inset(0 0 0 100% round 12px)', opacity: 0.45 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  );
}
