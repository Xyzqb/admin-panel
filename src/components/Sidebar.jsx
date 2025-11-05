// import React, { useState } from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   ListItemIcon,
//   Toolbar,
//   Typography,
//   Box,
//   Collapse,
// } from "@mui/material";
// import {
//   Dashboard,
//   People,
//   Business,
//   ExpandLess,
//   ExpandMore,
//   Group,
//   Lan,
//   Link as LinkIcon,
//   AddCircleOutline,
//   Edit,
//   Delete,
//   Info,
// } from "@mui/icons-material";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

// const menuBg = "#334155"; // dark main menu background
// const submenuBg = "#475569"; // slightly lighter for submenu

// const drawerWidth = 240;

// const Sidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // ✅ Dropdown states
//   const [companyOpen, setCompanyOpen] = useState(false);
//   const [companyAgentsOpen, setCompanyAgentsOpen] = useState(false);
//   const [adminsOpen, setAdminsOpen] = useState(false);
//   const [teamsOpen, setTeamsOpen] = useState(false);
//   const [webhookOpen, setWebhookOpen] = useState(false);
//   const [plansOpen, setPlansOpen] = useState(false);

//   // ✅ Handlers
//   const handleCompanyClick = () => setCompanyOpen(!companyOpen);
//   const handleCompanyAgentsClick = () =>
//     setCompanyAgentsOpen(!companyAgentsOpen);
//   const handleAdminsClick = () => setAdminsOpen(!adminsOpen);
//   const handleTeamsClick = () => setTeamsOpen(!teamsOpen);
//   const handleWebhookClick = () => setWebhookOpen(!webhookOpen);
//   const handlePlansClick = () => setPlansOpen(!plansOpen);

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     navigate("/login");
//   };

//   const isActive = (path) => location.pathname === path;

//   const activeStyle = {
//     backgroundColor: "#0288d1",
//     boxShadow: "0 3px 10px rgba(2, 136, 209, 0.4)",
//     color: "#fff",
//     borderRadius: "8px",
//   };

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: drawerWidth,
//         [`& .MuiDrawer-paper`]: {
//           width: drawerWidth,
//           boxSizing: "border-box",
//           background: "#334155",
//           mt: 5,
//           height: "calc(100vh - 20px)",
//           overflowY: "auto",
//           transition: "all 0.3s ease-in-out",
//         },
//       }}
//     >
//       {/* Header */}
//       <Toolbar sx={{ justifyContent: "center" }}>
//         <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
//           Super Admin
//         </Typography>
//       </Toolbar>

//       <List>
//         {/* Dashboard */}
//         <ListItem disablePadding>
//           <ListItemButton
//             component={Link}
//             to="/"
//             selected={isActive("/")}
//             sx={{
//               color: "#fff",
//               ...(isActive("/") && activeStyle),
//               "&:hover": { backgroundColor: "#1e293b" },
//             }}
//           >
//             <ListItemIcon sx={{ color: "#fff" }}>
//               <Dashboard />
//             </ListItemIcon>
//             <ListItemText primary="Dashboard" />
//           </ListItemButton>
//         </ListItem>

//         {/* Companies */}
//         <ListItem disablePadding>
//           <ListItemButton
//             onClick={handleCompanyClick}
//             sx={{
//               color: "#fff",
//               ...(companyOpen && activeStyle),
//               "&:hover": { backgroundColor: "#1e293b" },
//             }}
//           >
//             <ListItemIcon sx={{ color: "#fff" }}>
//               <Business />
//             </ListItemIcon>
//             <ListItemText primary="Companies" />
//             {companyOpen ? <ExpandLess /> : <ExpandMore />}
//           </ListItemButton>
//         </ListItem>

//         {/* Company Submenu */}
//         <Collapse in={companyOpen} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItemButton
//               component={Link}
//               to="/companies/add-new-company"
//               sx={{
//                 pl: 8,
//                 color: "#fff",
//                 ...(isActive("/companies/add-new-company") && activeStyle),
//                 "&:hover": { backgroundColor: "#1e293b" },
//               }}
//             >
//               <ListItemText primary="Add Company" />
//             </ListItemButton>

