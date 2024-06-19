import React, { useEffect } from 'react';
import './FailedPopup.css';

const FailedPopup = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="failed-popup">
      {message}
    </div>
  );
};

export default FailedPopup;
