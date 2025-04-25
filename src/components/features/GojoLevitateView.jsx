import React, { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';

export default function GojoLevitateView({
  duration = 10000,     // total animation + display time
  soundVolume = 1.0,   // volume for gomen.mp3
  onDone,              // callback when finished
}) {
  const [animate, setAnimate] = useState(false);
  const soundRef = useRef(null);
  const timeoutRef = useRef();

  // click handler to abort early
  function handleClick() {
    clearTimeout(timeoutRef.current);
    soundRef.current?.stop();
    onDone?.();
  }

  useEffect(() => {
    // 1) Play sound
    soundRef.current = new Howl({
      src: ['/gomen.mp3'],
      volume: soundVolume,
    });
    soundRef.current.play();

    // 2) Trigger the CSS animation on next frame
    requestAnimationFrame(() => setAnimate(true));

    // 3) Clean up after duration
    timeoutRef.current = setTimeout(() => {
      onDone?.();
    }, duration);

    return () => {
      clearTimeout(timeoutRef.current);
      soundRef.current?.stop();
    };
  }, []);

  // Styles
  const overlayStyle = {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.6)',
    pointerEvents: 'auto',
    cursor: 'pointer',
    zIndex: 9999,
  };
  const shineStyle = {
    position: 'absolute',
    top: 0, left: 0,
    width: '100vw',
    height: '130vh',
    pointerEvents: 'none',
    zIndex: 9999,
    
    background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(255,255,255,0.7), transparent 80%)',
    clipPath: 'polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)',
    filter: 'blur(30px)',

    opacity: animate ? 1 : 0,
    transition: `opacity ${duration/3}ms ease-out ${duration/3}ms`,
  };
  const imgBase = {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,   // adjust to your Gojo image size
    height: 'auto',
    transition: `top ${duration}ms ease-out`,
  };
  const imgStyle = {
    ...imgBase,
    top: animate ? '50%' : '120%',
  };

  return (
    <div style={overlayStyle} onClick={handleClick}>
      <div style={shineStyle} />
      <img
        src="/gojo_levitating.png"
        alt="Gojo Levitate"
        style={imgStyle}
      />
    </div>
  );
}

