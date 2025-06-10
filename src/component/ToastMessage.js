import { useEffect, useState } from "react";
// CSS included below

export default function ToastMessage({ message, duration = 3000, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timeout = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onClose();
      }, 300); // Delay unmounting until fade-out finishes
    }, duration);
    return () => clearTimeout(timeout);
  }, [duration, onClose]);

  return (
    <div className={`toast-message ${visible ? "show" : "hide"}`}>
      {message}
    </div>
  );
}
