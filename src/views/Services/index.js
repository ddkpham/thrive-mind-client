import React, { useState, useEffect } from 'react'
import debounce from 'lodash.debounce'
import Fuse from 'fuse.js'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

import ServiceItem from '../../components/Service'
import useFetch from '../../utils/useFetch'

const useStyles = makeStyles({
  root: {
    padding: '100px 48px 48px',
    height: '100%',
    minHeight: '100vh',
    backgroundColor: '#E1E7ED',
  },
  header: {
    marginBottom: 24,
  },
  textField: {
    backgroundColor: '#fff',
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
  const [query, setQuery] = useState('')
  const fetch = useFetch()
  const classes = useStyles()

  const fuseList = new Fuse(services, {
    keys: [
      'name',
      'description',
      'phone',
      'email',
    ]
  })

  useEffect(() => {
    const getServices = async () => {
      try {
        const res = await fetch('/services')
        if (res.ok) {
          const data = await res.json()
          setServices(data)
        }
      } catch (err) {
        console.log(err)
      }
    }

    getServices()
  }, []) // eslint-disable-line

  const searchServices = async (query) => {
    try {
      const res = await fetch(`/services/search?search=${query}`)

      if (res.ok) {
        const searchedServices = await res.json()
        setServices(searchedServices)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const debouncedSearch = debounce(searchServices, 150)

  const handleOnChange = (e) => {
    setQuery(e.target.value)
  }

  const filteredServices = query.length ? fuseList.search(query) : services

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" className={classes.header}>
        <Grid item xs={8}>
          <Typography variant="h5" component="h2" gutterBottom>Available Healthcare Services</Typography>
        </Grid>
        <Grid container item xs={4} justify="flex-end">
          <TextField
            fullWidth
            value={query}
            variant="outlined"
            placeholder="Search for healthcare services"
            onChange={handleOnChange}
            InputProps={{ classes: { root: classes.textField }}}
          />
        </Grid>
      </Grid>
      <Grid container direction="column" spacing={1}>
        {
          filteredServices.map((x) => (
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
