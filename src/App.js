import React from "react";
import { Provider } from 'react-redux'
import { StylesProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from "./components/Header";
import Routes from './Routes'
import configureStore from './configureStore'

function App() {
  const store = configureStore()

  return (
    <div>
      <StylesProvider injectFirst>
        <Provider store={store}>
          <CssBaseline />
          <Header />
          <Routes />
        </Provider>
      </StylesProvider>
    </div>
  );
}

export default App;
