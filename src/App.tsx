import React, { useState, useEffect, forwardRef } from "react";
import { styled } from '@mui/material/styles';
import { BrowserRouter, Link, LinkProps, Route, Routes } from "react-router-dom";
import { About } from "about";
import { Experiments, History, Home, Job } from "pages";
import { createTheme } from "@mui/material/styles";
import { indigo, orange } from "@mui/material/colors";
import { Box, CssBaseline, PaletteOptions, Theme, ThemeProvider } from "@mui/material";
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

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<LinkProps, 'to'> & { href: LinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  return <Link ref={ref} to={href} {...other} />;
});

const theme = (palette: PaletteOptions): Theme => {
  return createTheme({
    palette: palette,
    components: {
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehavior,
        },
      },
    },
  })
}

const light = theme({
  mode: "light",
  primary: indigo,
  secondary: orange,
});

const dark = theme({
  mode: "dark",
  background: {
    default: '#353535',
    paper: "#353535",
  },
  primary: orange,
  secondary: indigo,
});

function App() {
  const initialTheme = () =>
    localStorage.getItem("theme") === "light" ? "light" : "dark";
  const [theme, setTheme] = useState(initialTheme());
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  useEffect(() => localStorage.setItem("theme", theme), [theme]);
  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <BrowserRouter>
        <StyledApp>
          <div className={classes.root}>
            <CssBaseline />
            <About toggleTheme={toggleTheme} />
            <Box component="main" className={classes.content}>
              <Routes>
                <Route path="experiments" element={<Experiments />} />
                <Route path="history" element={<History />} />
                <Route path="history/:key" element={<Job/>}/>
                <Route path="photos" element={<Photos />}></Route>
                <Route path="/" element={<Home/>}/>
              </Routes>
            </Box>
          </div>
        </StyledApp>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
