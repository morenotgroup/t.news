import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Grain } from '../fx/Grain';
import { Vignette } from '../fx/Vignette';
import { BrandMark } from '../shared/BrandMark';
import { Clock } from '../shared/Clock';
import { Ticker } from '../shared/Ticker';
import { FilmCut } from '../transitions/FilmCut';
import { MaskWipe } from '../transitions/MaskWipe';
import { MorphDissolve } from '../transitions/MorphDissolve';
import { AgendaStage } from '../stages/AgendaStage';
import { BirthdayStage } from '../stages/BirthdayStage';
import { BrandReelStage } from '../stages/BrandReelStage';
import { LunchStage } from '../stages/LunchStage';
import { ManifestoStage } from '../stages/ManifestoStage';
import { NewsStage } from '../stages/NewsStage';
import { NumbersStage } from '../stages/NumbersStage';
import { PlaylistStage } from '../stages/PlaylistStage';
import { SextouStage } from '../stages/SextouStage';
import { WelcomeStage } from '../stages/WelcomeStage';
import { WeatherStage } from '../stages/WeatherStage';
import { getScheduleForNow, inferMood } from './schedule';
import { MoodContext, useMoodStore } from './mood';
import { useSignageEvents } from './useSignageEvents';
import type { StageDefinition, StageKey } from './types';
import { useContentBundle } from '../../services/api/useContentBundle';

const TICKER_ITEMS = ['T.News ao vivo', 'Welcome clients', 'Sexta 17h: modo festa'];

function transitionFor(index: number) {
  switch (index % 3) {
    case 0:
      return MaskWipe;
    case 1:
      return FilmCut;
    default:
      return MorphDissolve;
  }
}

export function SceneDirector() {
  const [now, setNow] = useState(new Date());
  const [stageIndex, setStageIndex] = useState(0);
  const [interruptStage, setInterruptStage] = useState<StageKey | null>(null);
  const mood = useMoodStore((s) => s.mood);
  const setMood = useMoodStore((s) => s.setMood);
  const { bundle, isStale, lastSync } = useContentBundle();

  const schedule = useMemo(() => getScheduleForNow(now), [now]);
  const currentStageKey = interruptStage ?? schedule[stageIndex % schedule.length];

  const stages: Record<StageKey, StageDefinition> = useMemo(() => ({
    welcome: { key: 'welcome', durationMs: 12000, render: () => <WelcomeStage /> },
    weather: { key: 'weather', durationMs: 10000, render: () => <WeatherStage weather={bundle.weather} /> },
    news: { key: 'news', durationMs: 11000, render: () => <NewsStage headlines={bundle.news} /> },
    agenda: { key: 'agenda', durationMs: 10000, render: () => <AgendaStage items={bundle.agenda} /> },
    lunch: { key: 'lunch', durationMs: 10000, render: () => <LunchStage menu={bundle.menu} /> },
    birthday: { key: 'birthday', durationMs: 9000, render: () => <BirthdayStage /> },
    brandReel: { key: 'brandReel', durationMs: 10000, render: () => <BrandReelStage /> },
    manifesto: { key: 'manifesto', durationMs: 10000, render: () => <ManifestoStage /> },
    numbers: { key: 'numbers', durationMs: 10000, render: () => <NumbersStage /> },
    playlist: { key: 'playlist', durationMs: 10000, render: () => <PlaylistStage music={bundle.music} /> },
    sextou: { key: 'sextou', durationMs: 10000, render: () => <SextouStage /> },
  }), [bundle]);

  const currentStage = stages[currentStageKey];

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    setMood(inferMood(now));
  }, [now, setMood]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setStageIndex((prev) => prev + 1);
      setInterruptStage(null);
    }, currentStage.durationMs);

    return () => window.clearTimeout(timeout);
  }, [currentStage]);

  useSignageEvents(
    useCallback(
      (event) => {
        if (event.type === 'INTERRUPT_STAGE') {
          setInterruptStage(event.stage);
        }
        if (event.type === 'MOOD_OVERRIDE') {
          setMood(event.mood);
        }
      },
      [setMood],
    ),
  );

  const Transition = transitionFor(stageIndex);

  return (
    <MoodContext.Provider value={mood}>
      <LayoutGroup>
        <motion.div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div key={`${currentStage.key}-${stageIndex}`} style={{ width: '100%', height: '100%' }}>
              <Transition>
                {currentStage.render({ now, mood, content: bundle, isStale, lastSync })}
              </Transition>
            </motion.div>
          </AnimatePresence>

          <BrandMark />
          <Clock now={now} />
          <Ticker
            items={[
              `Mood: ${mood}`,
              `Sync: ${lastSync.toLocaleTimeString('pt-BR')}`,
              isStale ? 'Dados em fallback' : 'Dados atualizados',
              ...TICKER_ITEMS,
            ]}
          />
          <Grain />
          <Vignette />
        </motion.div>
      </LayoutGroup>
    </MoodContext.Provider>
  );
}
