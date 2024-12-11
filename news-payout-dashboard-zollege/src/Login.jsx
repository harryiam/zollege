import React, { useState } from "react";
import { auth, googleProvider } from "./firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const Login = ({ onLogin }) => { // Add onLogin prop here
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem("user", JSON.stringify(user));
      alert("Login successful!");
      onLogin(user); // Notify parent of successful login
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      localStorage.setItem("user", JSON.stringify(user));
      alert("Google login successful!");
      onLogin(user); // Notify parent of successful login
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, border: "1px solid gray", borderRadius: "10px" }}>
        <Typography variant="h5" mb={2}>
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleGoogleLogin}
        >
          Login with Google
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
