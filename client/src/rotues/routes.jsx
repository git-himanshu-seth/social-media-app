import AppRoutes from "../pages";
import { Routes, Route, useNavigate } from "react-router-dom";
import firebaseAuthManager from "../utilis/services/firebase";
import { useEffect, useState } from "react";

const DefaultRoutes = () => {
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    firebaseAuthManager.initAuthStateListener().then((res) => {
      if (res) {
        setUser(res);
        navigate("/posts");
      }
    });
  }, []);
  return (
    <div>
      <Routes>
        {AppRoutes.length > 0 &&
          AppRoutes.map(({ id, path, Component, isAuthenticated }) => {
            // if (isAuthenticated && !user) {
            //   navigate("/");
            //   // return null;
            // } else {
            return <Route path={path} element={<Component />} key={id} />;
            // }
          })}
      </Routes>
    </div>
  );
};

export default DefaultRoutes;
