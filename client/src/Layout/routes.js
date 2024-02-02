import React from "react";
const Home = React.lazy(() => import("../pages/home"));
const Groups = React.lazy(() => import("../pages/group"));
const Chats = React.lazy(() => import("../pages/chats"));
const FriendScreen = React.lazy(() => import("../pages/friend"));
const LoginAndRegister = React.lazy(() => import("../pages/login"));

const routes = [
  { path: "/", exact: true, name: "Home", component: Home },
  { path: "/groups", exact: true, name: "Create Test", component: Groups },
  { path: "/chats", exact: true, name: "Create Test", component: Chats },
  { path: "/friend", exact: true, name: "View Test", component: FriendScreen },
  {
    path: "/login-register",
    exact: true,
    name: "Login",
    component: LoginAndRegister,
  },
  // {
  //   path: "*",
  //   exact: true,
  //   name: "404",
  //   component: Error,
  // }
];

export default routes;
