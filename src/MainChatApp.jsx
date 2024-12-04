import { useState, useEffect } from 'react';
import axios from 'axios';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';

const MainChatApp = () => {
  const userId = 1; // Annahme: Benutzer-ID ist bekannt
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);

  // Laden der Chats beim Mounten
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`http://localhost:80/chat/${userId}`);
        console.log(response)
        setChats(response.data);
        if (response.data.length > 0) {
          setCurrentChatId(response.data[0].id);
        }
      } catch (error) {
        console.error('Fehler beim Laden der Chats:', error);
      }
    };

    fetchChats();
  }, [userId]);

  // Laden der Nachrichten, wenn sich der aktuelle Chat ändert
  useEffect(() => {
    const fetchMessages = async () => {
      if (currentChatId) {
        try {
          const response = await axios.get(
            `http://localhost:80/chat/${currentChatId}/messages`
          );
          console.log(response)
          setMessages(response.data);
        } catch (error) {
          console.error('Fehler beim Laden der Nachrichten:', error);
        }
      }
    };

    fetchMessages();
  }, [currentChatId]);

  const handleSelectChat = (chatId) => {
    setCurrentChatId(chatId);
  };

  const handleSendMessage = async (messageText) => {
    if (!currentChatId) return;

    const newMessage = {
      content: messageText,
      sender: 'User',
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const response = await axios.post(
        `http://localhost:80/chat/${currentChatId}/messages`,
        newMessage,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log(response)
      const botResponse = {
        content: response.data.botResponse.content,
        sender: response.data.botResponse.sender,
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Fehler beim Senden der Nachricht:', error);
    }
  };

  const handleNewChat = async () => {
    const newChat = {
      title: 'Neuer Chat',
      userid: userId,
      messages: [{content: "New Chat funktioniert noch nicht xD",
        sender: 'User'}],
    };

    try {
      const response = await axios.post('http://localhost:80/chat', newChat, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response)
      const createdChat = response.data;

      setChats((prevChats) => [...prevChats, {createdChat}]);
      setCurrentChatId(createdChat.id);
      setMessages(createdChat.messages);
    } catch (error) {
      console.error('Fehler beim Erstellen eines neuen Chats:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <ChatSidebar
        chats={chats}
        currentChatId={currentChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
      />
      <ChatWindow
        messages={messages}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default MainChatApp;
