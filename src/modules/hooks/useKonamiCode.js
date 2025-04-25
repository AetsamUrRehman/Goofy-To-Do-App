import { useEffect, useState } from "react";

const SEQ = [
  "ArrowUp","ArrowUp",
  "ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight",
  "ArrowLeft","ArrowRight",
  "KeyB","KeyA"
];

export default function useKonamiCode(onUnlock) {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    let idx = 0;
    function handler(e) {
      if (e.code === SEQ[idx]) {
        idx += 1;
        if (idx === SEQ.length) {
          setUnlocked(true);
          onUnlock();
          window.removeEventListener("keydown", handler);
        }
      } else {
        idx = e.code === SEQ[0] ? 1 : 0;
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onUnlock]);

  return unlocked;
}
