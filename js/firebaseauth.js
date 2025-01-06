// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
// import {
//   getFirestore,
//   setDoc,
//   doc,
// } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCJiUu5rAz-5xTMEB5IPmVqod6W7QdXbeo",
//   authDomain: "mrsinghstudio-3a44c.firebaseapp.com",
//   databaseURL:
//     "https://mrsinghstudio-3a44c-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "mrsinghstudio-3a44c",
//   storageBucket: "mrsinghstudio-3a44c.firebasestorage.app",
//   messagingSenderId: "932982058445",
//   appId: "1:932982058445:web:f1faa0033df0de7faba884",
//   measurementId: "G-RF2C3JW79Z",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// // function showMessage(message, divId) {
//   var messageDiv = document.getElementById(divId);
//   messageDiv.style.display = "block";
//   messageDiv.innerHTML = message;
//   setTimeout(function () {
//     messageDiv.style.opacity = 0;
//   }, 5000);
// }

// const signUp = document.querySelector(".auth-button");
// signUp.addEventListener("click", (event) => {
//   event.preventDefault();
//   const email = document.getElementById("signup-email").value;
//   const password = document.getElementById("password").value;
//   const confirmPassword = document.getElementById(
//     "signup-confirm-password"
//   ).value;
//   const auth = getAuth();
//   const db = getFirestore();

//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       const userData = {
//         email: email,
//         firstName: firstName,
//         lastName: lastName,
//       };
//       showMessage("Account Created Successfully", "signUpMessage");
//       const docRef = doc(db, "users", user.uid);
//       setDoc(docRef, userData)
//         .then(() => {
//           window.location.href = "index.html";
//         })
//         .catch((error) => {
//           console.error("error writing document", error);
//         });
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       if (errorCode == "auth/email-already-in-use") {
//         showMessage("Email Address Already Exists !!!", "signUpMessage");
//       } else {
//         showMessage("unable to create User", "signUpMessage");
//       }
//     });
// });
// firebaseauth.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJiUu5rAz-5xTMEB5IPmVqod6W7QdXbeo",
  authDomain: "mrsinghstudio-3a44c.firebaseapp.com",
  databaseURL:
    "https://mrsinghstudio-3a44c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mrsinghstudio-3a44c",
  storageBucket: "mrsinghstudio-3a44c.firebasestorage.app",
  messagingSenderId: "932982058445",
  appId: "1:932982058445:web:f1faa0033df0de7faba884",
  measurementId: "G-RF2C3JW79Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Function to show message
function showMessage(elementId, message, isError = true) {
  const messageDiv = document.getElementById(elementId);
  messageDiv.textContent = message;
  messageDiv.style.display = "block";
  messageDiv.style.color = isError ? "#ff3333" : "#4CAF50";
  messageDiv.style.backgroundColor = isError ? "#ffebeb" : "#ebffeb";
  messageDiv.style.padding = "12px";
  messageDiv.style.borderRadius = "4px";
  messageDiv.style.marginBottom = "20px";
  messageDiv.style.textAlign = "center";
  messageDiv.style.position = "relative";
  messageDiv.style.width = "100%";
  messageDiv.style.boxSizing = "border-box";
}

// Sign Up Function
const signUpForm = document.querySelector("#signup-page form");
if (signUpForm) {
  signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Sign up form submitted"); // Debug log

    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById(
      "signup-confirm-password"
    ).value;

    if (password !== confirmPassword) {
      showMessage("signUpMessage", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      showMessage(
        "signUpMessage",
        "Password must be at least 6 characters long"
      );
      return;
    }

    try {
      console.log("Creating user account..."); // Debug log
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Account created successfully:", userCredential); // Debug log

      showMessage("signUpMessage", "Account created successfully!", false);

      // Delay redirect to ensure message is seen
      setTimeout(() => {
        window.location.href = "logindash.html";
      }, 2000);
    } catch (error) {
      console.error("Sign up error:", error); // Debug log
      let errorMessage = "An error occurred during sign up";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already registered";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Email/password accounts are not enabled";
          break;
        case "auth/weak-password":
          errorMessage = "Password is too weak";
          break;
        default:
          errorMessage = error.message;
      }

      showMessage("signUpMessage", errorMessage);
    }
  });
}

// Sign In Function
const signInForm = document.querySelector("#signin-page form");
if (signInForm) {
  signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      showMessage("signInMessage", "Signed in successfully!", false);

      setTimeout(() => {
        window.location.href = "logindash.html";
      }, 2000);
    } catch (error) {
      let errorMessage = "Invalid email or password";
      showMessage("signInMessage", errorMessage);
    }
  });
}

// Google Sign In
document.querySelectorAll(".social-button").forEach((button) => {
  if (button.textContent.trim() === "Google") {
    button.addEventListener("click", async (e) => {
      e.preventDefault();

      try {
        const result = await signInWithPopup(auth, googleProvider);
        const messageDiv =
          document.getElementById("signInMessage").style.display !== "none"
            ? document.getElementById("signInMessage")
            : document.getElementById("signUpMessage");

        showMessage(
          messageDiv.id,
          "Signed in with Google successfully!",
          false
        );

        setTimeout(() => {
          window.location.href = "logindash.html";
        }, 2000);
      } catch (error) {
        const messageDiv =
          document.getElementById("signInMessage").style.display !== "none"
            ? document.getElementById("signInMessage")
            : document.getElementById("signUpMessage");

        showMessage(messageDiv.id, error.message);
      }
    });
  }
});

// Handle Logout
const handleLogout = async () => {
  try {
    await signOut(auth);
    window.location.href = "signin.html";
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

// Export auth methods
export { auth, handleLogout };
export { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
