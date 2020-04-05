import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import ServiceItem from "../../components/Service";
import useFetch from "../../utils/useFetch";

const useStyles = makeStyles({
  root: {
    padding: "100px 48px 48px",
    height: "100%",
    minHeight: "100vh",
    backgroundColor: "#E1E7ED"
  },
  header: {
    marginBottom: 24
  },
  textField: {
    backgroundColor: "#fff"
  }
});

const Services = props => {
  const [services, setServices] = useState([]);
  const [query, setQuery] = useState("");
  const fetch = useFetch();
  const classes = useStyles();

  useEffect(() => {
    const getServices = async () => {
      try {
        const res = await fetch("/services");
        if (res.ok) {
          const data = await res.json();
          setServices(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getServices();
  }, []); // eslint-disable-line

  useEffect(() => {
    const searchServices = async query => {
      try {
        if (query) {
          const res = await fetch(`/services/search?someSearchKey=${query}`);

          if (res.ok) {
            const searchedServices = await res.json();
            setServices(searchedServices);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    searchServices(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleOnChange = e => {
    const {
      target: { value }
    } = e;
    const delayedUpdate = debounce(() => {
      setQuery(value);
    });
    delayedUpdate();
  };

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" className={classes.header}>
        <Grid item xs={8}>
          <Typography variant="h5" component="h2" gutterBottom>
            Available Healthcare Services
          </Typography>
        </Grid>
        <Grid container item xs={4} justify="flex-end">
          <TextField
            fullWidth
            value={query}
            variant="outlined"
            placeholder="Search for healthcare services"
            onChange={handleOnChange}
            InputProps={{ classes: { root: classes.textField } }}
          />
        </Grid>
      </Grid>
      <Grid container direction="column" spacing={1}>
        {services.map(x => (
          <Grid item key={x.hid}>
            <ServiceItem {...x} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

Services.propTypes = {};
Services.defaultProps = {};

export default Services;
