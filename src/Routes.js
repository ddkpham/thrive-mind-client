import React from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Authentication from "./views/Authentication";
import Services from "./views/Services";
import Profile from "./views/Profile";
import useCheckAuth from './utils/useCheckAuth'

const Routes = props => {
  const isAuth = useCheckAuth()

  return (
    <Router>
      {isAuth && <Header />}
      <Switch>
        <ProtectedRoute exact path="/services" component={Services} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <Route path="/" component={Authentication} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

Routes.propTypes = {};
Routes.defaultProps = {};

export default Routes;
