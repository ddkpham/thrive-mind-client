import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Account from '@material-ui/icons/AccountCircle'
import { actions } from '../../app.module'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  account: {
    marginRight: 12,
  },
}))

export default function ButtonAppBar() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { user } = useSelector(({ app }) => app)

  const handleOnSignOut = () => {
    dispatch(actions.signOut())
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            thrive mind
          </Typography>
          <Button
            color="secondary"
            variant="contained"
            startIcon={<Account />}
            className={classes.account}
          >
            {user ? user.firstName : 'no user data'}
          </Button>
          <Button color="secondary" onClick={handleOnSignOut}>
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
