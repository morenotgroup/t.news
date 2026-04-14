import { motion } from 'motion/react';
import type { PropsWithChildren } from 'react';

interface ParallaxLayerProps extends PropsWithChildren {
  depth?: number;
}

export function ParallaxLayer({ depth = 0, children }: ParallaxLayerProps) {
  return (
    <motion.div
      style={{ position: 'absolute', inset: 0 }}
      animate={{ x: [0, depth * 2, 0], y: [0, depth * -1.5, 0], rotate: [0, depth * 0.08, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
