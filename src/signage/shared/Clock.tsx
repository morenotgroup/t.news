import dayjs from 'dayjs';
import { motion } from 'motion/react';

interface ClockProps {
  now: Date;
}

export function Clock({ now }: ClockProps) {
  return (
    <motion.div
      layoutId="global-clock"
      className="badge"
      style={{ position: 'absolute', top: 28, right: 28, fontVariantNumeric: 'tabular-nums', zIndex: 5 }}
    >
      {dayjs(now).format('HH:mm:ss')}
    </motion.div>
  );
}
