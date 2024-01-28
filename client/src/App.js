import React from "react";
import "./App.css";
import DefaultRoutes from "./rotues/routes";
import Header from "./components/Header";
import { store } from "./_store";
import { Provider } from "react-redux";

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <div className="App">
          <Header />
          <DefaultRoutes />
        </div>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
