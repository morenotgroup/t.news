import { motion } from 'motion/react';

export function Grain() {
  return (
    <motion.div
      aria-hidden
      style={{
        position: 'absolute',
        inset: '-30%',
        pointerEvents: 'none',
        backgroundImage:
          'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1.8px)',
        backgroundSize: '3px 3px',
        mixBlendMode: 'soft-light',
      }}
      animate={{ x: ['0%', '2%', '-2%', '0%'], y: ['0%', '-1%', '1%', '0%'] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
    />
  );
}
