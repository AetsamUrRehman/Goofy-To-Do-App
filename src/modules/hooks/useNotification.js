import { useState, useEffect } from "react";

export default function useNotification(duration = 3000) {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  function notify(msg) {
    setMessage(msg);
    setVisible(true);
  }

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration]);

  return { message, visible, notify };
}
