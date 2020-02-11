import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./index.scss";
/**
 * Default Login view for users who have not signed in yet.
 */
function LoginView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginRequest = async () => {
    const resquest = await fetch("http://127.0.0.1:5000/protected");
    const body = await resquest.json();
    console.log(body);
  };

  const passwordHandler = event => {
    const {
      target: { value: newVal }
    } = event;
    setPassword(newVal);
  };
  return (
    <div className="login__wrapper">
      <div className="login__text-fields">
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          className="login__text-field"
          onChange={evt => console.log(evt)}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          className="login__text-field"
          onChange={evt => setPassword(evt)}
        />
        <Button variant="contained" color="secondary" onClick={loginRequest}>
          Secondary
        </Button>
      </div>
    </div>
  );
}

export default LoginView;
