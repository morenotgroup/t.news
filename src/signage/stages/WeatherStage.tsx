import { motion } from 'motion/react';
import type { WeatherContent } from '../../services/contentAdapters/schemas';
import { StageScaffold } from './StageScaffold';

interface WeatherStageProps {
  weather: WeatherContent;
}

export function WeatherStage({ weather }: WeatherStageProps) {
  return (
    <StageScaffold
      title={`${weather.city} • ${weather.tempC}º`}
      subtitle={`Sensação de ${weather.feelsLikeC}º · ${weather.condition}`}
      accent="#6bd6ff"
    >
      <motion.div
        style={{ position: 'absolute', bottom: 110, left: 60, right: 60, height: 80, borderRadius: 16, border: '1px solid rgba(255,255,255,0.2)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          style={{ height: '100%', width: '100%', background: 'linear-gradient(90deg, #6bd6ffaa, #ffffff22)' }}
          animate={{ clipPath: ['inset(50% 0 0 0)', 'inset(15% 0 0 0)', 'inset(50% 0 0 0)'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </StageScaffold>
  );
}
