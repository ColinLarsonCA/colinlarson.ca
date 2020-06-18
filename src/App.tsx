import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import {
  createMuiTheme,
  CssBaseline,
  makeStyles,
  ThemeProvider as MaterialThemeProvider,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { indigo, orange } from "@material-ui/core/colors";
import { About } from "about";
import { Experiments, History, Home, Job } from "pages";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(12)
    },
  },
}));

function App() {
  const classes = useStyles();
  const initialTheme = () => localStorage.getItem("theme") === "light" ? "light" : "dark";
  const [theme, setTheme] = useState(initialTheme());
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  useEffect(() => localStorage.setItem("theme", theme), [theme]);
  const light = createMuiTheme({
    palette: {
      type: "light",
      primary: indigo,
      secondary: orange
    }
  });
  const dark = createMuiTheme({
    palette: {
      type: "dark",
      background: {
        paper: "#353535"
      },
      primary: orange,
      secondary: indigo
    },
  });
  return (
    <MaterialThemeProvider theme={theme === "light" ? light : dark}>
      <div className={classes.root}>
        <CssBaseline />
        <About toggleTheme={toggleTheme}/>
        <div className={classes.content}>
          <Router>
            <Switch>
              <Route path="/experiments"><Experiments/></Route>
              <Route path="/history/:key"><Job/></Route>
              <Route path="/history"><History/></Route>
              <Route path="/"><Home/></Route>
            </Switch>
          </Router>
        </div>
        {/* <Snackbar open={true}>
          <Alert
            severity="info"
            onClose={() => {}}
          >
            <Typography>Check out my <Link href="https://kickstarter.com" target="_blank">Kickstarter</Link> and make sure to like and subscribe!</Typography>
          </Alert>
        </Snackbar> */}
      </div>
    </MaterialThemeProvider>
  );
}

export default App;
