// import React, { createContext, useState, useMemo } from "react";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

// export const ThemeContext = createContext();

// const ThemeContextProvider = ({ children }) => {
//   const [darkMode, setDarkMode] = useState(false); // State to manage dark mode

//   // Toggle between light and dark themes
//   const toggleTheme = () => setDarkMode((prevMode) => !prevMode);

//   // Define the theme dynamically
//   const theme = useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode: darkMode ? "dark" : "light",
//         },
//       }),
//     [darkMode]
//   );

//   return (
//     <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
//       <ThemeProvider theme={theme}>{children}</ThemeProvider>
//     </ThemeContext.Provider>
//   );
// };

// export default ThemeContextProvider;

import React, { createContext, useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Create the context
export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle between light and dark themes
  const toggleTheme = () => setDarkMode((prevMode) => !prevMode);

  // Define the theme dynamically
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

