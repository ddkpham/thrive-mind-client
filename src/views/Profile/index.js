import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
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
    name: "",
    family_name: "",
    email: "",
    phone_number: ""
  });
  console.log("user", user);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    console.log("fetching profile");
    const getProfile = async () => {
      try {
        const res = await fetch("/profile");
        const userData = await res.json();
        console.log("getProfile -> userData", userData);
        setUser(userData);
      } catch (err) {
        console.log(err);
      }
    };

    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = e => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const updateProfile = async () => {
    setSaving(true);
    try {
      const res = await fetch("/profile", {
        method: "PUT",
        body: JSON.stringify(mapUserData(user))
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
        {user?.name} {user?.family_name}
      </Typography>
      <Typography variant="subtitle1">{user?.role}</Typography>
      <Divider className={classes.divider} />
      <Grid container spacing={2} classes={{ container: classes.form }}>
        <Grid item xs={6} md="auto">
          <TextField
            label="First Name"
            name="name"
            value={user.first_name ? user.first_name : ""}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={6} md="auto">
          <TextField
            label="Last Name"
            name="family_name"
            value={user.last_name ? user.last_name : ""}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone"
            name="phone_number"
            value={user.phone ? user.phone : ""}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Email"
              name="email"
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
              name="current_prescription"
              value={user?.current_prescription}
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
