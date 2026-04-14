import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import { StageScaffold } from './StageScaffold';

export function SextouStage() {
  useEffect(() => {
    confetti({ particleCount: 220, spread: 100, origin: { y: 0.7 } });
  }, []);

  return <StageScaffold title="SEXTOU" subtitle="Happy hour em contagem regressiva • modo festa ativado" accent="#ffa66b" />;
}
