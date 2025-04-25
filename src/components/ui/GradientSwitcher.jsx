import React from 'react';

const PRESETS = [
  { name: 'Default', colors: ['rgba(255,200,220,1)', 'rgba(200,220,255,1)'] },
  { name: 'Light Blue', colors: ['#c8e5ff', '#ffe5c8'] },
  { name: 'Light Green', colors: ['#c8ffc8', '#ffc8ff'] },
  { name: 'Light Red', colors: ['#ffc8c8', '#c8ffff'] },
  { name: 'Light Yellow', colors: ['#ffffc8', '#e5c8ff'] },
  { name: 'Dark Blue', colors: ['#002b6d', '#6d3f00'] },
  { name: 'Dark Green', colors: ['#004d00', '#660066'] },
  { name: 'Dark Red', colors: ['#660000', '#006666'] },
  { name: 'Dark Yellow', colors: ['#666600', '#660066'] },
];

export default function GradientSwitcher({ current, onChange, onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          padding: 20,
          textAlign: 'center',
          width: 300,
        }}
      >
        <h3>Pick a Background</h3>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            justifyContent: 'center',
          }}
        >
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => onChange(p.colors, p.name)}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                border:
                  p.colors[0] === current[0] && p.colors[1] === current[1]
                    ? '3px solid #333'
                    : '2px solid #ccc',
                background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})`,
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
        <button
          onClick={onClose}
          style={{
            marginTop: 15,
            padding: '0.5rem 1rem',
            background: '#ff77aa',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
