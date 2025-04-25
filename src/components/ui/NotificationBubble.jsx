import React from "react";

export default function NotificationBubble({ visible, message }) {
  if (!visible) return null;
  return (
    <div style={{
      position: "fixed",
      bottom: 40,
      left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(0,0,0,0.75)",
      color: "white",
      padding: "0.5rem 1rem",
      borderRadius: 8,
      fontSize: "0.9rem",
      zIndex: 20,
      pointerEvents: "none"
    }}>
      {message}
    </div>
  );
}
