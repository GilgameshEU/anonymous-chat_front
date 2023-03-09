import { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import ChatPage from "./components/ChatPage";
import { useStyles, theme } from "../src/components/styles";
import { ThemeProvider } from "@mui/material";
function App() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = (username) => {
    setUsername(username);
    localStorage.setItem("username", username);
  };

  const handleLogout = () => {
    setUsername(null);
    localStorage.removeItem("username");
  };

  return (
    <ThemeProvider theme={theme}>
      <div>{username ? <ChatPage username={username} onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} />}</div>;
    </ThemeProvider>
  );
}

export default App;
