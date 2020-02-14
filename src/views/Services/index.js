import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import ServiceItem from '../../components/Service'
import useFetch from '../../utils/useFetch'

const useStyles = makeStyles({
  root: {
    padding: 48,
  },
})

const testData = [
  {
    id: 1,
    name: 'Test',
    description: 'TestDesc',
    phone: '123455678',
    email: 'test@test.ca',
    is_accepting: false,
  },
  {
    id: 2,
    name: 'Test',
    description: 'TestDesc',
    phone: '123455678',
    email: 'test@test.ca',
    is_accepting: false,
  },
  {
    id: 3,
    name: 'Test',
    description: 'TestDesc',
    phone: '123455678',
    email: 'test@test.ca',
    is_accepting: false,
  },
]

const Services = (props) => {
  const [services, setServices] = useState(testData)
  const fetch = useFetch()
  const classes = useStyles()

  useEffect(() => {
    const getServices = async () => {
      try {
        const res = await fetch('/services')
        const data = await res.json()

        setServices(data)
      } catch (err) {
        console.log(err)
      }
    }

    getServices()
  }, [])

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h2" gutterBottom>Available Healthcare Services</Typography>
      <Grid container direction="column" spacing={2}>
        {
          services.map((x) => (
            <Grid item key={x.id}>
              <ServiceItem {...x} />
            </Grid>
          ))
        }
      </Grid>
    </div>
  )
}

Services.propTypes = {}
Services.defaultProps = {}

export default Services
