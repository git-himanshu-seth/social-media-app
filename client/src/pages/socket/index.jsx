import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Socket = () => {
  // const socket = io("ws://localhost:8080", {
  //   reconnectionDelayMax: 10000,
  //   auth: {
  //     token: "123",
  //   },
  // });
  // useEffect(() => {
  //   console.log(
  //     "SOCKET",

  //     socket.on
  //   );
  //   socket.emit("sendMessage", {
  //     senderId: "1223234245254",
  //     receiverId: "stgfghstfhd",
  //     socketId: "hello",
  //   });
  //   socket.on("getMessage", (data) => {
  //     console.log("DATAT", data);
  //   });
  //   socket.on("connect", (res) => {
  //     console.log("Connect", res);
  //   });
  // }, [socket]);
  return <div>Socket</div>;
};
export default Socket;
