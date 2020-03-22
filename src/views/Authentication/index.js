import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Login from "./Login";
import Signup from "./Signup";
import { Auth } from "aws-amplify";

const useStyles = makeStyles({
  container: { minHeight: "100vh" },
  content: { padding: "48px 72px" },
  sidebar: {
    backgroundColor: "#001CF9",
    padding: 48
  }
});

const Authentication = props => {
  // force logged in users to go to services page
  const { token } = useSelector(({ app }) => app);
  const { content, sidebar, container } = useStyles();

  const [checkingSession, setCheckingSession] = useState(false);

  useEffect(() => {
    async function getSession() {
      try {
        const session = await Auth.currentSession();
        setCheckingSession(true);
        const user = await Auth.currentAuthenticatedUser();
        console.log("getSession -> user", user);
        return session;
      } catch (err) {
        console.log("getSession -> err", err);
      }
    }
    getSession();
  }, []);

  if (token) return <Redirect to="/services" />;

  return (
    <Grid container classes={{ container }}>
      <Grid item xs={4} classes={{ root: sidebar }}>
        <Typography variant="h5" color="secondary">
          <b>thrive mind</b>
        </Typography>
      </Grid>
      <Grid item xs={8} classes={{ root: content }}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Redirect to="/login" />
        </Switch>
      </Grid>
    </Grid>
  );
};

Authentication.propTypes = {};
Authentication.defaultProps = {};

export default Authentication;
