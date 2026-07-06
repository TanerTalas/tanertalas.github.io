import "./Wind.css";

// Wind gust streaks drifting endlessly across the hero sky. Each streak is a
// squiggly SVG stroke that draws itself in from the front and releases from the
// tail while travelling left-to-right, so gusts appear, sweep past, and dissolve.
const streaks = [
  { top: "10%", scale: 1, duration: "9s", delay: "0s", opacity: 0.55, z: 7 },
  { top: "22%", scale: 0.65, duration: "13s", delay: "4s", opacity: 0.35, z: 4 },
  { top: "16%", scale: 0.85, duration: "11s", delay: "7.5s", opacity: 0.45, z: 6 },
  { top: "38%", scale: 0.75, duration: "12s", delay: "2s", opacity: 0.4, z: 5 },
  { top: "50%", scale: 1.15, duration: "10s", delay: "5.5s", opacity: 0.5, z: 7 },
  { top: "31%", scale: 0.55, duration: "14s", delay: "9s", opacity: 0.3, z: 4 },
  { top: "60%", scale: 0.9, duration: "11.5s", delay: "1s", opacity: 0.45, z: 6 },
];

export default function Wind() {
  return (
    <div className="wind" aria-hidden="true">
      {streaks.map((streak, idx) => (
        <svg
          key={idx}
          className="wind__streak"
          style={{
            top: streak.top,
            zIndex: streak.z,
            scale: String(streak.scale),
            "--wind-duration": streak.duration,
            "--wind-delay": streak.delay,
            "--wind-opacity": streak.opacity,
          }}
          viewBox="0 0 130 24"
          width="130"
          height="24"
          fill="none"
        >
          <path
            className="wind__path"
            d="M2 14 Q 18 4, 34 14 T 66 14 T 98 14 Q 114 18, 126 8"
            pathLength="100"
          />
        </svg>
      ))}
    </div>
  );
}
