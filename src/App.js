import React from "react";
import { Provider } from 'react-redux'
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline'
import Routes from './Routes'
import configureStore from './configureStore'
import configureTheme from './configureTheme'
import './app.css'

function App() {
  const store = configureStore()
  const theme = configureTheme()

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
