import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { ThemeContext } from "./ThemeContext";
import { CssBaseline, Button, Box } from "@mui/material";
import { auth } from "./firebaseConfig";

// ProtectedRoute Component
const ProtectedRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/" replace />;
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check localStorage for user data on page load
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

  const { toggleTheme } = useContext(ThemeContext);

  return (
    <Router>
      <CssBaseline />
      <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={toggleTheme}>
          Toggle Theme
        </Button>
      </Box>

      {/* Render Routes after user data is loaded */}
      {user !== null ? (
        <AppRoutes user={user} setUser={setUser} handleLogout={handleLogout} />
      ) : (
        // Show a loading state or nothing until the user is loaded from localStorage
        <div>Loading...</div>
      )}
    </Router>
  );
}

// Separate AppRoutes as its own component
const AppRoutes = ({ user, setUser, handleLogout }) => {
  const navigate = useNavigate(); // Valid usage of useNavigate here

  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/dashboard"); // Navigate programmatically
  };

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={handleLogin} />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute user={user}>
            <Dashboard user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
