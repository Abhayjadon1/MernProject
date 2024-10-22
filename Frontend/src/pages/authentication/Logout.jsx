// import { useAuth } from "contexts/AuthContext";
// import React from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const Logout = () => {
//   const [auth, setAuth] = useAuth();
//   const navigate = useNavigate(); // Hook for navigation

//   const handleLogout = () => {
//     // Clear the auth state and local storage
//     setAuth({
//       ...auth,
//       user: null,
//       token: "",
//     });
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("user");

//     // Show success toast
//     toast.success("Logged out successfully!");

//     // Navigate to the login page
//     navigate("/login");
//   };

//   // Render logout button or action
//   return (
//     <div>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default Logout;

import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

const Logout = () => {
  const [auth, setAuth] = useAuth();
  const [open, setOpen] = useState(false); // State to manage dialog visibility
  const navigate = useNavigate(); // Hook for navigation

  // Function to open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Clear the auth state and local storage
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");

    // Show success toast
    toast.success("Logged out successfully!");

    // Navigate to the login page
    navigate("/login");
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Logout
      </Button>

      {/* Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to logout?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Logging out will clear your session and require you to log in again
            to access the app.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleLogout();
              handleClose();
            }}
            color="secondary"
            autoFocus
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default Logout;
