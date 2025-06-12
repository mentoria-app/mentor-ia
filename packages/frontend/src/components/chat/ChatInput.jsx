import React, { useRef } from 'react';
import Button from '../common/Button';

// Constants
const INPUT_MIN_HEIGHT = 44;
const INPUT_MAX_HEIGHT = 128;
const BOTTOM_NAV_HEIGHT = 80;

const ChatInput = ({ 
  inputText, 
  setInputText, 
  onSendMessage, 
  isTyping,
  className = '' 
}) => {
  const textareaRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const handleTextAreaInput = (e) => {
    e.target.style.height = `${INPUT_MIN_HEIGHT}px`;
    e.target.style.height = Math.min(e.target.scrollHeight, INPUT_MAX_HEIGHT) + 'px';
  };

  const handleAttachmentClick = () => {
    // TODO: Implement file attachment functionality
    console.log('Attachment clicked');
  };

  const handleVoiceClick = () => {
    // TODO: Implement voice input functionality
    console.log('Voice input clicked');
  };

  return (
    <div 
      className={`fixed left-0 right-0 bg-white px-4 py-3 z-40 ${className}`}
      style={{ 
        bottom: `calc(${BOTTOM_NAV_HEIGHT}px + env(safe-area-inset-bottom, 0px))`
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end space-x-3">
          {/* Attachment Button */}
          <button
            onClick={handleAttachmentClick}
            className="flex-shrink-0 w-11 h-11 flex items-center justify-center transition-colors duration-200 hover:bg-gray-100 rounded-full"
            aria-label="Adjuntar archivo"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>

          {/* Input Container */}
          <div className="flex-1 bg-gray-50 rounded-3xl border border-gray-200 flex items-end overflow-hidden">
            <div className="flex-1 flex items-end">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                onInput={handleTextAreaInput}
                placeholder="Escribe tu mensaje..."
                className="w-full resize-none bg-transparent px-4 py-3 text-sm focus:outline-none max-h-32 overflow-hidden placeholder-gray-500"
                rows="1"
                style={{ height: `${INPUT_MIN_HEIGHT}px`, minHeight: `${INPUT_MIN_HEIGHT}px` }}
                aria-label="Escribe tu mensaje al mentor"
              />
            </div>

            {/* Microphone Button (only when no text) */}
            {!inputText.trim() && (
              <div className="flex-shrink-0 pr-3 flex items-center h-11">
                <button
                  onClick={handleVoiceClick}
                  className="w-8 h-8 flex items-center justify-center transition-colors duration-200 hover:bg-gray-200 rounded-full"
                  aria-label="Grabación de voz"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Send Button (separate, always visible but only enabled when text exists) */}
          <button
            onClick={onSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="flex-shrink-0 w-11 h-11 bg-primary hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 shadow-sm border-0"
            style={{ borderRadius: '50%' }}
            aria-label="Enviar mensaje"
          >
            <svg className="w-4 h-4 text-white transform rotate-45 translate-x-0.5 -translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput; 