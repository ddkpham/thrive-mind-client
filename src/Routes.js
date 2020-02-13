import React from 'react'
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import Login from './views/Login'

const Routes = (props) => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Redirect to="/login" />
    </Switch>
  </Router>
)

Routes.propTypes = {}
Routes.defaultProps = {}

export default Routes
