import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Login from "./Login";
import Signup from "./Signup";
import Verify from "./Verify";

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

  // TODO: handle proper callback, not fixed url
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
          <Route path="/verify" component={Verify} />
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
