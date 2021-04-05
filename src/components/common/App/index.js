import React from 'react';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import AppRouter from '../AppRouter';
import { BrowserRouter } from 'react-router-dom';

/** This component is the entrypoint of the react app */
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;