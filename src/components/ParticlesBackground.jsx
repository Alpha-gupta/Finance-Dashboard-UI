const particleConfig = [
  { top: "10%", left: "8%", size: 96, opacity: 0.18, delay: "0s", duration: "18s", color: "#38bdf8" },
  { top: "20%", left: "70%", size: 72, opacity: 0.14, delay: "2s", duration: "20s", color: "#fb7185" },
  { top: "55%", left: "16%", size: 110, opacity: 0.12, delay: "1s", duration: "22s", color: "#8b5cf6" },
  { top: "72%", left: "80%", size: 100, opacity: 0.16, delay: "3s", duration: "19s", color: "#22c55e" },
  { top: "35%", left: "45%", size: 140, opacity: 0.1, delay: "4s", duration: "24s", color: "#f97316" },
  { top: "85%", left: "24%", size: 84, opacity: 0.12, delay: "1.5s", duration: "21s", color: "#60a5fa" },
];

export default function ParticlesBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60">
      {particleConfig.map((particle, index) => (
        <span
          key={index}
          className="particle"
          style={{
            top: particle.top,
            left: particle.left,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  );
}
