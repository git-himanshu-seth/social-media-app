const passport = require("passport");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK with your service account credentials
const serviceAccount = require("../serviceAcountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Other configuration options
});

// Assuming idToken is the token you want to verify

const BearerStrategy = require("passport-http-bearer");

passport.use(
  new BearerStrategy(function (token, done) {
    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        // Do something with the UID or other information from the decoded token
        console.log(`Authenticated user UID: ${uid}`);
        // You can perform additional actions here
      })
      .catch((error) => {
        // Handle the error
        console.error("Authentication error:", error);
        // You might want to show an error message or take appropriate action
      });
    console.log(decoded.foo);
    console.log("token", token);
    // User.findOne({ token: token }, function (err, user) {
    //   if (err) {
    //     return done(err);
    //   }
    //   if (!user) {
    //     return done(null, false);
    //   }
    //   return done(null, user, { scope: "all" });
    // });
  })
);

// const passport = require("passport");
// require("dotenv").config();
// const GoogleStrategy = require("passport-google-oauth2").Strategy;
// const userModel = require("../models/userModel.js");
// console.log("environment", process.env.GOOGLE_CLIENT_ID);
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3000/",
//       passReqToCallback: true,
//     },
//     function (request, accessToken, refreshToken, profile, done) {
//       userModel.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return done(err, user);
//       });
//     }
//   )
// );
// passport.serializeUser((user, done) => {
//   done(null, user);
// });
// passport.deserializeUser((user, done) => {
//   done(null, user);
// });
