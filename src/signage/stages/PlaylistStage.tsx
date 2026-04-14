import { motion } from 'motion/react';
import type { MusicContent } from '../../services/contentAdapters/schemas';
import { StageScaffold } from './StageScaffold';

interface PlaylistStageProps {
  music: MusicContent;
}

export function PlaylistStage({ music }: PlaylistStageProps) {
  return (
    <StageScaffold title="Playlist da Casa" subtitle={`${music.station} · ${music.nowPlaying}`} accent="#80b5ff">
      <motion.div
        style={{ position: 'absolute', right: 120, top: 180, width: 220, height: 220, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </StageScaffold>
  );
}
