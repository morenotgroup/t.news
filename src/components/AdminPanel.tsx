import { useMemo, useState } from 'react';
import { readAdminContent, writeAdminContent } from '../services/admin/contentAdminStore';

export function AdminPanel() {
  const initial = useMemo(() => readAdminContent(), []);
  const [agendaText, setAgendaText] = useState(
    initial.agenda.map((item) => `${item.startAt}|${item.title}`).join('\n'),
  );
  const [headlineText, setHeadlineText] = useState(
    initial.headlines.map((item) => `${item.title}|${item.source}`).join('\n'),
  );
  const [dish, setDish] = useState(initial.menu.dish);
  const [menuNotes, setMenuNotes] = useState(initial.menu.notes ?? '');
  const [station, setStation] = useState(initial.music.station);
  const [nowPlaying, setNowPlaying] = useState(initial.music.nowPlaying);
  const [nextTrack, setNextTrack] = useState(initial.music.next ?? '');
  const [savedAt, setSavedAt] = useState<string>('');

  function save(): void {
    const agenda = agendaText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [startAt, title] = line.split('|');
        return { startAt: (startAt ?? '').trim(), title: (title ?? '').trim() };
      })
      .filter((item) => item.startAt && item.title);

    const headlines = headlineText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [title, source] = line.split('|');
        return { title: (title ?? '').trim(), source: (source ?? 'Admin').trim() };
      })
      .filter((item) => item.title);

    writeAdminContent({
      agenda,
      headlines,
      menu: { dayLabel: 'Hoje', dish, notes: menuNotes },
      music: { station, nowPlaying, next: nextTrack },
    });

    setSavedAt(new Date().toLocaleString('pt-BR'));
  }

  return (
    <div style={{ padding: 24, color: '#e7edf8', background: '#080b12', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <h1>Painel Admin — t.news</h1>
      <p>Use "|" como separador. Exemplo agenda: <code>09:30|Daily criativo</code>.</p>

      <section>
        <h2>Agenda</h2>
        <textarea value={agendaText} onChange={(e) => setAgendaText(e.target.value)} rows={6} style={{ width: '100%' }} />
      </section>

      <section>
        <h2>Headlines</h2>
        <textarea value={headlineText} onChange={(e) => setHeadlineText(e.target.value)} rows={6} style={{ width: '100%' }} />
      </section>

      <section>
        <h2>Menu</h2>
        <input value={dish} onChange={(e) => setDish(e.target.value)} placeholder="Prato do dia" style={{ width: '100%', marginBottom: 8 }} />
        <input value={menuNotes} onChange={(e) => setMenuNotes(e.target.value)} placeholder="Observações" style={{ width: '100%' }} />
      </section>

      <section>
        <h2>Música</h2>
        <input value={station} onChange={(e) => setStation(e.target.value)} placeholder="Station" style={{ width: '100%', marginBottom: 8 }} />
        <input value={nowPlaying} onChange={(e) => setNowPlaying(e.target.value)} placeholder="Tocando agora" style={{ width: '100%', marginBottom: 8 }} />
        <input value={nextTrack} onChange={(e) => setNextTrack(e.target.value)} placeholder="Próxima faixa" style={{ width: '100%' }} />
      </section>

      <button onClick={save} style={{ marginTop: 16, padding: '10px 16px' }}>Salvar conteúdo</button>
      {savedAt && <p>Salvo em: {savedAt}</p>}

      <hr style={{ margin: '24px 0' }} />
      <p>
        Player: <a href="/">/</a> · Admin: <a href="/?admin=1">/?admin=1</a>
      </p>
    </div>
  );
}
