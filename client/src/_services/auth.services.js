import config from "../config";
import { commonFunctions } from "../_utilities";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "@firebase/auth";
import { UseDispatch } from "react-redux";
// class FirebaseAuthManager {
//   constructor() {
//     // Initialize Firebase
//     this.app = initializeApp(firebaseConfig);
//     this.auth = getAuth(this.app);
//     // Variable to store user data
//     this.userData = "";
//     this.isUser = "";

//     // Initialize auth state change listener
//     this.initAuthStateListener();
//   }

//   async loginWithEmailAndPassword(email, password) {
//     try {
//       await signInWithEmailAndPassword(this.auth, email, password);
//       // Login successful logic
//     } catch (error) {
//       // Handle login error
//       console.error(error);
//     }
//   }

//   async signInWithEmailAndPasswordWithFirebase(email, password) {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         this.auth,
//         email,
//         password
//       );
//       // Signed up logic
//       const user = userCredential.user;
//       console.log(user);
//     } catch (error) {
//       // Handle signup error
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.error(error);
//     }
//   }

//   async logout() {
//     try {
//       await signOut(this.auth);
//       // Logout successful logic
//     } catch (error) {
//       // Handle logout error
//       console.error(error);
//     }
//   }

//   async initAuthStateListener() {
//     return new Promise((resolve, reject) => {
//       try {
//         onAuthStateChanged(this.auth, (user) => {
//           if (user) {
//             resolve(user);
//           } else {
//             resolve(null);
//           }
//         });
//       } catch (error) {
//         console.error(error);
//         reject(error);
//       }
//     });
//   }
// }

// const firebaseAuthManager = new FirebaseAuthManager();
// export default firebaseAuthManager;

export const authServices = {
  createUser,
  signInWithGoogle,
  logOut,
  getUsers,
  createUserDB,
  logIn,
};

function createUser(data) {
  return new Promise((resolve, reject) => {
    console.log("DATA", data);
    const auth = getAuth();
    let user = {};

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        if (userCredential) {
          user = await JSON.parse(JSON.stringify(userCredential.user));
          resolve(user);
        }
      })
      .catch((error) => {
        reject(error.message);
      });
  });
}

function signInWithGoogle(data) {
  return new Promise((resolve, reject) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    let user = {};

    signInWithPopup(auth, provider)
      .then(async (result) => {
        user = await JSON.parse(JSON.stringify(result.user));
        resolve(user);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
}

function getUsers(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = commonFunctions.getRequestOptions(
    "GET",
    extraHeaders,
    null,
    true
  );
  return fetch(`${config.apiUrl}users`, requestOptions).then((response) =>
    response.json()
  );
}
function createUserDB(data) {
  const extraHeaders = {
    "Content-Type": "application/json",
  };

  // Assuming commonFunctions.getRequestOptions is correctly defined
  const requestOptions = commonFunctions.getRequestOptions(
    "POST",
    extraHeaders,
    JSON.stringify(data), // Include the request payload (data) as a JSON string
    true
  );

  return fetch(`${config.apiUrl}/signup`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Handle the successful response data
      return data;
    })
    .catch((error) => {
      // Handle errors
      console.error("Error creating user:", error);
      throw error; // Rethrow the error to be handled at the higher level
    });
}

async function logIn(data) {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    // Signed in
    let user = { status: 200, data: JSON.parse(JSON.stringify(userCredential.user)) };

    // Add API call with GET method
    const apiUrl = `http://localhost:3000/api/v1/mandala/users/${user?.data?.uid}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
    });
    if (response.status===200) {
      const responseData = await response.json();
      user.data={...user.data,...responseData.data};
    } else {
      user.apiError = { errorCode: response.status, errorMessage: response.statusText };
    }

    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { errorCode, errorMessage };

    
  }
}


function logOut(data) {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        resolve({});
      })
      .catch((error) => {
        reject(error.message);
      });
  });
}