//             <ListItemButton
//               component={Link}
//               to="/companies/kyc-details"
//               sx={{
//                 pl: 8,
//                 color: "#fff",
//                 ...(isActive("/companies/kyc-details") && activeStyle),
//                 "&:hover": { backgroundColor: "#1e293b" },
//               }}
//             >
//               <ListItemText primary="KYC Details" />
//             </ListItemButton>

//             {/* Admins */}
//             <ListItemButton
//               onClick={handleAdminsClick}
//               sx={{
//                 pl: 8,
//                 color: "#fff",
//                 ...(adminsOpen && activeStyle),
//                 "&:hover": { backgroundColor: "#1e293b" },
//               }}
//             >
//               <ListItemIcon sx={{ color: "#fff" }}>
//                 <SupervisorAccountIcon />
//               </ListItemIcon>
//               <ListItemText primary="Admins" />
//               {adminsOpen ? <ExpandLess /> : <ExpandMore />}
//             </ListItemButton>

//             <Collapse in={adminsOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItemButton
//                   component={Link}
//                   to="/admins/admin-details"
//                   sx={{
//                     pl: 10,
//                     color: "#fff",
//                     ...(isActive("/admins/admin-details") && activeStyle),
//                     "&:hover": { backgroundColor: "#1e293b" },
//                   }}
//                 >
//                   <ListItemText primary="Admin Details" />
//                 </ListItemButton>
//               </List>
//             </Collapse>

//             {/* Agents */}
//             <ListItemButton
//               onClick={handleCompanyAgentsClick}
//               sx={{
//                 pl: 8,
//                 color: "#fff",
//                 ...(companyAgentsOpen && activeStyle),
//                 "&:hover": { backgroundColor: "#1e293b" },
//               }}
//             >
//               <ListItemIcon sx={{ color: "#fff" }}>
//                 <People />
//               </ListItemIcon>
//               <ListItemText primary="Agents" />
//               {companyAgentsOpen ? <ExpandLess /> : <ExpandMore />}
//             </ListItemButton>

//             <Collapse in={companyAgentsOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItemButton
//                   component={Link}
//                   to="/agents/profile"
//                   sx={{
//                     pl: 10,
//                     color: "#fff",
//                     ...(isActive("/agents/profile") && activeStyle),
//                     "&:hover": { backgroundColor: "#1e293b" },
//                   }}
//                 >
//                   <ListItemText primary="Agent Details" />
//                 </ListItemButton>
//               </List>
//             </Collapse>

//             {/* Teams */}
//             <ListItemButton
//               onClick={handleTeamsClick}
//               sx={{
//                 pl: 8,
//                 color: "#fff",
//                 ...(teamsOpen && activeStyle),
//                 "&:hover": { backgroundColor: "#1e293b" },
//               }}
//             >
//               <ListItemIcon sx={{ color: "#fff" }}>
//                 <Group />
//               </ListItemIcon>
//               <ListItemText primary="Teams" />
//               {teamsOpen ? <ExpandLess /> : <ExpandMore />}
//             </ListItemButton>

//             <Collapse in={teamsOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItemButton
//                   component={Link}
//                   to="/Teams/teams-page"
//                   sx={{
//                     pl: 10,
//                     color: "#fff",
//                     ...(isActive("/Teams/teams-page") && activeStyle),
//                     "&:hover": { backgroundColor: "#1e293b" },
//                   }}
//                 >
//                   <ListItemText primary="Team Page" />
//                 </ListItemButton>

//                 <ListItemButton
//                   component={Link}
//                   to="/Teams/teams-member"
//                   sx={{
//                     pl: 10,
//                     color: "#fff",
//                     ...(isActive("/Teams/teams-member") && activeStyle),
//                     "&:hover": { backgroundColor: "#1e293b" },
//                   }}
//                 >
//                   <ListItemText primary="Team Members" />
//                 </ListItemButton>
//               </List>
//             </Collapse>
//           </List>
//         </Collapse>

