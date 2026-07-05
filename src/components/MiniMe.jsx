import { useEffect, useRef } from "react";

// A little mascot that pops up from the bottom of the page once, types out two
// speech-bubble messages, then ducks back down. Purely decorative; pointer-events off.
export default function MiniMe() {
  const bodyRef = useRef(null);
  const headRef = useRef(null);
  const bubbleRef = useRef(null);
  const textRef = useRef(null);
  const leftHandRef = useRef(null);
  const rightHandRef = useRef(null);

  useEffect(() => {
    const timers = [];
    const wait = (ms, fn) => timers.push(setTimeout(fn, ms));

    const typeText = (text, el, delay, done) => {
      let i = 0;
      el.textContent = "";
      const iv = setInterval(() => {
        if (i < text.length) el.textContent += text[i++];
        else {
          clearInterval(iv);
          done && done();
        }
      }, delay);
      timers.push(() => clearInterval(iv));
    };

    const deleteText = (el, delay, done) => {
      let i = el.textContent.length;
      const iv = setInterval(() => {
        if (i > 0) el.textContent = el.textContent.slice(0, --i);
        else {
          clearInterval(iv);
          done && done();
        }
      }, delay);
      timers.push(() => clearInterval(iv));
    };

    // Rise up + show hands
    wait(9000, () => {
      if (bodyRef.current) {
        bodyRef.current.style.transitionDelay = "1s";
        bodyRef.current.style.bottom = "0px";
      }
      if (headRef.current) {
        headRef.current.style.transitionDelay = "1s";
        headRef.current.style.bottom = "36px";
      }
      if (leftHandRef.current) leftHandRef.current.style.opacity = "1";
      if (rightHandRef.current) rightHandRef.current.style.opacity = "1";
    });

    // Show + type bubble
    wait(11000, () => {
      if (bubbleRef.current) bubbleRef.current.style.opacity = "1";
    });
    wait(11200, () => {
      if (!textRef.current) return;
      typeText("Did you like my new portfolio?", textRef.current, 70, () => {
        wait(3000, () => {
          deleteText(textRef.current, 30, () => {
            wait(200, () => typeText("Now going fullstack!", textRef.current, 70));
          });
        });
      });
    });

    // Hide bubble, then duck back down
    wait(21000, () => {
      if (bubbleRef.current) {
        bubbleRef.current.style.opacity = "0";
        bubbleRef.current.style.transform = "translateX(-50%) scale(0.8)";
      }
    });
    wait(21800, () => {
      if (bodyRef.current) {
        bodyRef.current.style.transitionDelay = "0s";
        bodyRef.current.style.bottom = "-110px";
      }
      if (headRef.current) {
        headRef.current.style.transitionDelay = "0s";
        headRef.current.style.bottom = "-68px";
      }
      if (leftHandRef.current) leftHandRef.current.style.opacity = "0";
      if (rightHandRef.current) rightHandRef.current.style.opacity = "0";
    });

    return () => timers.forEach((t) => (typeof t === "function" ? t() : clearTimeout(t)));
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed bottom-2 left-1/2 z-[999] h-[300px] w-[300px] -translate-x-1/2 overflow-hidden">
        <img
          src="/img/character/stick.svg"
          alt=""
          className="absolute bottom-0 left-1/2 z-[800] w-[100px] -translate-x-1/2"
        />
        <img
          ref={bodyRef}
          src="/img/character/body.svg"
          alt=""
          className="absolute left-1/2 max-w-[70px] -translate-x-1/2 transition-[bottom] duration-[800ms]"
          style={{ bottom: "-110px" }}
        />
        <img
          ref={headRef}
          src="/img/character/head.svg"
          alt=""
          className="absolute left-1/2 max-w-[70px] -translate-x-1/2 transition-[bottom] duration-[800ms]"
          style={{ bottom: "-68px" }}
        />
        <div
          ref={bubbleRef}
          className="absolute bottom-[120px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-2xl border-2 border-[#333] bg-white px-3.5 py-2.5 text-sm leading-[1.43] text-[#333] opacity-0 shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition-[opacity,transform] duration-[400ms]"
        >
          <span ref={textRef} />
          <span className="ml-0.5 inline-block animate-[blink_0.8s_steps(1,end)_infinite]">|</span>
        </div>
      </div>
      <img
        ref={leftHandRef}
        src="/img/character/left-hand.svg"
        alt=""
        className="pointer-events-none fixed bottom-1 left-[calc(50%-42px)] z-[1000] w-6 opacity-0 transition-opacity duration-[800ms]"
      />
      <img
        ref={rightHandRef}
        src="/img/character/right-hand.svg"
        alt=""
        className="pointer-events-none fixed bottom-1 left-[calc(50%+18px)] z-[1000] w-6 opacity-0 transition-opacity duration-[800ms]"
      />
    </>
  );
}
