import React, { useEffect } from "react";
import { sounds } from "../../modules/utils/sound";

export default function AnthonySmileView({ onDone, duration = 2000, soundVolume }) {
  useEffect(() => {
    // Slightly delay the vine boom sound
    const soundTimer = setTimeout(() => {
      if (sounds.vineboom) {
        sounds.vineboom.volume(soundVolume); // Set the volume dynamically
        sounds.vineboom.play();
      }
    }, 100); // 200ms delay

    const timer = setTimeout(() => {
      onDone();
    }, duration);

    return () => {
      clearTimeout(soundTimer);
      clearTimeout(timer);
    }
  }, [onDone, duration, soundVolume]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        cursor: "pointer"
      }}
      onClick={onDone}
    >
      <img
        src="/anthony_smile.gif"
        alt="Anthony smiling"
        style={{
          maxWidth: "80vw",
          maxHeight: "80vh",
          borderRadius: 16,
          boxShadow: "0 0 20px rgba(255,255,255,0.8)"
        }}
      />
    </div>
  );
}

