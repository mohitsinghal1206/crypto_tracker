import { Snackbar, Alert as MuiAlert } from "@mui/material";
import { CryptoState } from "../CryptoContext";

const Alert = () => {
  const { alert, setAlert } = CryptoState();

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleCloseAlert}
      anchorOrigin={{ vertical: "top", horizontal: "center" }} // Adjust position if needed
    >
      <MuiAlert
        onClose={handleCloseAlert}
        elevation={10}
        variant="filled"
        severity={alert.type}
        sx={{ width: "100%" }} // Optional for better styling
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
