export function StarryNightBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-surface-primary" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: [
            "radial-gradient(1px 1px at 25px 35px, rgba(255,255,255,0.85), transparent)",
            "radial-gradient(1px 1px at 85px 120px, rgba(255,255,255,0.5), transparent)",
            "radial-gradient(1.5px 1.5px at 160px 60px, rgba(197,163,88,0.45), transparent)",
            "radial-gradient(1px 1px at 220px 180px, rgba(255,255,255,0.4), transparent)",
            "radial-gradient(1px 1px at 310px 90px, rgba(212,168,83,0.35), transparent)",
            "radial-gradient(1.5px 1.5px at 420px 140px, rgba(255,255,255,0.45), transparent)",
            "radial-gradient(1px 1px at 520px 40px, rgba(197,163,88,0.3), transparent)",
            "radial-gradient(1px 1px at 640px 200px, rgba(255,255,255,0.35), transparent)",
            "radial-gradient(1px 1px at 720px 80px, rgba(255,255,255,0.6), transparent)",
            "radial-gradient(1.5px 1.5px at 880px 160px, rgba(212,168,83,0.3), transparent)",
          ].join(", "),
          backgroundSize: "960px 240px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(197,163,88,0.08),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(5,8,15,0.4),transparent_50%)]" />
    </div>
  );
}
