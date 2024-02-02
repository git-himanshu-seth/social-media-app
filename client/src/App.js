import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routes from "./Layout/routes";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Suspense fallback={false}>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              name={route.name}
              element={<route.component />}
            />
          ))}
        </Routes>
      </Suspense>
      <ToastContainer
        enableMultiContainer
        containerId={"TOP_RIGHT"}
        newestOnTop={true}
      />
    </div>
  );
}

export default App;
