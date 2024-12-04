import React from 'react';
import { Card } from './components/ui/card'; // Import shadCN-Komponenten
import { Button } from './components/ui/button'; // Import shadCN-Komponenten
import { ScrollArea } from './components/ui/scroll-area'; // Import shadCN-Komponenten

const ChatSidebar = ({ chats, currentChatId, onSelectChat, onNewChat }) => {
  return (
    <Card className="w-full h-screen max-w-xs flex flex-col">
      <div className="p-4 flex items-center justify-between">
        <span className="font-bold text-xl">Deine Chats</span>
        <Button size="sm" onClick={onNewChat}>
          Neuer Chat
        </Button>
      </div>
      <ScrollArea className="flex-1">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`p-4 cursor-pointer ${
              currentChatId === chat.id ? 'bg-gray-200' : ''
            }`}
          >
            {chat.title}
          </div>
        ))}
      </ScrollArea>
    </Card>
  );
};

export default ChatSidebar;
