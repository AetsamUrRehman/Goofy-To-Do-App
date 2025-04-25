import React from 'react';

export default function IconButton({ icon, onClick, active, style, ...props }) {
  return (
    <button
      onClick={onClick}
      onMouseDown={e => e.preventDefault()} // prevent focus on button
      onMouseUp={e => e.currentTarget.blur()}     // remove focus after click
      style={{
        border: active ? "2px solid #000000" : 'none',
        borderRadius: active ? 4 : 0,
        cursor: 'pointer',
        color: active ? "#f0e130" : 'inherit',

        outline: 'none',
        boxShadow: 'none',
        background: 'transparent',

        // Force box‐model to include border in size
        boxSizing: "border-box",

        // Base sizing & centering
        display:      "flex",
        alignItems:   "center",
        justifyContent: "center",
        width:        32,
        height:       32,
        padding:      0,       // no extra padding
        fontSize:     24,
        cursor:       "pointer",

        ...style
      }}
      {...props}
    >
      {icon}
    </button>
  );
}
