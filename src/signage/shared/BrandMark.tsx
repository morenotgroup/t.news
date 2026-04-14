import { motion } from 'motion/react';

export function BrandMark() {
  return (
    <motion.div
      style={{ position: 'absolute', top: 26, left: 28, fontWeight: 700, letterSpacing: '0.08em', zIndex: 5 }}
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 4, repeat: Infinity }}
    >
      T.GROUP
    </motion.div>
  );
}
