import React from 'react';

const Modal = ({ isOpen, children, onClose, ...props }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 max-h-screen overflow-y-auto"
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal; 