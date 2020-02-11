import React from "react";
import { StylesProvider } from "@material-ui/core/styles";
import Header from "./components/Header";
import LoginView from "./views/LoginView";

function App() {
  return (
    <div>
      <StylesProvider injectFirst>
        <Header />
        <LoginView />
      </StylesProvider>
    </div>
  );
}

export default App;
