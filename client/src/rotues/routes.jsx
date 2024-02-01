import { Routes, Route, useNavigate } from "react-router-dom";
import firebaseAuthManager from "../utilis/services/firebase";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Groups from "../pages/group";
// import PostSection from "../pages/Post";
import Chats from "../pages/Chats";
import LoginAndRegister from "../pages/LoginRegister";
import Socket from "../pages/socketio";
import FriendScreen from "../pages/friend";
// import NewPostPage from "../pages/CreatePost";
import { useSelector } from "react-redux";

const DefaultRoutes = () => {
  const userData = useSelector((state) => state?.auth?.user);
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(userData);
  }, [userData]);
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
        {/* <Route path={"/posts"} element={<PostSection />} /> */}
        <Route path={"/groups"} element={<Groups />} />
        <Route path={"/chats"} element={<Chats />} />
        <Route path={"/friend"} element={<FriendScreen />} />
        {/* <Route path={"/create-post"} element={<NewPostPage />} /> */}
        {/* <Route path={"/posts"} element={user?._id ?<PostSection />:<Navigate to="/login-register" />} />
        <Route path={"/groups"} element={user?._id ?<Groups />:<Navigate to="/login-register" />} />
        <Route path={"/chats"} element={user?._id ?<Chats />:<Navigate to="/login-register" />} />
        <Route path={"/login-register"} element={user?._id?<Navigate to="/" />: <LoginAndRegister />} />
        <Route path={"/socket"} element={user?._id ?<Socket />:<Navigate to="/login-register" />} />
        <Route path={"/users"} element={user?._id ?<UserList />:<Navigate to="/login-register" />} />
        <Route path={"/create-post"} element={user?._id ?<NewPostPage />:<Navigate to="/login-register" />} /> */}
      </Routes>
    </div>
  );
};

export default DefaultRoutes;
