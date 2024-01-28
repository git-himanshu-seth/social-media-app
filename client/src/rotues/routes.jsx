// import AppRoutes from "../pages";
import { Routes, Route, useNavigate } from "react-router-dom";
import firebaseAuthManager from "../utilis/services/firebase";
import { useEffect, useState } from "react";
import Home from "../pages/Home";
import Groups from "../pages/Group";
import PostSection from "../pages/Post";
import Chat from "../pages/Chat";

const DefaultRoutes = () => {
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    firebaseAuthManager.initAuthStateListener().then((res) => {
      if (res) {
        setUser(res);
        navigate("/home");
      }
    });
  }, []);
  return (
    <div>
      <Routes>
        <Route path={"/home"} element={<Home />} />
        <Route path={"/posts"} element={<PostSection />} />
        <Route path={"/groups"} element={<Groups />} />
        <Route path={"/chats"} element={<Chat />} />
        {/* <Route path={"/"} element={<Home />} />
        <Route path={"/"} element={<Home />} /> */}
      </Routes>
    </div>
  );
};

export default DefaultRoutes;
