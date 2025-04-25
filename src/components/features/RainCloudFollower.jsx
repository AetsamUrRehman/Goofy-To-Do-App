import React, { useState, useEffect, useRef } from 'react';

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function RainCloudFollower({
  trigger,
  spawnMin = 40000,       // ms until next cloud
  spawnMax = 45000,
  activeDuration = 10000,  // ms cloud stays
  toolbarOffset = 80,      // px down from top where cloud sits
}) {
  const [active, setActive] = useState(false);
  const [drops, setDrops] = useState([]);
  const cloudX = useRef(window.innerWidth * 0.8);
  const prevTrigger = useRef(trigger);
  const raf = useRef();
  const manualTimer = useRef();
  const isFirstManual = useRef(true);

  // Manual trigger (skips first mount)
  useEffect(() => {
    if (isFirstManual.current) {
      isFirstManual.current = false;
      return;
    }
    if (trigger <= 0) return;
    setActive(true);
    clearTimeout(manualTimer.current);
    manualTimer.current = setTimeout(() => setActive(false), activeDuration);
    return () => clearTimeout(manualTimer.current);
  }, [trigger, activeDuration]);

  // Track cloud X position
  useEffect(() => {
    function onMouse(e) { cloudX.current = e.clientX; }
    function onTouch(e) { cloudX.current = e.touches[0].clientX; }
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('touchmove', onTouch);
    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  // Manual bump trigger
  useEffect(() => {
    if (prevTrigger.current !== trigger) {
      setActive(true);
      setTimeout(() => setActive(false), activeDuration);
      prevTrigger.current = trigger;
    }
  }, [trigger, activeDuration]);

  // Auto-spawn on random schedule
  useEffect(() => {
    let handle;
    function scheduleNext() {
      const delay = randomBetween(spawnMin, spawnMax);
      handle = setTimeout(() => {
        setActive(true);
        setTimeout(() => setActive(false), activeDuration);
        scheduleNext();
      }, delay);
    }
    scheduleNext();
    return () => clearTimeout(handle);
  }, [spawnMin, spawnMax, activeDuration]);

  // Clear drops & cancel animation when cloud deactivates
  useEffect(() => {
    if (!active) {
      setDrops([]);  
      cancelAnimationFrame(raf.current);
    }
  }, [active]);

  // Spawn drops while active
  useEffect(() => {
    let dropTimeout;

    function scheduleDrop() {
      const delay = randomBetween(75, 150);
      dropTimeout = setTimeout(() => {
        const baseX = cloudX.current;
        const baseY = toolbarOffset + 50;
        setDrops(ds => [
          ...ds,
          // FAR layer x2
          { id: Date.now() + Math.random(), x: baseX + randomBetween(-60, -20), y: baseY, vy: randomBetween(1, 2), layer: 0 },
          { id: Date.now() + Math.random(), x: baseX + randomBetween( 20,  60), y: baseY, vy: randomBetween(1, 2), layer: 0 },
          // NEAR layer x1
          { id: Date.now() + Math.random(), x: baseX + randomBetween(-50,  50), y: baseY, vy: randomBetween(3, 5), layer: 1 },
        ]);
        scheduleDrop();
      }, delay);
    }

    if (active) {
      scheduleDrop();
    } else {
      clearTimeout(dropTimeout);
    }
    return () => clearTimeout(dropTimeout);
  }, [active, toolbarOffset]);

  // Animate drops while active
  useEffect(() => {
    if (!active) return;

    function update() {
      setDrops(ds =>
        ds
          .map(d => {
            const vy = d.vy + 0.1;
            return { ...d, vy, y: d.y + vy };
          })
          .filter(d => d.y < window.innerHeight + 20)
      );
      raf.current = requestAnimationFrame(update);
    }

    raf.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf.current);
  }, [active]);

  // Cloud dimensions
  const cloudW = 200;
  const cloudH = 150;

  return (
    <>
      {active && (
        <img
          src="/cloud.png"
          alt="Rain Cloud"
          style={{
            position: 'fixed',
            left: cloudX.current - cloudW / 2,
            top: toolbarOffset,
            width: cloudW,
            height: cloudH,
            pointerEvents: 'none',
            zIndex: 5000,
          }}
        />
      )}
      {drops.map(d => (
        <img
          key={d.id}
          src="/raindrop.png"
          alt=""
          style={{
            position: 'fixed',
            left: d.x,
            top: d.y,
            width: 8,
            height: 16,
            pointerEvents: 'none',
            zIndex: 4000,
          }}
        />
      ))}
    </>
  );
}
