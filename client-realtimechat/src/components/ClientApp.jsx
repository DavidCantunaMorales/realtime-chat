import { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isUserJoined, setIsUserJoined] = useState(false);

  const stompClient = useRef(null);

  // Conectar al WebSocket
  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws'); // Cambia la URL si es diferente
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('Conectado');
        setIsConnected(true);

        // Suscribirse al canal de mensajes públicos
        client.subscribe('/topic/public', (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
      },
      onDisconnect: () => {
        console.log('Desconectado');
        setIsConnected(false);
      },
    });

    client.activate();
    stompClient.current = client;

    return () => {
      client.deactivate();
    };
  }, []);

  // Enviar mensaje al servidor
  const sendMessage = () => {
    if (stompClient.current && newMessage.trim() !== '') {
      const message = {
        sender: username,
        content: newMessage,
        type: 'CHAT',
      };

      stompClient.current.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify(message),
      });

      setNewMessage('');
    }
  };

  // Unirse al chat
  const joinChat = () => {
    if (stompClient.current && username.trim() !== '') {
      const joinMessage = {
        sender: username,
        type: 'JOIN',
        content: '', // No es necesario un contenido adicional
      };

      stompClient.current.publish({
        destination: '/app/chat.addUser',
        body: JSON.stringify(joinMessage),
      });

      setIsUserJoined(true);
    }
  };

  // Manejar desconexión
  const leaveChat = () => {
    if (stompClient.current && username.trim() !== '') {
      const leaveMessage = {
        sender: username,
        type: 'LEAVE',
        content: '', // Mensaje vacío
      };

      stompClient.current.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify(leaveMessage),
      });

      setIsUserJoined(false);
      setUsername('');
      setMessages([]);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Chat en Tiempo Real</h1>
      {!isConnected && <p>Conectando al servidor...</p>}
      {isConnected && !isUserJoined && (
        <div>
          <form action=''>
            <input
              type='text'
              placeholder='Escribe tu nombre'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              onClick={joinChat}
              disabled={!username.trim()}
            >
              Unirse al chat
            </button>
          </form>
        </div>
      )}
      {isUserJoined && (
        <div>
          <div
            style={{
              marginBottom: '20px',
              border: '1px solid #ddd',
              padding: '10px',
              height: '300px',
              overflowY: 'scroll',
            }}
          >
            {messages.map((msg, index) => (
              <div key={index}>
                {msg.type === 'JOIN' && <em>{msg.sender} se unió al chat</em>}
                {msg.type === 'LEAVE' && <em>{msg.sender} salió del chat</em>}
                {msg.type === 'CHAT' && (
                  <>
                    <strong>{msg.sender}</strong>: {msg.content}
                  </>
                )}
              </div>
            ))}
          </div>
          <input
            type='text'
            placeholder='Escribe un mensaje'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Enviar</button>
          <button
            onClick={leaveChat}
            style={{ marginLeft: '10px' }}
          >
            Salir del chat
          </button>
        </div>
      )}
    </div>
  );
};
