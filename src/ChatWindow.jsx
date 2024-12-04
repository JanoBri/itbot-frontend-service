import { useState, useEffect, useRef } from 'react';
import { Button } from './components/ui/button'; 
import { Avatar } from './components/ui/avatar'; 
import { Card } from './components/ui/card'; 
import { Input } from './components/ui/input'; 

const ChatWindow = ({ messages, onSendMessage }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Automatisches Scrollen zum Ende der Nachrichtenliste
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() !== '') {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <Card className="flex-1 flex flex-col">
            <div className="p-4 flex-1 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start mb-4 ${
              message.sender === 'User' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.sender !== 'User' && (
              <Avatar className="mr-2">B</Avatar>
            )}
            <div
              className={`p-2 rounded-lg max-w-xs ${
                message.sender === 'User'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {message.content}
            </div>
            {message.sender === 'User' && (
              <Avatar className="ml-2">U</Avatar>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 flex">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nachricht eingeben..."
          className="flex-grow mr-2"
        />
        <Button onClick={handleSend}>Senden</Button>
      </div>
    </Card>
  );
};

export default ChatWindow;

