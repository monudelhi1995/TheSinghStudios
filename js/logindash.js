import { handleLogout } from "./firebaseauth.js";

document.getElementById("logout-button").addEventListener("click", () => {
  handleLogout()
    .then(() => {
      console.log("User logged out successfully.");
    })
    .catch((error) => {
      console.error("Error during logout:", error);
    });
});
