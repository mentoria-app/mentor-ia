import React, { useState, useRef, useEffect } from 'react';
import Button from '../common/Button';

const INITIAL_MESSAGE = {
  id: 1,
  type: 'mentor',
  content: '¡Hola! Soy tu mentor de IA. Puedo ayudarte con cualquier pregunta sobre tus materiales de estudio. ¿En qué puedo ayudarte hoy?',
  timestamp: new Date(Date.now() - 60000),
};

const MOCK_RESPONSES = [
  {
    content: 'Según el documento "Capítulo 3: Revolución Francesa.pdf", la Revolución Francesa comenzó en 1789 debido a varios factores incluyendo la crisis económica y social.',
    citation: 'Fuente: Capítulo 3: Revolución Francesa.pdf, página 45'
  },
  {
    content: 'Basándome en tus notas de "Biología Celular - Clase 5.pdf", las mitocondrias son conocidas como las "centrales energéticas" de la célula porque producen ATP.',
    citation: 'Fuente: Biología Celular - Clase 5.pdf, página 12'
  },
  {
    content: 'De acuerdo a tu material "Matemáticas Avanzadas.pdf", la derivada de una función representa la tasa de cambio instantánea en un punto específico.',
    citation: 'Fuente: Matemáticas Avanzadas.pdf, página 78'
  },
  {
    content: 'Según el video "Química Orgánica - Parte 2" que subiste, los compuestos orgánicos se caracterizan por contener carbono como elemento principal.',
    citation: 'Fuente: Video - Química Orgánica - Parte 2, minuto 3:45'
  }
];

const ChatInterface = ({ className = '' }) => {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateMentorResponse = () => {
    const randomResponse = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
    return {
      id: Date.now(),
      type: 'mentor',
      content: randomResponse.content,
      citation: randomResponse.citation,
      timestamp: new Date(),
    };
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const mentorResponse = generateMentorResponse();
      setMessages(prev => [...prev, mentorResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleTextAreaInput = (e) => {
    e.target.style.height = '44px';
    e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
  };

  return (
    <div className={`fixed inset-0 flex flex-col bg-gray-50 ${className}`} style={{ top: '200px', bottom: '68px' }}>
      <div className="flex-1 overflow-y-auto scroll-smooth">
        <div className="px-4 py-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] md:max-w-[70%] px-4 py-3 transition-all duration-200 hover:shadow-lg ${
                  message.type === 'user'
                    ? 'bg-primary text-white rounded-3xl rounded-br-lg shadow-md'
                    : 'bg-white border border-gray-100 text-text-primary rounded-3xl rounded-bl-lg shadow-sm'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
                
                {message.type === 'mentor' && message.citation && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-start space-x-2">
                      <span className="text-gray-400 text-xs mt-0.5">📄</span>
                      <p className="text-xs text-text-secondary italic leading-relaxed">
                        {message.citation}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className={`text-xs mt-2 ${
                  message.type === 'user' ? 'text-white/70 text-right' : 'text-text-secondary'
                }`}>
                  {formatTimestamp(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white border border-gray-100 rounded-3xl rounded-bl-lg px-4 py-3 shadow-sm max-w-[85%] sm:max-w-[75%] md:max-w-[70%]">
                <div className="flex space-x-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <div 
                      key={i}
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex space-x-3 items-end max-w-4xl mx-auto">
          <div className="flex-1 flex items-end">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              onInput={handleTextAreaInput}
              placeholder="Escribe tu pregunta..."
              className="w-full resize-none border border-gray-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 max-h-32 overflow-hidden shadow-sm"
              rows="1"
              style={{ height: '44px', minHeight: '44px' }}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="rounded-2xl flex items-center justify-center p-0 bg-primary hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md border border-primary hover:border-primary-600 disabled:border-gray-300 flex-shrink-0"
            style={{ width: '44px', height: '44px', minHeight: '44px' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;