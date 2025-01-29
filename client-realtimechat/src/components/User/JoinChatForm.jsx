import { Button, Grid2, TextField, Typography } from '@mui/material';

export const JoinChatForm = ({ username, setUsername, joinChat }) => (
  <Grid2
    container
    direction='column'
    alignItems='center'
    justifyContent='center'
    sx={{
      height: '100vh',
      background: '#171717',
      color: 'white',
    }}
  >
    <Typography
      variant='h3'
      gutterBottom
      sx={{ fontWeight: 'bold', color: '#e0e0e0' }}
    >
      ¡Bienvenido!
    </Typography>

    <form
      onSubmit={joinChat}
      style={{ width: '100%', maxWidth: '400px' }}
    >
      <Grid2
        container
        direction='column'
        spacing={3}
        sx={{
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#e0e0e0',
        }}
      >
        <Grid2 item>
          <TextField
            type='text'
            label='Nombre'
            placeholder='Escribe tu nombre'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            helperText='Escribe tu nombre para unirte al chat'
            // slotProps={{
            //   inputLabel: {
            //     style: { color: '#e0e0e0' }, // Color del label más suave
            //   },
            //   input: {
            //     style: { color: 'white' }, // Color del texto de entrada
            //   },
            // }}
            // sx={{
            //   backgroundColor: '#1c1c29', // Fondo oscuro pero suave para los inputs
            //   '& .MuiOutlinedInput-root': {
            //     borderColor: '#555555', // Borde del campo de texto
            //   },
            //   '&:hover .MuiOutlinedInput-root': {
            //     borderColor: '#e040fb', // Borde morado al hacer hover
            //   },
            // }}
          />
        </Grid2>

        <Grid2 item>
          <Button
            type='submit'
            variant='contained'
            color='secondary'
            fullWidth
            disabled={!username.trim()}
          >
            Unirse al chat
          </Button>
        </Grid2>
      </Grid2>
    </form>
  </Grid2>
);
