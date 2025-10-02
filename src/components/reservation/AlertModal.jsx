import React from 'react';
import './AlertModal.css';

function AlertModal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className="alert-modal-overlay" onClick={onClose}>
      <div className="alert-modal" onClick={e => e.stopPropagation()}>
        <div className="alert-header">
          <button className="alert-close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="alert-content">
          <p className="alert-message">{message}</p>
        </div>
        
        <div className="alert-footer">
          <button className="alert-confirm-btn" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertModal;
