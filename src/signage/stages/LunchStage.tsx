import type { MenuContent } from '../../services/contentAdapters/schemas';
import { StageScaffold } from './StageScaffold';

interface LunchStageProps {
  menu: MenuContent;
}

export function LunchStage({ menu }: LunchStageProps) {
  return <StageScaffold title={`Menu — ${menu.dayLabel}`} subtitle={`${menu.dish}${menu.notes ? ` · ${menu.notes}` : ''}`} accent="#ffd0a8" />;
}
