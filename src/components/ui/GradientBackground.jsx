import React from 'react';

export default function GradientBackground({ colors }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
        zIndex: -2,
        pointerEvents: 'none',
      }}
    />
  );
}