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
  sendPasswordResetEmail,
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

// Update page switching logic to include forgot password page
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const pageId = this.getAttribute("href").substring(1);
    document
      .querySelectorAll("#signin-page, #signup-page, #forgot-password-page")
      .forEach((page) => {
        page.style.display = "none";
      });
    document.getElementById(pageId).style.display = "block";
  });
});
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

const email = document.getElementById("signin-email");
const password = document.getElementById("signin-password");

// Sign In Function
const signInForm = document.querySelector("#signin-page form");
if (signInForm) {
  signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Check if email and password inputs exist
    if (!email || !password) {
      showMessage("signInMessage", "Email or password field not found");
      return;
    }

    try {
      // Get the values from the input fields
      const emailValue = email.value.trim();
      const passwordValue = password.value.trim();

      // Validate inputs
      if (!emailValue || !passwordValue) {
        showMessage("signInMessage", "Please fill in all fields");
        return;
      }

      // Attempt to sign in
      const { user } = await signInWithEmailAndPassword(
        auth,
        emailValue,
        passwordValue
      );

      // Clear the form
      signInForm.reset();

      // Show success message
      showMessage("signInMessage", "Signed in successfully!", false);

      // Store user info if needed
      localStorage.setItem("userEmail", user.email);

      // Redirect after success
      setTimeout(() => {
        window.location.href = "logindash.html";
      }, 2000);
    } catch (error) {
      console.error("Sign-in error:", error);
      let errorMessage;

      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email format";
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          errorMessage = "Invalid email or password";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many attempts. Please try again later";
          break;
        default:
          errorMessage = "Error signing in. Please try again";
      }

      showMessage("signInMessage", errorMessage);
      // Clear password field on error
      if (password) password.value = "";
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
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const pageId = this.getAttribute("href").substring(1);

    // Hide all pages
    document
      .querySelectorAll("#signin-page, #signup-page, #forgot-password-page")
      .forEach((page) => {
        page.style.display = "none";
      });

    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
      selectedPage.style.display = "block";
    }

    // Clear any existing messages
    document.querySelectorAll(".messageDiv").forEach((div) => {
      div.style.display = "none";
    });
  });
});

let ForgotPassLabel = document.getElementById("forgotpasslabel");

let ForgotPassword = (e) => {
  e.preventDefault();

  // Sign out and clear any existing tokens first
  signOut(auth)
    .then(() => {
      // Clear any persisted auth data
      indexedDB.deleteDatabase("firebaseLocalStorageDb");
      localStorage.clear();
      sessionStorage.clear();

      return sendPasswordResetEmail(auth, email.value);
    })
    .then(() => {
      alert("A password reset link has been sent to your email");

      // Redirect to login page
      setTimeout(() => {
        window.location.href = "login.html"; // or your login page URL
        // Force a page reload to clear any cached auth states
        window.location.reload(true);
      }, 3000);
    })
    .catch((error) => {
      console.error("Full error object:", error); // Log the full error
      let errorMessage;
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/user-not-found":
          errorMessage = "No account found with this email";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your connection.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many attempts. Please try again later.";
          break;
        default:
          errorMessage = `Error: ${error.message}`;
      }
      alert(errorMessage);
    });
};
auth.onAuthStateChanged((user) => {
  console.log(
    "Auth state changed:",
    user ? "User is signed in" : "User is signed out"
  );
  if (user) {
    // User is signed in
    console.log("Current user email:", user.email);
  }
});
document.addEventListener("DOMContentLoaded", () => {
  // Forgot password link
  if (ForgotPassLabel) {
    ForgotPassLabel.addEventListener("click", ForgotPassword);
  }
});
// Make sure the initial page is visible
window.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash || "#signin-page";
  document.querySelector(`a[href="${hash}"]`)?.click();
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
