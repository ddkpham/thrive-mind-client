import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { actions } from "../../app.module";
import { Auth } from "aws-amplify";

const useStyles = makeStyles({
  root: {
    height: "100%"
  },
  header: {
    marginBottom: "2rem"
  },
  action: {
    marginTop: "1rem"
  }
});

/**
 * Verify code by email
 */
const Verify = props => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(({ app }) => app.user)
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [code, setCode] = useState("");

  if (!user?.username) return <Redirect to="/login" />

  const resendCode = () => {
    Auth.resendSignUp(user.username)
    setIsCodeSent(true)

    setTimeout(() => {
      setIsCodeSent(false)
    }, 3000)
  }

  const onVerifyCode = async () => {
    try {
      const res = await Auth.confirmSignUp(user.username, code)
      if (res === 'SUCCESS') {
        dispatch(actions.signIn(user.username, user.password))
      }
    } catch (err) {
      console.log(err)
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
            <b>Verify Email</b>
          </Typography>
          <Typography color="textSecondary">
            Check your email for the verification link.
          </Typography>
        </div>
        <Grid container item spacing={2}>
        </Grid>
      </Grid>
      <div className={classes.action}>
        <Grid container justify="space-between">
          <Grid item>
          <Link to="/login">
              <Button variant="text">Back to Login</Button>
          </Link>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

export default Verify;
