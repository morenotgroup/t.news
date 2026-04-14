import { motion } from 'motion/react';

interface TickerProps {
  items: string[];
}

export function Ticker({ items }: TickerProps) {
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.18)' }}>
      <motion.div
        style={{ display: 'inline-flex', gap: 36, padding: '10px 0', whiteSpace: 'nowrap' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} style={{ opacity: 0.9 }}>
            • {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
