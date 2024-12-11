// // import React, { useState, useEffect } from "react";
// // import Login from "./Login";
// // import Dashboard from "./Dashboard";
// // import { auth } from "./firebaseConfig";

// // function App() {
// //   const [user, setUser] = useState(null);

// //   // Check for an authenticated user on component mount
// //   useEffect(() => {
// //     const loggedInUser = localStorage.getItem("user");
// //     if (loggedInUser) {
// //       setUser(JSON.parse(loggedInUser));
// //     }
// //   }, []);

// //   const handleLogout = () => {
// //     auth.signOut();
// //     localStorage.removeItem("user");
// //     setUser(null);
// //   };

// //   return (
// //     <div className="App">
// //       {user ? (
// //         <Dashboard user={user} onLogout={handleLogout} />
// //       ) : (
// //         <Login onLogin={setUser} />
// //       )}
// //     </div>
// //   );
// // }

// // export default App;
// import React, { useContext } from "react";
// import Login from "./Login";
// import Dashboard from "./Dashboard";
// import ThemeContextProvider, { ThemeContext } from "./ThemeContext";
// import { CssBaseline, Button, Box } from "@mui/material";
// import { auth } from "./firebaseConfig";

// function App() {
//   const [user, setUser] = React.useState(null);

//   React.useEffect(() => {
//     const loggedInUser = localStorage.getItem("user");
//     if (loggedInUser) {
//       setUser(JSON.parse(loggedInUser));
//     }
//   }, []);

//   const handleLogout = () => {
//     auth.signOut();
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   // Get dark mode toggle function from context
//   const { toggleTheme } = useContext(ThemeContext);

//   return (
//     <ThemeContextProvider>
//       <CssBaseline />
//       <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
//         <Button variant="outlined" onClick={toggleTheme}>
//           Toggle Theme
//         </Button>
//       </Box>
//       {user ? (
//         <Dashboard user={user} onLogout={handleLogout} />
//       ) : (
//         <Login onLogin={setUser} />
//       )}
//     </ThemeContextProvider>
//   );
// }

// export default App;


import React, { useContext } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { ThemeContext } from "./ThemeContext"; // Import ThemeContext
import { CssBaseline, Button, Box } from "@mui/material";
import { auth } from "./firebaseConfig";

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
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
    <>
      <CssBaseline />
      <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={toggleTheme}>
          Toggle Theme
        </Button>
      </Box>
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={setUser} />
      )}
    </>
  );
}

export default App;
