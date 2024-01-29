// import AppRoutes from "../pages";
import { Routes, Route, useNavigate } from "react-router-dom";
import firebaseAuthManager from "../utilis/services/firebase";
import { useEffect, useState } from "react";
import Home from "../pages/Home";
import Groups from "../pages/Group";
import PostSection from "../pages/Post";
import Chats from "../pages/Chats";
import LoginAndRegister from "../pages/LoginRegister";
import Socket from "../pages/socketio";
import UserList from "../pages/Users";
import NewPostPage from "../pages/CreatePost";

const DefaultRoutes = () => {
  const [user, setUser] = useState();

  const navigate = useNavigate();

  // useEffect(() => {
  //   firebaseAuthManager.initAuthStateListener().then((res) => {
  //     if (res) {
  //       console.log(res);
  //       setUser(JSON.parse(JSON.stringify(res)));
  //       navigate("/");
  //     }
  //   });
  // }, []);
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/posts"} element={<PostSection />} />
        <Route path={"/groups"} element={<Groups />} />
        <Route path={"/chats"} element={<Chats />} />
        <Route path={"/login-register"} element={<LoginAndRegister />} />
        <Route path={"/socket"} element={<Socket />} />
        <Route path={"/users"} element={<UserList />} />
        <Route path={"/create-post"} element={<NewPostPage />} />
      </Routes>
    </div>
  );
};

export default DefaultRoutes;
