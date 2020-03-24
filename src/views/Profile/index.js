import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import MUITextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import useFetch from '../../utils/useFetch'

const useStyles = makeStyles({
  root: {
    padding: "100px 48px 48px",
    height: "100%",
    minHeight: "100vh",
    backgroundColor: "#E1E7ED"
  },
  divider: {
    margin: '24px 0',
    maxWidth: 500,
  },
  form: {
    marginBottom: 24,
  },
})

// fastest way to avoid the white corners
const TextField = p => <MUITextField variant="outlined" InputProps={{ style: { backgroundColor: '#fff' }}} {...p} />

const Profile = (props) => {
  const classes = useStyles()
  const fetch = useFetch()
  const userData = useSelector(({ app }) => app.user)
  const [user, setUser] = useState(userData || { name: '', family_name: '', email: '', phone_number: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (userData) setUser(userData)
  }, [userData])

  const updateProfile = async () => {
    setSaving(true)
    try {
      const res = await fetch('/profile', {
        method: 'PUT',
        body: JSON.stringify(user)
      })
    } catch (err) {
      console.log(err)
    }
    setSaving(false)
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom><span role="img" aria-label="wave">👋</span> {userData?.name} {userData?.family_name}</Typography>
      <Typography variant="subtitle1">{userData?.role}</Typography>
      <Divider className={classes.divider} />
      <Grid container spacing={2} classes={{ container: classes.form }}>
        <Grid item xs={6} md="auto">
          <TextField label="First Name" value={user?.name} />
        </Grid>
        <Grid item xs={6} md="auto">
          <TextField label="Last Name" value={user?.family_name} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Phone" value={user?.phone_number} />
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Email" value={user?.email} />
          </Grid>
        </Grid>
      </Grid>
      <Button onClick={updateProfile} size="large" color="primary" variant="contained">Save</Button>
    </div>
  )
}

Profile.propTypes = {}
Profile.defaultProps = {}

export default Profile