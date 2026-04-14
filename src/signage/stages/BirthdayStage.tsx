import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import { StageScaffold } from './StageScaffold';

export function BirthdayStage() {
  useEffect(() => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.62 } });
  }, []);

  return <StageScaffold title="Happy Day" subtitle="Parabéns, Ana! ✨ Hoje é seu dia no T.Group." accent="#ff8fd2" />;
}
