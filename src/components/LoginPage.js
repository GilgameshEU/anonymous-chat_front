import { useState } from "react";
import { Typography, Button, Box, TextField, ThemeProvider } from "@mui/material";
import { useStyles, theme } from "./styles";
import axios from "axios";
import { API_URL } from "./ChatPage";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const classes = useStyles();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Добавляем нового пользователя
      createUser(username);
      // Вызываем функцию onLogin, передавая имя пользователя
      onLogin(username);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const createUser = async (name) => {
    try {
      const response = await axios.post(`${API_URL}/addUser`, { name });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
        <Box className={classes.card}>
          <Typography variant="h4" className={classes.title}>
            Enter your name
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField className={classes.textField} label="Username" value={username} onChange={handleChange} margin="normal" required />
            <Button className={classes.submitButton} variant="contained" color="primary" type="submit">
              Enter
            </Button>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default LoginPage;
