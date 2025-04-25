import React from 'react';

export default function AppContainer({ bgGradientName, children }) {
  const bgColor = bgGradientName.startsWith('Dark')
    ? 'rgba(240,240,240,0.85)'
    : 'rgba(255,255,255,0.85)';

  return (
    <div className="app-container" style={{ backgroundColor: bgColor }}>
      {children}
    </div>
  );
}
