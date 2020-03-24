import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Routes from "./Routes";
import Amplify from "aws-amplify";
import config from "./configureCognito";
import configureStore from "./configureStore";
import configureTheme from "./configureTheme";
import { actions } from './app.module'
import "./app.css";

Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
});

function App() {
  const store = configureStore();
  const theme = configureTheme();

  useEffect(() => {
    store.dispatch(actions.authenticate())
  }, [])

  return (
    <div>
      <StylesProvider injectFirst>
        <Provider store={store}>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </Provider>
      </StylesProvider>
    </div>
  );
}

export default App;
