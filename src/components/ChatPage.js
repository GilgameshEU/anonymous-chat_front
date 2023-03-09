import { useState, useEffect } from "react";
import { Typography, Button, Box, TextField, ThemeProvider, Grid, Paper, Snackbar, Alert } from "@mui/material";
import { Autocomplete } from "@mui/material/";
import { useStyles, theme } from "./styles";
import axios from "axios";

//export const API_URL = `http://localhost:5000`;
export const API_URL = `https://anonymous-chatback.gilgamesheu.repl.co`;

function ChatPage({ username, onLogout }) {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [msg, setMsg] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [receiver, setReceiver] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [users, setUsers] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newIncomingMessage, setNewIncomingMessage] = useState(null);
  const [prevMessagesLength, setPrevMessagesLength] = useState(0);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/getUsers`);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    getMessages(username);
    const interval = setInterval(() => {
      getMessages(username);
    }, 5000); // опрос сервера раз в 5 секунд
    return () => clearInterval(interval);
  }, [username, prevMessagesLength]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!receiver || !subject || !text) {
      setErrorOpen(true);
      setErrorMessage("Please fill all fields.");
      return;
    }
    try {
      await axios.post(`${API_URL}/sendMessage`, {
        subject: subject,
        text: text,
        sender: username,
        receiver: receiver.name || receiver,
      });
      setNewMessage(`${receiver.name || receiver}: ${subject}`);
      setSubject("");
      setText("");
      setReceiver(null);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  function getMessages(username) {
    axios
      .get(`${API_URL}/getMessages?recipient=${username}`)
      .then((response) => {
        const messages = response.data;
        setMessages(messages);
        if (messages.length > prevMessagesLength && expandedIndex === -1) {
          setNewIncomingMessage(`${messages[0].sender}: ${messages[0].subject}`);
        }
        setPrevMessagesLength(messages.length);
      })
      .catch((error) => {
        console.error("Error receiving messages:", error);
      });
  }

  const handleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Snackbar open={errorOpen} autoHideDuration={6000} onClose={() => setErrorOpen(false)}>
        <Alert onClose={() => setErrorOpen(false)} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Box className={classes.root}>
        <Snackbar open={!!newMessage} autoHideDuration={6000} onClose={() => setNewMessage("")}>
          <Alert
            onClose={() => {
              setNewMessage("");
            }}
            severity="success"
            sx={{ width: "100%" }}>
            {`Message sent: ${newMessage}`}
          </Alert>
        </Snackbar>
        <Snackbar open={!!newIncomingMessage} autoHideDuration={6000} onClose={() => setNewIncomingMessage("")}>
          <Alert onClose={() => setNewIncomingMessage("")} severity="success" sx={{ width: "100%" }}>
            {`Message receive: ${newIncomingMessage}`}
          </Alert>
        </Snackbar>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Paper className={classes.form}>
              <Typography variant="h6" className={classes.messageHeader}>
                New message
              </Typography>
              <Autocomplete
                key={newMessage}
                id="free-solo-demo"
                freeSolo
                options={Array.isArray(users) ? users : []} // Add a guard condition
                sx={{ width: "100%" }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} onChange={(e) => setReceiver(e.target.value)} label="Receiver" />}
                onChange={(event, value) => {
                  setReceiver(value);
                }}
              />
              <TextField fullWidth label="Subject" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className={classes.messageInput} />
              <TextField fullWidth label="Message" multiline rows={12} name="body" value={text} onChange={(e) => setText(e.target.value)} className={classes.messageInput} />
              <Button type="submit" variant="contained" color="primary" className={classes.sendButton} onClick={sendMessage}>
                Send
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Box className={classes.messagesBox}>
              <Typography variant="h6" className={classes.messageHeader}>
                My messages
              </Typography>
              {messages.map((message, index) => (
                <Paper key={index} className={classes.message}>
                  <Typography variant="h6" className={classes.messageHeader} onClick={() => handleExpand(index)}>
                    {message.subject}
                  </Typography>
                  {expandedIndex === index && <Typography variant="body1">{message.text}</Typography>}
                  <Typography variant="caption">
                    Sent {new Date(message.createdAt).toLocaleString()} from {message.sender}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.socialBox}>
              <Typography variant="h6" className={classes.username}>
                Welcome, {username}
              </Typography>
              <Button variant="contained" color="secondary" onClick={onLogout} className={classes.logoutButton}>
                Exit
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default ChatPage;
//1
