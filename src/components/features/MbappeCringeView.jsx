import React, { useEffect, useRef } from 'react';

export default function MbappeCringeView({
  onDone       // callback to hide the video
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {});
    }
  }, []);

  const handleClick = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
    onDone?.();
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        cursor: 'pointer'
      }}
    >
      <video
        ref={videoRef}
        src="/mbappe_cringe.mp4"
        style={{
          maxWidth: '80vw',
          maxHeight: '80vh',
          objectFit: 'contain',
          boxShadow: '0 0 20px rgba(0,0,0,0.5)'
        }}
        // no controls: click anywhere to dismiss
      />
    </div>
  );
}
