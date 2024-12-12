import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"; // Import Router components
import Login from "./Login";
import Dashboard from "./Dashboard";
import { ThemeContext } from "./ThemeContext"; // Import ThemeContext
import { CssBaseline, Button, Box } from "@mui/material";
import { auth } from "./firebaseConfig";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    auth.signOut();
    localStorage.removeItem("user");
    setUser(null);
  };

  // Use the ThemeContext
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <Router>
      <CssBaseline />
      <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={toggleTheme}>
          Toggle Theme
        </Button>
      </Box>
      <Routes>
        <Route
          path="/"
          element={<Login onLogin={(user) => {
            setUser(user);
            window.location.href = "/dashboard";
          }} />}
        />
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard user={user} onLogout={handleLogout} />
            ) : (
              <Login onLogin={(user) => {
                setUser(user);
                window.location.href = "/dashboard";
              }} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
