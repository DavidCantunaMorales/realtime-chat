import { Box, Typography, Avatar, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import { useEffect, useRef } from 'react';

export const ChatMessages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Detectar los mensajes nuevos de tipo JOIN o LEAVE y mostrar notificaciones
    const lastMessage = messages[messages.length - 1];
    toast.dismiss();
    if (lastMessage) {
      if (lastMessage.type === 'JOIN') {
        toast.info(`${lastMessage.sender} se unió al chat`, {
          position: 'top-right',
          autoClose: 1000,
        });
      } else if (lastMessage.type === 'LEAVE') {
        toast.error(`${lastMessage.sender} salió del chat`, {
          position: 'top-right',
          autoClose: 1000,
        });
      }
    }
  }, [messages]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 2,
        maxHeight: '75vh',
        overflowY: 'auto',
      }}
    >
      {messages.map((msg, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: msg.type === 'JOIN' || msg.type === 'LEAVE' ? 'column' : 'row',
            alignItems: msg.type === 'JOIN' || msg.type === 'LEAVE' ? 'center' : 'flex-start',
            gap: 1,
          }}
        >
          {msg.type === 'CHAT' && (
            <>
              {/* Avatar del usuario */}
              <Avatar
                alt={msg.sender}
                src={msg.avatar || `https://robohash.org/${msg.sender}.png`}
                sx={{ width: 40, height: 40 }}
              />

              {/* Contenedor del mensaje */}
              <Paper
                elevation={3}
                sx={{
                  padding: 1.5,
                  borderRadius: 3,
                  backgroundColor: '#1c1c29',
                  color: '#e0e0e0',
                  maxWidth: '75%',
                }}
              >
                {/* Nombre del remitente */}
                <Typography
                  variant='subtitle2'
                  sx={{
                    color: '#4fc3f7',
                    fontWeight: 'bold',
                  }}
                >
                  {msg.sender}
                </Typography>

                {/* Contenido del mensaje */}
                <Typography
                  variant='body1'
                  sx={{ wordBreak: 'break-word' }}
                >
                  {msg.content}
                </Typography>

                {/* Hora del mensaje */}
                <Typography
                  variant='caption'
                  sx={{
                    color: '#9e9e9e',
                    textAlign: 'right',
                    display: 'block',
                    marginTop: 0.5,
                  }}
                >
                  {msg.time}
                </Typography>
              </Paper>
            </>
          )}
        </Box>
      ))}
      <div ref={messagesEndRef}></div>
    </Box>
  );
};
