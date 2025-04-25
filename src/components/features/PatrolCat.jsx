// src/components/features/PatrolCat.jsx
import React, { useState, useRef, useEffect } from "react";

export default function PatrolCat({
  margin = 20,
  duration = 4000,
  panelBounds, // { right: number, bottom: number }
  floorOffset = 0
}) {
  const [walking, setWalking] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (!walking) {
      img.style.transform = "";
      return;
    }

    // Dimensions
    const w         = img.offsetWidth;
    const h         = img.offsetHeight;
    const winW      = window.innerWidth;
    const threshold = window.innerHeight - h + floorOffset;
    const { right: panelR, bottom: panelB } = panelBounds;

    // Decide bounce-point: panel edge vs. screen edge
    const distance = panelB >= threshold
      ? winW - panelR - w + 95   // bounce off panel's right edge
      : winW - w + 120;          // bounce off screen edge

    let startTime = null;

    function walkOut(ts) {
      if (!startTime) startTime = ts;
      const t = Math.min((ts - startTime) / duration, 1);
      img.style.transform = `translateX(${-distance * t}px) scaleX(-1)`;
      if (t < 1) requestAnimationFrame(walkOut);
      else {
        startTime = null;
        requestAnimationFrame(walkBack);
      }
    }

    function walkBack(ts) {
      if (!startTime) startTime = ts;
      const t = Math.min((ts - startTime) / duration, 1);
      img.style.transform = `translateX(${-distance * (1 - t)}px) scaleX(1)`;
      if (t < 1) requestAnimationFrame(walkBack);
      else setWalking(false);
    }

    requestAnimationFrame(walkOut);
  }, [walking]);

  return (
    <img
      ref={imgRef}
      src={walking ? "/black_cat.gif" : "/black_cat_idle.gif"}
      alt="Goofy Cat"
      onClick={() => { if (!walking) setWalking(true); }}
      style={{
        position: "fixed",
        bottom: -53,
        right: -75,
        height: 180,
        width: "auto",
        cursor: walking ? "default" : "pointer",
        zIndex: 20,
        willChange: walking ? "transform" : "auto"
      }}
    />
  );
}



