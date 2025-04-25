import React, { useState, useEffect, useRef } from 'react';

export default function WhackAMolePopup({
  trigger,             // bump to open the game
  onDone,              // called when it closes
  duration = 15000,    // game length in ms
  holeCount = 6,       // total holes (must be even)
  spawnMin = 500,      // ms between pops (min)
  spawnMax = 1200,     // ms between pops (max)
}) {
  const [visible, setVisible]       = useState(false);
  const [activeHole, setActiveHole] = useState(null);
  const [score, setScore]           = useState(0);

  const prevTrigger = useRef(trigger);
  const spawnTimer  = useRef();
  const gameTimer   = useRef();

  // Open on trigger change (skip initial mount)
  useEffect(() => {
    if (prevTrigger.current === trigger) {
      prevTrigger.current = trigger;
      return;
    }
    setVisible(true);
    setScore(0);

    // start popping moles
    function spawn() {
      const nextHole = Math.floor(Math.random() * holeCount);
      setActiveHole(nextHole);
      const delay = Math.random() * (spawnMax - spawnMin) + spawnMin;
      spawnTimer.current = setTimeout(spawn, delay);
    }
    spawn();

    /* // end game after duration
    gameTimer.current = setTimeout(() => {
      cleanup();
    }, duration); */ // not implemented right now

    return () => {
      clearTimeout(spawnTimer.current);
      clearTimeout(gameTimer.current);
    };
  }, [trigger, holeCount, spawnMin, spawnMax, duration]);

  function cleanup() {
    clearTimeout(spawnTimer.current);
    clearTimeout(gameTimer.current);
    setVisible(false);
    onDone?.();
  }

  if (!visible) return null;

  return (
    <div
      onClick={cleanup}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10001,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          backgroundColor: '#fff',
          borderRadius: 8,
          padding: '48px 24px 24px',   // ↑ more top padding
          display: 'grid',
          gridTemplateColumns: `repeat(${holeCount/2}, 1fr)`,
          gridGap: 16,
          minWidth: 400,                // ↑ ensure enough width
        }}
      >
        {/* Close button */}
        <button
          onClick={cleanup}
          style={{
            position: 'absolute',
            top: 8, right: 8,
            background: 'transparent',
            border: 'none',
            fontSize: 24,
            lineHeight: 1,
            cursor: 'pointer',
          }}
        >×</button>

        {/* Score display */}
        <div style={{
          position: 'absolute',
          top: 8, left: 16,
          fontSize: 18,
          fontWeight: 'bold',
        }}>
          Score: {score}
        </div>

        {/* Holes */}
        {Array.from({ length: holeCount }).map((_, idx) => (
          <div
            key={idx}
            onClick={() => {
              if (idx === activeHole) {
                setScore(s => s + 1);
                setActiveHole(null);
              }
            }}
            style={{
              width: 100,
              height: 100,
              backgroundColor: '#654321',
              borderRadius: '50%',
              position: 'relative',
              cursor: idx === activeHole ? 'pointer' : 'default',
            }}
          >
            {activeHole === idx && (
              <img
                src="/mole.png"
                alt="Mole"
                style={{
                  position: 'absolute',
                  top: 5,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 80,
                  height: 80,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

