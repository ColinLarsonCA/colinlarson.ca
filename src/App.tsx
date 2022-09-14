import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "about";
import { Experiments, History, Home, Job } from "pages";
import { createTheme } from "@mui/material/styles";
import { indigo, orange } from "@mui/material/colors";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Photos } from "pages/Photos";

const PREFIX = 'App';
const classes = {
  root: `${PREFIX}-root`,
  content: `${PREFIX}-content`
};
const StyledApp = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.root}`]: {
    display: "flex",
  },

  [`& .${classes.content}`]: {
    flexGrow: 1,
    padding: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(20),
    },
  }
}));

function App() {
  const initialTheme = () =>
    localStorage.getItem("theme") === "light" ? "light" : "dark";
  const [theme, setTheme] = useState(initialTheme());
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  useEffect(() => localStorage.setItem("theme", theme), [theme]);
  const light = createTheme({
    palette: {
      mode: "light",
      primary: indigo,
      secondary: orange,
    },
  });
  const dark = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: '#353535',
        paper: "#353535",
      },
      primary: orange,
      secondary: indigo,
    },
  });
  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <StyledApp>
        <div className={classes.root}>
          <CssBaseline />
          <About toggleTheme={toggleTheme} />
          <Box component="main" className={classes.content}>
            <BrowserRouter>
              <Routes>
                <Route path="experiments" element={<Experiments />} />
                <Route path="history" element={<History />}>
                  <Route path=":key" element={<Job/>}/>
                </Route>
                <Route path="photos" element={<Photos />}></Route>
                <Route path="/" element={<Home/>}/>
              </Routes>
            </BrowserRouter>
          </Box>
        </div>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
