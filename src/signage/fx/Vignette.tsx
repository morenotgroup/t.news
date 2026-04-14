export function Vignette() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background:
          'radial-gradient(circle at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.5) 100%)',
      }}
    />
  );
}
