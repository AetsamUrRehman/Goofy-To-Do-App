// src/components/features/FruitNinja.jsx
import React, { useState, useEffect, useRef } from 'react';

// All your fruit assets:
const fruitList = [
  '/Fruit/Peach.png',
  '/Fruit/Pear.png',
  '/Fruit/Pineapple.png',
  '/Fruit/Plum.png',
  '/Fruit/Pomegranate.png',
  '/Fruit/Red_Apple.png',
  '/Fruit/Strawberry.png',
  '/Fruit/Watermelon.png',
  '/Fruit/Passion_Fruit.png',
  '/Fruit/Coconut.png',
  '/Fruit/Dragon_Fruit.png',
  '/Fruit/Green_Apple.png',
  '/Fruit/Lemon.png',
  '/Fruit/Lime.png',
  '/Fruit/Mango.png',
  '/Fruit/Orange.png',
  '/Fruit/Banana.png',
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function FruitNinja({
  trigger,           // increment this to spawn a new burst
  margin = 20        // space from screen edges
}) {
  const [fruits, setFruits] = useState([]);
  const [splats, setSplats] = useState([]);
  const raf = useRef();
  const pointer = useRef({ x: -999, y: -999 });

  // Pointer‐move listeners
  useEffect(() => {
    function onMouse(e) { pointer.current = { x: e.clientX, y: e.clientY }; }
    function onTouch(e) {
      const t = e.touches[0];
      pointer.current = { x: t.clientX, y: t.clientY };
    }
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('touchmove', onTouch);
    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  // Spawn new fruits whenever `trigger` increments
  useEffect(() => {
    if (trigger == null) return;
    const counts = [2, 3, 5];
    const count = counts[Math.floor(Math.random() * counts.length)];

    const fruitW = 300;  // width/height of each sprite
    const spawnX = window.innerWidth - margin - fruitW;
    const spawnY = window.innerHeight - margin - fruitW + 300;

    const newBatch = Array.from({ length: count }).map(() => ({
      id: Math.random().toString(36).slice(2),
      src: fruitList[Math.floor(Math.random() * fruitList.length)],
      x: spawnX,
      y: spawnY,
      vx: randomBetween(-8, -4),     // slow leftward drift
      vy: randomBetween(-20, -12),   // high upward kick
      rotation: 0,
      angularVel: randomBetween(-0.1, 0.1),  // subtle spin
    }));

    setFruits(f => [...f, ...newBatch]);
  }, [trigger, margin]);

  // Animation loop: update positions under gravity and spin
  useEffect(() => {
    function update() {
      setFruits(fList => {
        const gravity = 0.15;
        return fList
          .map(f => {
            const vy = f.vy + gravity;
            const x  = f.x + f.vx;
            const y  = f.y + vy;

            // collision detection (radius 40)
            const dx = pointer.current.x - (x + 40);
            const dy = pointer.current.y - (y + 40);
            const hit = Math.hypot(dx, dy) < 40;
            if (hit) {
              // spawn a colored splat
              const colorMap = {
                '/Fruit/Peach.png':       '#FFDAB9',  // Peach Puff
                '/Fruit/Pear.png':        '#D1E231',  // Pear Yellow-Green
                '/Fruit/Pineapple.png':   '#F5E960',  // Pineapple Yellow
                '/Fruit/Plum.png':        '#8E4585',  // Plum Purple
                '/Fruit/Pomegranate.png': '#E34234',  // Pomegranate Red
                '/Fruit/Red_Apple.png':   '#FF0800',  // Bright Apple Red
                '/Fruit/Strawberry.png':  '#FC5A8D',  // Strawberry Pink
                '/Fruit/Watermelon.png':  '#FC6C85',  // Watermelon Flesh
                '/Fruit/Passion_Fruit.png':'#D99058', // Passion Fruit Orange
                '/Fruit/Coconut.png':     '#DEB887',  // Coconut Shell Brown
                '/Fruit/Dragon_Fruit.png': '#EE82EE', // Dragon Fruit Magenta
                '/Fruit/Green_Apple.png': '#8DB600',  // Green Apple
                '/Fruit/Lemon.png':       '#FFF44F',  // Lemon Yellow
                '/Fruit/Lime.png':        '#BFFF00',  // Lime Green
                '/Fruit/Mango.png':       '#FFB347',  // Mango Orange
                '/Fruit/Orange.png':      '#FFA500',  // Orange
                '/Fruit/Banana.png':      '#FFE135',  // Banana Yellow
              };
              const color = colorMap[f.src] || 'white';
              const splat = {
                id: Date.now() + Math.random(),
                x, y, color, rotation: Math.random() * 360
              };
              setSplats(s => [...s, splat]);
              // remove splat after 3s
              setTimeout(() => {
                setSplats(s => s.filter(sp => sp.id !== splat.id));
              }, 3000);
              return null; // remove this fruit
            }
            
            return {
              ...f,
              x: f.x + f.vx,
              y: f.y + vy,
              vy,
              rotation: f.rotation + f.angularVel,
            };
          })
          // filter out both off-screen and sliced fruits
          .filter(f => f && f.y < window.innerHeight + 200);
      });
      raf.current = requestAnimationFrame(update);
    }
    raf.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <>
      {fruits.map(f => (
        <img
          key={f.id}
          src={f.src}
          alt=""
          style={{
            position: 'fixed',
            left: f.x,
            top: f.y,
            width: 80,
            height: 80,
            transform: `rotate(${f.rotation}rad)`,
            pointerEvents: 'none',
            zIndex: 5000,
          }}
        />
      ))}

      {/* render the splat circles */}
      {splats.map(sp => (
        <div
          key={sp.id}
          style={{
            position: 'fixed',
            left: sp.x,
            top: sp.y,
            width: 100,    // adjust to match your splatter image size
            height: 100,
            pointerEvents: 'none',
            zIndex: 5000,
        
            /* Mask in the splatter shape: */
            maskImage: 'url(/paint_splatter.png)',
            WebkitMaskImage: 'url(/paint_splatter.png)',  /* Safari */
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
        
            /* Fill it with the fruit color: */
            backgroundColor: sp.color,
        
            /* fade out: */
            transform: `rotate(${sp.rotation}deg)`,
            animation: 'fadeOut 3s forwards',
          }}
        />
      ))}

      {/* simple fade‐out keyframes */}
      <style>
        {`
          @keyframes fadeOut {
            to { opacity: 0; }
          }
        `}
      </style>
    </>
  );
}


