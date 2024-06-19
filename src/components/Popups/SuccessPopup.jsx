import React, { useEffect } from 'react';
import './SuccessPopup.css';

const SuccessPopup = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="success-popup">
      {message}
    </div>
  );
};

export default SuccessPopup;
