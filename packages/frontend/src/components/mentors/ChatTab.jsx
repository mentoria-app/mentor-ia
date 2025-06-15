import React from 'react';
import { ChatInterface } from '../chat';

const ChatTab = ({ mentor }) => {
  return (
    <div className="h-full">
      <ChatInterface mentor={mentor} />
    </div>
  );
};

export default ChatTab; 