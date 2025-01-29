import { Box, Button, Typography, Paper, Grid2 } from '@mui/material';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';

export const ChatBox = ({ messages, sendMessage, leaveChat, username }) => (
  <Box
    sx={{
      width: '100%',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      justifyContent: 'space-between',
      backgroundColor: '#171717', // Fondo oscuro como en la pantalla de ingreso
      color: 'white', // Texto blanco
      padding: 3,
    }}
  >
    <Grid2
      container
      justifyContent={'space-between'}
    >
      {/* Título del chat */}
      <Typography
        variant='h5'
        sx={{
          color: '#e0e0e0',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 2,
        }}
      >
        CHAT DEL GRUPO
      </Typography>
      <Button
        variant='contained'
        color='secondary'
        onClick={leaveChat}
        sx={{
          marginBottom: 2,
          backgroundColor: '#e040fb',
          '&:hover': {
            backgroundColor: '#d500f9', // Efecto hover morado más brillante
          },
        }}
      >
        Salir del chat
      </Button>
    </Grid2>
    {/* Área de mensajes */}
    <Paper
      sx={{
        flexGrow: 1,
        overflowY: 'auto',
        padding: 2,
        backgroundColor: '#212121', // Fondo oscuro suave para los mensajes
        color: 'white', // Texto blanco para los mensajes
        borderRadius: 2,
      }}
    >
      <ChatMessages
        messages={messages}
        username={username}
      />
    </Paper>

    {/* Entrada para mensajes */}
    <Box sx={{ marginTop: 2 }}>
      <ChatInput onSend={sendMessage} />
    </Box>
  </Box>
);
