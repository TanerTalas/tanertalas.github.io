import { useEffect, useState } from "react";

// Types out a string one character at a time. Used for the hero headline.
export function useTypewriter(text, { startDelay = 0, speed = 90 } = {}) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const timers = [];

    const start = setTimeout(function type() {
      if (i <= text.length) {
        setTyped(text.slice(0, i));
        i += 1;
        timers.push(setTimeout(type, speed));
      }
    }, startDelay);
    timers.push(start);

    return () => timers.forEach(clearTimeout);
  }, [text, startDelay, speed]);

  return typed;
}
