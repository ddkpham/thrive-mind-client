import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { actions } from "../../app.module";

const useStyles = makeStyles({
  root: {
    height: "100%"
  },
  header: {
    marginBottom: "2rem"
  },
  action: {
    marginTop: "1rem"
  },
  err: {
    color: 'red',
    marginTop: 8,
  },
});

/**
 * Default Login view for users who have not signed in yet.
 */
const Login = props => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null)

  const onSignIn = async () => {
    if (!username) {
      setErr('Username cannot be left blank.')
      return
    }

    if (!password) {
      setErr('Password cannot be left blank.')
      return
    }

    const errCode = await dispatch(actions.signIn(username, password))
    if (errCode === 'UserNotConfirmedException') {
      setErr('Check your email for a verification link from us.')
    }

    if (errCode === 'NotAuthorizedException') {
      setErr('Incorrect username or password.')
    }
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      className={classes.root}
    >
      <Grid item>
        <div className={classes.header}>
          <Typography variant="h5">
            <b>Login</b>
          </Typography>
          <Typography color="textSecondary">
            Sign in with your username and passsword.
          </Typography>
        </div>
        <Grid container item spacing={2}>
          <Grid item>
            <TextField
              variant="outlined"
              label="Username"
              value={username}
              onChange={e => {
                setUsername(e.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              label="Password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      {err && <Typography className={classes.err}>{err}</Typography>}
      <div className={classes.action}>
        <Grid container justify="space-between">
          <Grid item>
            <Link to="/signup">
              <Button variant="text">I don't have an account.</Button>
            </Link>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={onSignIn} disableElevation>
              Sign In
            </Button>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

export default Login;
