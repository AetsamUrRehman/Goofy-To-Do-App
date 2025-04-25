import React, { useEffect } from "react";

export default function EmojiDisintegrateView({
  onDone,
  duration = 2000 // default to 2s; adjust to match your GIF’s length
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDone();
    }, duration);

    return () => clearTimeout(timer);
  }, [onDone, duration]);

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0,
        width: "100vw", height: "100vh",
        background: "rgba(0,0,0,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 50
      }}
    >
      <img
        src="/vanishing_emoji.gif"
        alt="Emoji Disintegrating"
        style={{ width: 321, height: 300 }}
      />
    </div>
  );
}