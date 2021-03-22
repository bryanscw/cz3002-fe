import React from "react";
import { Provider } from "react-redux";
import store from "./components/redux/store";
import AppRouter from "./AppRouter";

/** This component is the entrypoint of the react app */
function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;