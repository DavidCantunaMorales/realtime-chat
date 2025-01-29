import { Button, TextField, Box } from '@mui/material';
import { useState } from 'react';

export const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = (event) => {
    event.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <Box
      component='form'
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        padding: 1,
        backgroundColor: '#2F2F2F', // Fondo oscuro para la entrada
        borderRadius: 2,
      }}
      onSubmit={handleSend}
    >
      <TextField
        type='text'
        placeholder='Escribe un mensaje'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
        slotProps={{
          input: {
            sx: {
              color: 'white', // Color del texto del input
            },
          },
        }}
      />
      <Button
        type='submit'
        variant='contained'
        color='secondary'
        sx={{
          backgroundColor: '#e040fb',
          '&:hover': {
            backgroundColor: '#d500f9', // Efecto hover morado más brillante
          },
        }}
      >
        Enviar
      </Button>
    </Box>
  );
};