//         {/* ✅ Plans Section (Independent) */}
//         <ListItem disablePadding>
//           <ListItemButton
//             onClick={handlePlansClick}
//             sx={{
//               color: "#fff",
//               ...(plansOpen && activeStyle),
//               "&:hover": { backgroundColor: "#1e293b" },
//             }}
//           >
//             <ListItemIcon sx={{ color: "#fff" }}>
//               <Lan />
//             </ListItemIcon>
//             <ListItemText primary="Plans" />
//             {plansOpen ? <ExpandLess /> : <ExpandMore />}
//           </ListItemButton>
//         </ListItem>

//         <Collapse in={plansOpen} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItemButton
//               component={Link}
//               to="/plans/plan-details"
//               sx={{
//                 pl: 8,
//                 color: "#fff",
//                 ...(isActive("/plans/plan-details") && activeStyle),
//                 "&:hover": { backgroundColor: "#a6b6cfff" },
//               }}
//             >
//               <ListItemIcon sx={{ color: "#fff" }}>
//                 <Info />
//               </ListItemIcon>
//               <ListItemText primary="Plan Details" />
//             </ListItemButton>
//           </List>
//         </Collapse>

//         {/* Webhook */}
//         <ListItem disablePadding>
//           <ListItemButton
//             onClick={handleWebhookClick}
//             sx={{
//               color: "#fff",
//               ...(webhookOpen && activeStyle),
//               "&:hover": { backgroundColor: "#1e293b" },
//             }}
//           >
//             <ListItemIcon sx={{ color: "#fff" }}>
//               <LinkIcon />
//             </ListItemIcon>
//             <ListItemText primary="Webhook" />
//             {webhookOpen ? <ExpandLess /> : <ExpandMore />}
//           </ListItemButton>
//         </ListItem>

//         <Collapse in={webhookOpen} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItemButton
//               component={Link}
//               to="/WebHook/log-details"
//               sx={{
//                 pl: 8,
//                 color: "#fff",
//                 ...(isActive("/WebHook/log-details") && activeStyle),
//                 "&:hover": { backgroundColor: "#1e293b" },
//               }}
//             >
//               <ListItemText primary="Log Details" />
//             </ListItemButton>
//           </List>
//         </Collapse>
//       </List>

//       {/* Footer */}
//       <Typography
//         variant="caption"
//         sx={{
//           mr: 5,
//           mt: 40,
//           display: "block",
//           textAlign: "center",
//           color: "#888",
//         }}
//       >
//         Powered by{" "}
//         <Box component="span" sx={{ color: "#0288d1", fontWeight: "bold" }}>
//           Bitmax
//         </Box>
//       </Typography>
//     </Drawer>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Typography,
  Collapse,
  Box,
} from "@mui/material";
import {
  Dashboard,
  People,
  Business,
  ExpandLess,
  ExpandMore,
  Group,
  Lan,
  Link as LinkIcon,
  Info,
} from "@mui/icons-material";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DehazeIcon from "@mui/icons-material/Dehaze";

