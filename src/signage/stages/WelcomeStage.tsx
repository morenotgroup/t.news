import { motion } from 'motion/react';
import { StageScaffold } from './StageScaffold';

export function WelcomeStage() {
  return (
    <StageScaffold title="T.Group Living Wall" subtitle="Canal vivo da casa — intro cinematográfica contínua" accent="#89ffad">
      <motion.div
        style={{ position: 'absolute', right: 120, top: 200, display: 'grid', gap: 10 }}
        initial={{ opacity: 0, x: 35 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.25, duration: 0.8 }}
      >
        {['T.Brands', 'T.Venues', 'T.Dreams', 'T.Youth'].map((brand) => (
          <div key={brand} className="badge">
            {brand}
          </div>
        ))}
      </motion.div>
    </StageScaffold>
  );
}
