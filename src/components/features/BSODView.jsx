import React, { useEffect, useRef } from 'react';
import { Howl } from 'howler';

export default function BSODView({
  duration = 6000,   // auto-dismiss after 7s
  onDone,            // callback to hide
}) {
  const soundRef = useRef(null);
  const timerRef = useRef();

  // Enter fullscreen on mount
  useEffect(() => {
    const el = document.documentElement;
    const reqFs =
      el.requestFullscreen ||
      el.webkitRequestFullscreen ||
      el.msRequestFullscreen;
    if (reqFs) reqFs.call(el).catch(() => {});

    // Exit fullscreen on unmount
    return () => {
      const exitFs =
        document.exitFullscreen ||
        document.webkitExitFullscreen ||
        document.msExitFullscreen;
      if (exitFs && document.fullscreenElement) {
        exitFs.call(document).catch(() => {});
      }
    };
  }, []);

  // Play beep and schedule auto-dismiss
  useEffect(() => {
    soundRef.current = new Howl({
      src: ['/bsod_beep.mp3'],
      volume: 1.0,
    });
    soundRef.current.play();

    timerRef.current = setTimeout(handleDone, duration);

    return () => {
      clearTimeout(timerRef.current);
      soundRef.current.stop();
    };
  }, [duration]);

  // Exit fullscreen & fire onDone
  function handleDone() {
    const exitFs =
      document.exitFullscreen ||
      document.webkitExitFullscreen ||
      document.msExitFullscreen;
    if (exitFs && document.fullscreenElement) {
      exitFs.call(document).catch(() => {}).finally(onDone);
    } else {
      onDone();
    }
  }

  return (
    <div
      onClick={handleDone}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0078D7',
        cursor: 'pointer',
        zIndex: 99999,
      }}
    >
      <img
        src="/bsod_full.png"
        alt="Blue Screen of Death"
        style={{
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}




