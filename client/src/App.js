import React from "react";
import "./App.css";
import DefaultRoutes from "./rotues/routes";
import Header from "./components/Header";
import { store,presitStore } from "./_store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={presitStore}>
        <div className="App">
          <Header />
          <DefaultRoutes />
        </div>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
