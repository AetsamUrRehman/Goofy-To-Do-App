import React, { useEffect } from "react";
import { sounds } from "../../modules/utils/sound";

export default function AnthonySmileView({ onDone, duration = 4000, soundVolume }) {
  useEffect(() => {
    if (sounds.nyansound) {
      sounds.nyansound.volume(soundVolume); // Set the volume dynamically
      sounds.nyansound.play();
    }

    const timer = setTimeout(() => {
      onDone();
    }, duration);

    return () => {
      if (sounds.nyansound) {
        sounds.nyansound.stop();
      }
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
        src="/nyan_cat.gif"
        alt="Nyan Cat"
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

