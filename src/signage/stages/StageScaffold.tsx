import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { ParallaxLayer } from '../fx/ParallaxLayer';

interface StageScaffoldProps {
  title: string;
  subtitle: string;
  accent?: string;
  children?: ReactNode;
}

export function StageScaffold({ title, subtitle, accent = '#6bd6ff', children }: StageScaffoldProps) {
  return (
    <div className="stage-shell">
      <ParallaxLayer depth={-4}>
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 20% 30%, ${accent}40, transparent 45%), radial-gradient(circle at 70% 70%, #ffffff12, transparent 50%)`,
          }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </ParallaxLayer>

      <ParallaxLayer depth={2}>
        <div style={{ position: 'absolute', left: 60, top: 120, maxWidth: 1100 }}>
          <motion.h1
            className="title"
            initial={{ y: 44, opacity: 0, filter: 'blur(8px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="subtitle"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {subtitle}
          </motion.p>
        </div>
      </ParallaxLayer>

      {children}
    </div>
  );
}
