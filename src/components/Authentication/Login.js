import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the fields",
        type: "error",
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Sign In Successful. Welcome ${result.user.email}`,
        type: "success",
      });
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        sx={{
          backgroundColor: "#EEBC1D",
          "&:hover": {
            backgroundColor: "#d4a017",
          },
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