// 🎨 Color Constants
const menuBg = "#334155"; // dark main menu background
const submenuBg = "#475569"; // slightly lighter for submenu
const activeColor = "#798391ff";

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Dropdown states
  const [companyOpen, setCompanyOpen] = useState(false);
  const [companyAgentsOpen, setCompanyAgentsOpen] = useState(false);
  const [adminsOpen, setAdminsOpen] = useState(false);
  const [teamsOpen, setTeamsOpen] = useState(false);
  const [webhookOpen, setWebhookOpen] = useState(false);
  const [plansOpen, setPlansOpen] = useState(false);

  // Handlers
  const handleCompanyClick = () => setCompanyOpen(!companyOpen);
  const handleCompanyAgentsClick = () =>
    setCompanyAgentsOpen(!companyAgentsOpen);
  const handleAdminsClick = () => setAdminsOpen(!adminsOpen);
  const handleTeamsClick = () => setTeamsOpen(!teamsOpen);
  const handleWebhookClick = () => setWebhookOpen(!webhookOpen);
  const handlePlansClick = () => setPlansOpen(!plansOpen);
  const [SidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const activeStyle = {
    backgroundColor: activeColor,
    color: "#fff",
    borderRadius: "8px",
    boxShadow: "0 3px 10px rgba(2, 136, 209, 0.4)",
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SidebarOpen ? drawerWidth : 70,
        transition: "width 0.3s ease",
        [`& .MuiDrawer-paper`]: {
          width: SidebarOpen ? drawerWidth : 70,
          boxSizing: "border-box",
          background: menuBg,
          mt: 5,
          height: "calc(100vh - 20px)",
          overflowY: "auto",
          transition: "all 0.3s ease-in-out",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#64748b",
            borderRadius: "10px",
          },
        },
      }}
    >
      {/* Header */}
      <Toolbar
        sx={{
          justifyContent: "flex-start",
          ml: -1,
          cursor: "pointer",
          display: "flex",
        }}
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        <DehazeIcon sx={{ color: "#fff", fontSize: 26 }} />
        {SidebarOpen && (
          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.2rem",
              display: "flex",
              ml: 2,
            }}
          >
            Super Admin
          </Typography>
        )}
      </Toolbar>

      <List>
        {/* Dashboard */}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/"
            selected={isActive("/")}
            sx={{
              color: "#fff",
              ...(isActive("/") && activeStyle),
              "&:hover": { backgroundColor: submenuBg },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <Dashboard />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: "0.95rem",
              }}
            />
          </ListItemButton>
        </ListItem>

        {/* Companies */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleCompanyClick}
            sx={{
              color: "#fff",
              ...(companyOpen && activeStyle),
              "&:hover": { backgroundColor: submenuBg },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <Business />
            </ListItemIcon>
            <ListItemText
              primary="Companies"
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: "0.95rem",
              }}
            />
            {companyOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        {/* Company Submenu */}
        <Collapse in={companyOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ background: submenuBg }}>
            <ListItemButton
              component={Link}
              to="/companies/add-new-company"
              sx={{
                pl: 8,
                color: "#fff",
                ...(isActive("/companies/add-new-company") && activeStyle),
                "&:hover": { backgroundColor: "#1e293b" },
              }}
            >
              <ListItemText
                primary="Add Company"
                primaryTypographyProps={{ fontSize: "0.85rem" }}
              />
            </ListItemButton>

            <ListItemButton
              component={Link}
              to="/companies/kyc-details"
              sx={{
                pl: 8,
                color: "#fff",
                ...(isActive("/companies/kyc-details") && activeStyle),
                "&:hover": { backgroundColor: "#1e293b" },
              }}
            >
              <ListItemText
                primary="KYC Details"
                primaryTypographyProps={{ fontSize: "0.85rem" }}
              />
            </ListItemButton>

            {/* Admins */}
            <ListItemButton
              onClick={handleAdminsClick}
              sx={{
                pl: 8,
                color: "#fff",
                ...(adminsOpen && activeStyle),
                "&:hover": { backgroundColor: "#1e293b" },
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText
                primary="Admins"
                primaryTypographyProps={{ fontSize: "0.85rem" }}
              />
              {adminsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={adminsOpen} timeout="auto" unmountOnExit>
              <List
                component="div"
                disablePadding
                sx={{ background: submenuBg }}
              >
                <ListItemButton
                  component={Link}
                  to="/admins/admin-details"
                  sx={{
                    pl: 10,
                    color: "#fff",
                    ...(isActive("/admins/admin-details") && activeStyle),
                    "&:hover": { backgroundColor: "#1e293b" },
                  }}
                >
                  <ListItemText
                    primary="Admin Details"
                    primaryTypographyProps={{ fontSize: "0.8rem" }}
                  />
                </ListItemButton>
              </List>
            </Collapse>

            {/* Agents */}
            <ListItemButton
              onClick={handleCompanyAgentsClick}
              sx={{
                pl: 8,
                color: "#fff",
                ...(companyAgentsOpen && activeStyle),
                "&:hover": { backgroundColor: "#1e293b" },
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <People />
              </ListItemIcon>
              <ListItemText
                primary="Agents"
                primaryTypographyProps={{ fontSize: "0.85rem" }}
              />
              {companyAgentsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={companyAgentsOpen} timeout="auto" unmountOnExit>
              <List
                component="div"
                disablePadding
                sx={{ background: submenuBg }}
              >
                <ListItemButton
                  component={Link}
                  to="/agents/profile"
                  sx={{
                    pl: 10,
                    color: "#fff",
                    ...(isActive("/agents/profile") && activeStyle),
                    "&:hover": { backgroundColor: "#1e293b" },
                  }}
                >
                  <ListItemText
                    primary="Agent Details"
                    primaryTypographyProps={{ fontSize: "0.8rem" }}
                  />
                </ListItemButton>
              </List>
            </Collapse>

            {/* Teams */}
            <ListItemButton
              onClick={handleTeamsClick}
              sx={{
                pl: 8,
                color: "#fff",
                ...(teamsOpen && activeStyle),
                "&:hover": { backgroundColor: "#1e293b" },
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <Group />
              </ListItemIcon>
              <ListItemText
                primary="Teams"
                primaryTypographyProps={{ fontSize: "0.85rem" }}
              />
              {teamsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={teamsOpen} timeout="auto" unmountOnExit>
              <List
                component="div"
                disablePadding
                sx={{ background: submenuBg }}
              >
                <ListItemButton
                  component={Link}
                  to="/Teams/teams-page"
                  sx={{
                    pl: 10,
                    color: "#fff",
                    ...(isActive("/Teams/teams-page") && activeStyle),
                    "&:hover": { backgroundColor: "#1e293b" },
                  }}
                >
                  <ListItemText
                    primary="Team Page"
                    primaryTypographyProps={{ fontSize: "0.8rem" }}
                  />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/Teams/teams-member"
                  sx={{
                    pl: 10,
                    color: "#fff",
                    ...(isActive("/Teams/teams-member") && activeStyle),
                    "&:hover": { backgroundColor: "#1e293b" },
                  }}
                >
                  <ListItemText
                    primary="Team Members"
                    primaryTypographyProps={{ fontSize: "0.8rem" }}
                  />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Collapse>

        {/* Plans */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handlePlansClick}
            sx={{
              color: "#fff",
              ...(plansOpen && activeStyle),
              "&:hover": { backgroundColor: submenuBg },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <Lan />
            </ListItemIcon>
            <ListItemText
              primary="Plans"
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: "0.95rem",
              }}
            />
            {plansOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={plansOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ background: submenuBg }}>
            <ListItemButton
              component={Link}
              to="/plans/plan-details"
              sx={{
                pl: 8,
                color: "#fff",
                ...(isActive("/plans/plan-details") && activeStyle),
                "&:hover": { backgroundColor: "#1e293b" },
              }}
            >
              <ListItemText
                primary="Plan Details"
                primaryTypographyProps={{ fontSize: "0.85rem" }}
              />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Webhook */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleWebhookClick}
            sx={{
              color: "#fff",
              ...(webhookOpen && activeStyle),
              "&:hover": { backgroundColor: submenuBg },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <LinkIcon />
            </ListItemIcon>
            <ListItemText
              primary="Webhook"
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: "0.95rem",
              }}
            />
            {webhookOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={webhookOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ background: submenuBg }}>
            <ListItemButton
              component={Link}
              to="/WebHook/log-details"
              sx={{
                pl: 8,
                color: "#fff",
                ...(isActive("/WebHook/log-details") && activeStyle),
                "&:hover": { backgroundColor: "#1e293b" },
              }}
            >
              <ListItemText
                primary="Log Details"
                primaryTypographyProps={{ fontSize: "0.85rem" }}
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      {/* Footer */}
      <Typography
        variant="caption"
        sx={{
          mr: 5,
          mt: 40,
          display: "block",
          textAlign: "center",
          color: "#94a3b8",
        }}
      >
        Powered by{" "}
        <Box component="span" sx={{ color: activeColor, fontWeight: "bold" }}>
          Bitmax
        </Box>
      </Typography>
    </Drawer>
  );
};

export default Sidebar;
