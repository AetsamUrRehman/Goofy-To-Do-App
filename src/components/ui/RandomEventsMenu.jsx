import React from "react";
import "./RandomEventsMenu.css";

export default function RandomEventsMenu({
  onClose,
  previewFruit,
  previewCloud,
  previewCookie,
}) {
  return (
    <div className="rem-overlay">
      <div className="rem-modal">
        <h2>Random Events</h2>
        <div className="rem-list">
          <button className="rem-button" onClick={previewFruit}>
            Fruit-Ninja Burst
          </button>
          <button className="rem-button" onClick={previewCloud}>
            Rain-Cloud Follower
          </button>
          <button className="rem-button" onClick={previewCookie}>
            Cookie-Clicker Pop-Up
          </button>
        </div>
        <button className="rem-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
