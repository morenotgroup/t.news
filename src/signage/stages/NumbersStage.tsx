import { motion } from 'motion/react';
import { StageScaffold } from './StageScaffold';

const stats = [
  { label: 'Eventos em 2026', value: 128 },
  { label: 'Marcas atendidas', value: 46 },
  { label: 'Produções simultâneas', value: 9 },
];

export function NumbersStage() {
  return (
    <StageScaffold title="Cases & Números" subtitle="Indicadores em motion para reforço institucional" accent="#98ffcf">
      <div style={{ position: 'absolute', right: 90, bottom: 120, display: 'grid', gap: 12 }}>
        {stats.map((stat, index) => (
          <motion.div key={stat.label} className="badge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.12 }}>
            <strong>{stat.value}</strong> · {stat.label}
          </motion.div>
        ))}
      </div>
    </StageScaffold>
  );
}
