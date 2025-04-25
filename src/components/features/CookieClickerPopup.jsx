// src/components/features/CookieClickerPopup.jsx
import React, { useState, useEffect, useRef } from 'react';

export default function CookieClickerPopup({
  trigger,        // bump this to show the cookie manually
  panelBounds,    // { right, bottom } from App
  margin = 20,    // gap around the edges
  topOffset = 80, // px down from top toolbar
  duration = 5000,// ms before it hides
}) {
  const [visible, setVisible] = useState(false);
  const [count,   setCount  ] = useState(0);
  const [pos,     setPos    ] = useState({ left: 0, top: 0 });

  const prevTrigger = useRef(trigger);
  const hideTimer   = useRef();

  // Common show function
  function showCookie() {
    // reset counter
    setCount(0);

    // compute random position in the right-hand box
    const regionLeft   = panelBounds.right + margin;
    const regionRight  = window.innerWidth  - margin;
    const regionTop    = topOffset;
    const regionBottom = window.innerHeight  - margin;
    const regionW = regionRight - regionLeft;
    const regionH = regionBottom - regionTop;
    const factor = 0.5;  // shrink to 50%
    const boxW = regionW * factor;
    const boxH = regionH * factor;
    const boxLeft = regionLeft + (regionW - boxW)/2;
    const boxTop  = regionTop  + (regionH - boxH)/2;
    const size = 200;     // cookie size
    const newLeft = boxLeft + Math.random() * (boxW - size);
    const newTop  = boxTop  + Math.random() * (boxH - size);
    setPos({ left: newLeft, top: newTop });

    // show and schedule hide
    setVisible(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setVisible(false);
    }, duration);
  }

  // Manual trigger (ignores the initial render)
  useEffect(() => {
    if (prevTrigger.current !== trigger) {
      showCookie();
      prevTrigger.current = trigger;
    }
  }, [trigger]);

  // Auto-spawn every 60s (first spawn after 60s, no page-load flash)
  useEffect(() => {
    let autoTimer;
    function scheduleNext() {
      autoTimer = setTimeout(() => {
        showCookie();
        scheduleNext();
      }, 60000);
    }
    scheduleNext();
    return () => clearTimeout(autoTimer);
  }, []);

  if (!visible) return null;

  const size = 200;
  return (
    <>
      <img
        src="/cookie_clicker.png"
        alt="Cookie"
        onClick={() => setCount(c => c + 1)}
        style={{
          position: 'fixed',
          left:   pos.left,
          top:    pos.top,
          width:  size,
          height: size,
          cursor: 'pointer',
          zIndex: 5000,
        }}
      />
      <div style={{
        position:      'fixed',
        left:          pos.left,
        top:           pos.top + size + 8,  // 8px below
        color:         '#fff',
        fontSize:      20,
        zIndex:        5001,
        pointerEvents: 'none',
      }}>
        Cookies clicked: {count}
      </div>
    </>
  );
}