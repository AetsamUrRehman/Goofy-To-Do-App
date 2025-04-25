import { useState, useEffect } from "react";

const STORAGE_KEY = "enableRainbowMode";

export default function useRainbowMode() {
  const [rainbowMode, setRainbowMode] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : false;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rainbowMode));
  }, [rainbowMode]);

  return [rainbowMode, setRainbowMode];
}
