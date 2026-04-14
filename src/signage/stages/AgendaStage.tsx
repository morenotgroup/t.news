import { motion } from 'motion/react';
import type { AgendaItem } from '../../services/contentAdapters/schemas';
import { StageScaffold } from './StageScaffold';

interface AgendaStageProps {
  items: AgendaItem[];
}

export function AgendaStage({ items }: AgendaStageProps) {
  return (
    <StageScaffold title="Timeline Viva" subtitle="Agenda do dia com profundidade e movimento" accent="#d2b1ff">
      <div style={{ position: 'absolute', bottom: 130, left: 60, right: 60, display: 'flex', gap: 18, flexWrap: 'wrap' }}>
        {items.map((item, index) => (
          <motion.div
            key={`${item.startAt}-${item.title}`}
            className="badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{ minWidth: 220 }}
          >
            {item.startAt} · {item.title}
          </motion.div>
        ))}
      </div>
    </StageScaffold>
  );
}
