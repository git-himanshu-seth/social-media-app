const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require("passport");
// const GoogleTokenStrategy = require("passport-google-token").Strategy;
const cookieParser = require("cookie-parser");
const appRoute = require("./routes/routes");
const cors = require("cors");

dotenv.config({ path: "./.env" });

const app = express();
const GOOGLE_CLIENT_ID = "AIzaSyDZn_0qGW1tfjWZ3YzC6HPJUg8WZlJ95T0";

// passport.use(
//   new GoogleTokenStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // You can perform additional verification or fetch user information here
//       return done(null, profile);
//     }
//   )
// );

// const matchingRoutes = require("./routes/matchingRoutes")

const URI = process.env.MONGOBD_CONNECTION_STRING;

mongoose.connect(URI, {
  directConnection: true,
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

mongoose.connection.on("connected", function () {
  console.log(
    `Database connection open to ${mongoose.connection.host} ${mongoose.connection.name}`
  );
});

mongoose.connection.on("error", function (err) {
  console.log("Mongoose default connection error: " + err);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});

app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
// app.use(passport.initialize());
// const authenticateGoogleToken = passport.authenticate("google-token", {
//   session: false,
// });
app.use(
  "/api/v1/mandala",
  // passport.authenticate("bearer", { session: false }),
  appRoute
);
app.listen(3000, () => {
  console.log("Connect ", process.env.PORT);
});
// exports.users = app;
