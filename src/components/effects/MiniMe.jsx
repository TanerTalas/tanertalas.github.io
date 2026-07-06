import { useEffect, useRef } from "react";
import "./MiniMe.css";

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
      <div className="minime">
        <img src="/img/character/stick.svg" alt="" className="minime__stick" />
        <img
          ref={bodyRef}
          src="/img/character/body.svg"
          alt=""
          className="minime__body"
          style={{ bottom: "-110px" }}
        />
        <img
          ref={headRef}
          src="/img/character/head.svg"
          alt=""
          className="minime__head"
          style={{ bottom: "-68px" }}
        />
        <div ref={bubbleRef} className="minime__bubble">
          <span ref={textRef} />
          <span className="minime__caret">|</span>
        </div>
      </div>
      <img
        ref={leftHandRef}
        src="/img/character/left-hand.svg"
        alt=""
        className="minime__hand minime__hand--left"
      />
      <img
        ref={rightHandRef}
        src="/img/character/right-hand.svg"
        alt=""
        className="minime__hand minime__hand--right"
      />
    </>
  );
}
