import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import MUITextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useFetch from "../../utils/useFetch";
import mapUserData from "../../utils/mapUserData";

const useStyles = makeStyles({
  root: {
    padding: "100px 48px 48px",
    height: "100%",
    minHeight: "100vh",
    backgroundColor: "#E1E7ED"
  },
  divider: {
    margin: "24px 0",
    maxWidth: 500
  },
  form: {
    marginBottom: 24
  }
});

// fastest way to avoid the white corners
const TextField = p => (
  <MUITextField
    variant="outlined"
    InputProps={{ style: { backgroundColor: "#fff" } }}
    {...p}
  />
);

const Profile = props => {
  const classes = useStyles();
  const fetch = useFetch();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email_address: "",
    phone: "",
    medical_history: null,
    current_prescription: null,
    preferences: null,
    health_care_plan: null,
    is_seeking: true
  });
  console.log("user", user);
  console.log("user.is_seeking", user.is_seeking);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    console.log("fetching profile");
    const getProfile = async () => {
      try {
        const res = await fetch("/profile");
        const userData = await res.json();
        console.log("getProfile -> userData", userData);
        setUser({ ...user, ...userData });
      } catch (err) {
        console.log(err);
      }
    };

    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = e => {
    const { name, value } = e.target;
    console.log("name, value", name, value);
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleCheck = bool => {
    setUser({
      ...user,
      is_seeking: bool
    });
  };

  const updateProfile = async () => {
    setSaving(true);
    const test = user;
    console.log("updateProfile -> test", test);
    try {
      const res = await fetch("/profile", {
        method: "PUT",
        body: JSON.stringify(user)
      });
    } catch (err) {
      console.log(err);
    }
    setSaving(false);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        <span role="img" aria-label="wave">
          👋
        </span>{" "}
        {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="subtitle1">{user?.role}</Typography>
      <Divider className={classes.divider} />
      <Grid container spacing={2} classes={{ container: classes.form }}>
        <Grid item xs={6} md="auto">
          <TextField
            label="First Name"
            name="first_name"
            value={user.first_name ? user.first_name : ""}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={6} md="auto">
          <TextField
            label="Last Name"
            name="last_name"
            value={user.last_name ? user.last_name : ""}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone"
            name="phone"
            value={user.phone ? user.phone : ""}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Email"
              name="email_address"
              value={user.email_address ? user.email_address : ""}
              onChange={handleOnChange}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Medical History"
              name="medical_history"
              value={user.medical_history ? user.medical_history : ""}
              onChange={handleOnChange}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Current Prescription"
              name="current_prescription"
              value={user.current_prescription ? user.current_prescription : ""}
              onChange={handleOnChange}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Preferences"
              name="preferences"
              value={user.preferences ? user.preferences : ""}
              onChange={handleOnChange}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Health Care Plan"
              name="health_care_plan"
              value={user.health_care_plan ? user.health_care_plan : ""}
              onChange={handleOnChange}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={12} md={4}>
            <FormControlLabel
              value="start"
              control={
                <Checkbox
                  color="primary"
                  name="is_seeking"
                  value={!!user.is_seeking}
                  checked={!!user.is_seeking}
                  onChange={() => handleCheck(!user.is_seeking)}
                />
              }
              label="is Seeking Services"
              labelPlacement="start"
            />
          </Grid>
        </Grid>
      </Grid>
      <Button
        onClick={updateProfile}
        size="large"
        color="primary"
        variant="contained"
      >
        Save
      </Button>
    </div>
  );
};

Profile.propTypes = {};
Profile.defaultProps = {};

export default Profile;
