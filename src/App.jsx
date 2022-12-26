import React from 'react';

import { RouterProvider } from 'react-router-dom';

import { PersistGate } from 'redux-persist/es/integration/react';

import { Provider } from 'react-redux';
import { store, persistor } from './app/store';

import router from './routers/MainRouter';
import ErrorBoundary from './routers/ErrorBoundary';

function App() {
  const { google } = window;
  if (google) {
    google.accounts.id.initialize({
      client_id:
        '563269076578-jrtmsr5fcoh7fq1pk2sc7k75dqdpv9s0.apps.googleusercontent.com',
      callback: (...args) => {
        console.log(args);
      },
    });
    google.accounts.id.renderButton(
      document.getElementById('googleSignInButton'),
      { theme: 'outline', size: 'large' }, // customization attributes
    );
    google.accounts.id.prompt();
  }

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
