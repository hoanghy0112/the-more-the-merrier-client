import React from 'react';

import { RouterProvider } from 'react-router-dom';

import { PersistGate } from 'redux-persist/es/integration/react';

import { Provider } from 'react-redux';
import { store, persistor } from './app/store';

import router from './routers/MainRouter';
import ErrorBoundary from './routers/ErrorBoundary';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
}

export default App;
