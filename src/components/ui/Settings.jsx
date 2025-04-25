import React from "react";

export default function Settings({
  // Sound
  enableBlyaaat, setEnableBlyaaat,
  enableGetOut, setEnableGetOut,
  // Delete
  enableDeleteEmoji, setEnableDeleteEmoji,
  // Celebrate
  enableNyan, setEnableNyan,
  enableGojo, setEnableGojo,
  enableAnthonySmile, setEnableAnthonySmile,
  // Volume
  soundVolume, setSoundVolume,
  onClose
}) {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Settings</h2>

        {/* Delete Animations */}
        <section style={sectionStyle}>
          <h3>Delete Animations</h3>
          <label style={labelStyle}>
            <input
              type="checkbox"
              checked={enableDeleteEmoji}
              onChange={e => setEnableDeleteEmoji(e.target.checked)}
            />
            Emoji Disintegrate
          </label>
        </section>

        {/* Celebrate Animations */}
        <section style={sectionStyle}>
          <h3>Celebrate Animations</h3>
          <label style={labelStyle}>
            <input
              type="checkbox"
              checked={enableNyan}
              onChange={e => setEnableNyan(e.target.checked)}
            />
            Nyan Cat
          </label>
          <label style={labelStyle}>
            <input
              type="checkbox"
              checked={enableGojo}
              onChange={e => setEnableGojo(e.target.checked)}
            />
            Gojo Levitate
          </label>

          <label style={labelStyle}>
            <input
              type="checkbox"
              checked={enableAnthonySmile}
              onChange={e => setEnableAnthonySmile(e.target.checked)}
            />
            Anthony Mackie Smile
          </label>
        </section>

        {/* Sound Effects */}
        <section style={sectionStyle}>
          <h3>Sound Effects</h3>
          <label style={labelStyle}>
            <input
              type="checkbox"
              checked={enableBlyaaat}
              onChange={e => setEnableBlyaaat(e.target.checked)}
            />
            Blyaaat
          </label>
          <label style={labelStyle}>
            <input
              type="checkbox"
              checked={enableGetOut}
              onChange={e => setEnableGetOut(e.target.checked)}
            />
            Get Out!
          </label>
          <div style={{ margin: "1rem 0" }}>
            <label>
              Volume: {Math.round(soundVolume * 100)}%
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={soundVolume}
                onChange={e => setSoundVolume(parseFloat(e.target.value))}
                style={{ width: "100%" }}
              />
            </label>
          </div>
        </section>

        <button onClick={onClose} style={closeBtnStyle}>
          Close
        </button>
      </div>
    </div>
  );
}

// Styles (you can move to App.css if you prefer)
const overlayStyle = {
  position: "fixed", top: 0, left: 0,
  width: "100vw", height: "100vh",
  background: "rgba(0,0,0,0.5)",
  display: "flex", alignItems: "center", justifyContent: "center",
  zIndex: 100
};
const modalStyle = {
  background: "white", borderRadius: 12, padding: 20, width: 320, textAlign: "left"
};
const sectionStyle = { margin: "1rem 0" };
const labelStyle = { display: "block", margin: "0.5rem 0" };
const closeBtnStyle = {
  marginTop: 10, padding: "0.5rem 1rem",
  borderRadius: 6, background: "#ff77aa",
  color: "white", border: "none", cursor: "pointer"
};
