import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0e2769",
    },
    secondary: {
      main: "#f44336",
    },
  },
  spacing: 8,
});

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#1c2336",
  },

  card: {
    width: "400px",
    padding: "32px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
  },
  submitButton: {
    marginTop: "32px",
    width: "100%",
  },
  textField: { width: "100%" },
  button: {
    marginTop: theme.spacing(2),
  },
  username: {
    marginRight: theme.spacing(2),
    color: "#000",
  },
  form: {
    width: "100%",
    maxWidth: 600,
    // padding: theme.spacing(4),
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: "16px",
  },
  messageInput: {
    marginBottom: theme.spacing(2),
  },
  sendButton: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  socialBox: {
    backgroundColor: "#fff",
    padding: theme.spacing(2),
    borderRadius: 4,
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    position: "absolute",
    top: 0,
    right: 0,
  },
  logoutButton: {
    marginLeft: theme.spacing(2),
    width: "100%",
  },
  messagesBox: {
    maxHeight: "60vh",
    overflowY: "auto",
    marginTop: "16px",
    padding: "16px",
    backgroundColor: "#fff",
    borderRadius: "4px",
  },
  message: {
    marginBottom: "16px",
    padding: "16px",
    backgroundColor: "#f1f1f1",
    borderRadius: "4px",
  },
  messageHeader: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
}));
