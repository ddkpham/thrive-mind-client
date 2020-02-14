import React from 'react'
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import Authentication from './views/Authentication'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import Services from './views/Services'
import Grid from '@material-ui/core/Grid'

const Routes = (props) => (
  <Router>
    <div>
      <Route path="/services" component={Header} />
      <Switch>
        <ProtectedRoute exact path="/services" component={Services} />
        <Route path="/" component={Authentication} />
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>
)

Routes.propTypes = {}
Routes.defaultProps = {}

export default Routes
