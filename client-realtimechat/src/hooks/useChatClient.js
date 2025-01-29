import { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { WS_URL, TOPIC_PUBLIC, DESTINATIONS } from '../utils/constants';

export const useChatClient = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isUserJoined, setIsUserJoined] = useState(false);

  const stompClient = useRef(null);

  useEffect(() => {
    const socket = new SockJS(WS_URL);
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('Conectado');
        setIsConnected(true);

        client.subscribe(TOPIC_PUBLIC, (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, receivedMessage]);
        });
      },
      onDisconnect: () => {
        console.log('Desconectado');
        setIsConnected(false);
      },
    });

    client.activate();
    stompClient.current = client;

    return () => client.deactivate();
  }, []);

  const joinChat = (event) => {
    event.preventDefault();
    if (username.trim() && stompClient.current) {
      stompClient.current.publish({
        destination: DESTINATIONS.ADD_USER,
        body: JSON.stringify({ sender: username, type: 'JOIN', content: '' }),
      });
      setIsUserJoined(true);
    }
  };

  const sendMessage = (message) => {
    if (message.trim() && stompClient.current) {
      stompClient.current.publish({
        destination: DESTINATIONS.SEND_MESSAGE,
        body: JSON.stringify({ sender: username, content: message, type: 'CHAT' }),
      });
    }
  };

  const leaveChat = () => {
    if (username.trim() && stompClient.current) {
      stompClient.current.publish({
        destination: DESTINATIONS.SEND_MESSAGE,
        body: JSON.stringify({ sender: username, type: 'LEAVE', content: '' }),
      });
      setIsUserJoined(false);
      setUsername('');
      setMessages([]);
    }
  };

  return {
    isConnected,
    isUserJoined,
    messages,
    username,
    joinChat,
    sendMessage,
    leaveChat,
    setUsername,
  };
};
