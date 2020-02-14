import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import Authentication from './views/Authentication'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import Services from './views/Services'
import { actions } from './app.module'

const Routes = (props) => {
  const dispatch = useDispatch()
  const { authenticating } = useSelector(({ app }) => app)

  useEffect(() => {
    dispatch(actions.authenticate())
  }, [])

  if (authenticating) return null

  return (
    <Router>
      <Route path="/services" component={Header} />
      <Switch>
        <ProtectedRoute exact path="/services" component={Services} />
        <Route path="/" component={Authentication} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

Routes.propTypes = {}
Routes.defaultProps = {}

export default Routes
