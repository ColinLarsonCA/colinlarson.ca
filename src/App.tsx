import React, { useState, useEffect, forwardRef } from "react";
import { styled } from "@mui/material/styles";
import {
  BrowserRouter,
  Link,
  LinkProps,
  Route,
  Routes,
} from "react-router-dom";
import { About } from "about";
import { Experiments, History, Home, Job, PackingList } from "pages";
import { createTheme } from "@mui/material/styles";
import { indigo, lightBlue, orange } from "@mui/material/colors";
import {
  Box,
  CssBaseline,
  PaletteOptions,
  Theme,
  ThemeProvider,
} from "@mui/material";
import { Blog } from "pages/Blog";
import { BlogPost } from "pages/BlogPost";

const PREFIX = "App";
const classes = {
  root: `${PREFIX}-root`,
  content: `${PREFIX}-content`,
};
const StyledApp = styled("div")(({ theme }) => ({
  [`& .${classes.root}`]: {
    display: "flex",
  },

  [`& .${classes.content}`]: {
    flexGrow: 1,
    padding: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(20),
    },
  },
}));

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<LinkProps, "to"> & { href: LinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  const hrefStr = href.toString();
  const isExternal =
    hrefStr.startsWith("http") || hrefStr.startsWith("mailto:");
  if (isExternal) {
    // eslint-disable-next-line
    return <a href={hrefStr} {...other} />;
  }
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
  });
};

const light = theme({
  mode: "light",
  primary: indigo,
  secondary: orange,
});

const dark = theme({
  mode: "dark",
  background: {
    default: "#101418",
    paper: "#101418",
  },
  primary: lightBlue,
  secondary: orange,
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
                <Route path="history/:key" element={<Job />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:slug" element={<BlogPost />} />
                <Route path="packing" element={<PackingList />} />
                <Route path="/" element={<Home />} />
              </Routes>
            </Box>
          </div>
        </StyledApp>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
