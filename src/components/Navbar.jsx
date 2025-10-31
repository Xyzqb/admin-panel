import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Stack,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../assets/digidial_logo.jpg";
import { useNavigate } from "react-router-dom";

export const NAVBAR_HEIGHT = 48;

const Navbar = () => {
  const navigate = useNavigate();
  const [openKYC, setOpenKYC] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // clear token
    navigate("/login");
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          height: `${NAVBAR_HEIGHT}px`,
          background: "#334155",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            minHeight: `${NAVBAR_HEIGHT}px !important`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left: Logo and Title */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              component="img"
              src={logo}
              alt="digidial"
              sx={{ height: 40, width: 40, borderRadius: "50%" }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                // background: "linear-gradient(to right, #6366f1, #8b5cf6)",
                WebkitBackgroundClip: "text",
                letterSpacing: "1px",
              }}
            >
              DigiDial
            </Typography>
          </Stack>

          {/* Right: Icons and Logout */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              variant="contained"
              color="#00bfa5"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ ml: 1 }}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
