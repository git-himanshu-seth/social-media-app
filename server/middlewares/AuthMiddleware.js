const passport = require("passport");
const FirebaseStrategy = require("passport-firebase-auth");

class FirebaseAuthMiddleware {
  constructor() {
    this.initialize();
  }

  initialize() {
    // Use the Firebase authentication strategy
    passport.use(
      new FirebaseStrategy(
        {
          firebaseProjectID: "your-firebase-project-id",
          clientID: "your-firebase-client-id",
          clientSecret: "your-firebase-client-secret",
          callbackURL: "http://localhost:3000/auth/firebase/callback",
        },
        function (token, tokenSecret, profile, done) {
          // In this minimal example, we're not storing any user information.
          // You can customize this section according to your needs.
          return done(null, profile);
        }
      )
    );

    // Initialize passport and session support
    passport.initialize();
  }

  middleware(req, res, next) {
    passport.authenticate("firebase", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send("Unauthorized");
      }

      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        return next();
      });
    })(req, res, next);
  }
}

module.exports = new FirebaseAuthMiddleware();

// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
