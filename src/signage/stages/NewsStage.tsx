import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import type { NewsContent } from '../../services/contentAdapters/schemas';
import { StageScaffold } from './StageScaffold';

interface NewsStageProps {
  headlines: NewsContent[];
}

export function NewsStage({ headlines }: NewsStageProps) {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const main = headlines[0]?.title ?? 'Sem manchetes no momento';

  useEffect(() => {
    if (!titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { y: 34, opacity: 0, filter: 'blur(8px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.65, ease: 'power3.out' },
    );
  }, [main]);

  return (
    <StageScaffold title="Newsroom 2.0" subtitle="Kinetic type, imagem com parallax e curadoria editorial" accent="#ffca6b">
      <div ref={titleRef} style={{ position: 'absolute', right: 90, top: 150, fontSize: '2rem', width: 680, fontWeight: 700 }}>
        {main}
      </div>
    </StageScaffold>
  );
}
