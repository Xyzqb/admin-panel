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
// } from "@mui/icons-material";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

// const drawerWidth = 240;

// const Sidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [companyOpen, setCompanyOpen] = useState(false);
//   const [companyAgentsOpen, setCompanyAgentsOpen] = useState(false);
//   const [agentsTeamsOpen, setAgentsTeamsOpen] = useState(false);
//   const [adminsOpen, setAdminsOpen] = useState(false);
//   const [teamsOpen, setTeamsOpen] = useState(false); // new
//   const [webhookOpen, setWebhookOpen] = useState(false); // new

//   const handleCompanyClick = () => setCompanyOpen(!companyOpen);
//   const handleCompanyAgentsClick = () =>
//     setCompanyAgentsOpen(!companyAgentsOpen);
//   const handleAgentsTeamsClick = () => setAgentsTeamsOpen(!agentsTeamsOpen);
//   const handleAdminsClick = () => setAdminsOpen(!adminsOpen);
//   const handleTeamsClick = () => setTeamsOpen(!teamsOpen);
//   const handleWebhookClick = () => setWebhookOpen(!webhookOpen);

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     navigate("/login");
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
//         },
//       }}
//     >
//       <Toolbar sx={{ justifyContent: "center" }}>
//         <Typography variant="h6" sx={{ color: "#fff", fontWeight:"bold"}}>
//           Super Admin
//         </Typography>
//       </Toolbar>

//       <List>
//         {/* Dashboard */}
//         <ListItem disablePadding>
//           <ListItemButton
//             component={Link}
//             to="/"
//             selected={location.pathname === "/"}
//             sx={{ color: "#fff" }}
//           >
//             <ListItemIcon sx={{ color: "#fff" }}>
//               <Dashboard />
//             </ListItemIcon>
//             <ListItemText primary="Dashboard" sx={{fontWeight:"bold"}}/>
//           </ListItemButton>
//         </ListItem>

//         {/* Companies */}
//         <ListItem disablePadding>
//           <ListItemButton onClick={handleCompanyClick} sx={{ color: "#fff" }}>
//             <ListItemIcon sx={{ color: "#fff" }}>
//               <Business />
//             </ListItemIcon>
//             <ListItemText primary="Companies" sx={{fontWeight:"bold"}} />
//             {companyOpen ? <ExpandLess /> : <ExpandMore />}
//           </ListItemButton>
//         </ListItem>

//         <Collapse in={companyOpen} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             {/* Company Options */}
//             <ListItemButton
//               component={Link}
//               to="/companies/add-new-company"
//               sx={{ pl: 4, color: "#fff" }}
//               selected={location.pathname === "/companies/add-new-company"}
//             >
//               <ListItemText primary="Add Company" sx={{fontWeight:"bold", pl:4}} />
//             </ListItemButton>

//             <ListItemButton
//               component={Link}
//               to="/companies/kyc-details"
//               sx={{ pl: 4, color: "#fff" }}
//               selected={location.pathname === "/companies/kyc-details"}
//             >
//               <ListItemText primary="Kyc Details"  sx={{fontWeight:"bold", pl:4}}/>
//             </ListItemButton>

//             {/* Admins Submenu */}
//             <ListItemButton
//               onClick={handleAdminsClick}
//               sx={{ pl: 4, color: "#fff" }}
//             >
//               {/* <SupervisorAccountIcon sx={{color: "#fff" }}/> */}
//               <ListItemText primary="Admins" sx={{fontWeight:"bold"}} />
//               {adminsOpen ? <ExpandLess /> : <ExpandMore />}
//             </ListItemButton>

//             <Collapse in={adminsOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItemButton
//                   component={Link}
//                   to="/admins/admin-details"
//                   sx={{ pl: 8, color: "#fff" }}
//                   selected={location.pathname === "/admins/admin-details"}
//                 >
//                   <ListItemText primary="Admin Details" />
//                 </ListItemButton>
//               </List>
//             </Collapse>

//             {/* Agents Submenu */}
//             <ListItemButton
//               onClick={handleCompanyAgentsClick}
//               sx={{ pl: 4, color: "#fff" }}
//             >
//               <ListItemText primary="Agents" />
//               {companyAgentsOpen ? <ExpandLess /> : <ExpandMore />}
//             </ListItemButton>

//             <Collapse in={companyAgentsOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItemButton
//                   component={Link}
//                   to="/agents/profile"
//                   sx={{ pl: 8, color: "#fff" }}
//                   selected={location.pathname === "/agents/profile"}
//                 >
//                   <ListItemText primary="Agent Details" />
//                 </ListItemButton>
//               </List>
//             </Collapse>

//             {/* Teams Section */}
//             <ListItemButton
//               onClick={handleTeamsClick}
//               sx={{ pl: 4, color: "#fff" }}
//             >
//               <ListItemText primary="Teams" />
//               {teamsOpen ? <ExpandLess /> : <ExpandMore />}
//             </ListItemButton>

//             <Collapse in={teamsOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItemButton
//                   component={Link}
//                   to="/Teams/teams-page"
//                   sx={{ pl: 8, color: "#fff" }}
//                   selected={location.pathname === "/Teams/teams-page"}
//                 >
//                   <ListItemText primary="Team Page" />
//                 </ListItemButton>

//                 <ListItemButton
//                   component={Link}
//                   to="/Teams/teams-member"
//                   sx={{ pl: 8, color: "#fff" }}
//                   selected={location.pathname === "/Teams/teams-member"}
//                 >
//                   <ListItemText primary="Team Members" />
//                 </ListItemButton>
//               </List>
//             </Collapse>

//             {/* WebHook Section */}
//             <ListItemButton
//               onClick={() => setWebhookOpen(!webhookOpen)}
//               sx={{ pl: 4, color: "#fff" }}
//             >
  
//               <ListItemText primary="WebHook" />
//               {webhookOpen ? <ExpandLess /> : <ExpandMore />}
//             </ListItemButton>

//             <Collapse in={webhookOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 {/* Log Details */}
//                 <ListItemButton
//                   component={Link}
//                   to="/WebHook/log-details"
//                   sx={{ pl: 8, color: "#fff" }}
//                   selected={location.pathname === "/WebHook/log-details"}
//                 >
//                   <ListItemText primary="Log Details" />
//                 </ListItemButton>
//               </List>
//             </Collapse>
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
//         <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
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
  Box,
  Collapse,
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
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [companyOpen, setCompanyOpen] = useState(false);
  const [companyAgentsOpen, setCompanyAgentsOpen] = useState(false);
  const [adminsOpen, setAdminsOpen] = useState(false);
  const [teamsOpen, setTeamsOpen] = useState(false);
  const [webhookOpen, setWebhookOpen] = useState(false);

  const handleCompanyClick = () => setCompanyOpen(!companyOpen);
  const handleCompanyAgentsClick = () => setCompanyAgentsOpen(!companyAgentsOpen);
  const handleAdminsClick = () => setAdminsOpen(!adminsOpen);
  const handleTeamsClick = () => setTeamsOpen(!teamsOpen);
  const handleWebhookClick = () => setWebhookOpen(!webhookOpen);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  // ✅ Function to check if current route is active
  const isActive = (path) => location.pathname === path;

  // ✅ Reusable active style
  const activeStyle = {
    backgroundColor: "#0288d1",
    boxShadow: "0 3px 10px rgba(2, 136, 209, 0.4)",
    color: "#fff",
    borderRadius: "8px",
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "#334155",
          mt: 5,
          height: "calc(100vh - 20px)",
          overflowY: "auto",
          transition: "all 0.3s ease-in-out",
        },
      }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
          Super Admin
        </Typography>
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
              transition: "all 0.3s ease",
              "&:hover": { backgroundColor: "#1e293b" },
            }}
          >
            <ListItemIcon sx={{ color: isActive("/") ? "#fff" : "#fff" }}>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ fontWeight: "bold" }} />
          </ListItemButton>
        </ListItem>

        {/* Companies */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleCompanyClick}
            sx={{
              color: "#fff",
              ...(companyOpen && activeStyle),
              transition: "all 0.3s ease",
              "&:hover": { backgroundColor: "#1e293b" },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <Business />
            </ListItemIcon>
            <ListItemText primary="Companies" sx={{ fontWeight: "bold" }} />
            {companyOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        {/* Smooth slide for submenus */}
        <Collapse
          in={companyOpen}
          timeout="auto"
          unmountOnExit
          sx={{
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <List component="div" disablePadding>
            {/* Add Company */}
            <ListItemButton
              component={Link}
              to="/companies/add-new-company"
              sx={{
                pl: 4,
                color: "#fff",
                ...(isActive("/companies/add-new-company") && activeStyle),
                transition: "all 0.3s ease",
                "&:hover": { backgroundColor: "#1e293b" },
              }}
            >
              <ListItemText
                primary="Add Company"
                sx={{ fontWeight: "bold", pl: 4 }}
              />
            </ListItemButton>

            {/* KYC Details */}
            <ListItemButton
              component={Link}
              to="/companies/kyc-details"
              sx={{
                pl: 4,
                color: "#fff",
                ...(isActive("/companies/kyc-details") && activeStyle),
                transition: "all 0.3s ease",
                "&:hover": { backgroundColor: "#1e293b" },
              }}
            >
              <ListItemText
                primary="KYC Details"
                sx={{ fontWeight: "bold", pl: 4 }}
              />
            </ListItemButton>

            {/* Admins */}
            <ListItemButton
              onClick={handleAdminsClick}
              sx={{
                pl: 4,
                color: "#fff",
                ...(adminsOpen && activeStyle),
                transition: "all 0.3s ease",
                "&:hover": { backgroundColor: "#1e293b" },
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText primary="Admins" sx={{ fontWeight: "bold" }} />
              {adminsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={adminsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  component={Link}
                  to="/admins/admin-details"
                  sx={{
                    pl: 8,
                    color: "#fff",
                    ...(isActive("/admins/admin-details") && activeStyle),
                    transition: "all 0.3s ease",
                    "&:hover": { backgroundColor: "#1e293b" },
                  }}
                >
                  <ListItemText primary="Admin Details" />
                </ListItemButton>
              </List>
            </Collapse>

            {/* Agents */}
            <ListItemButton
              onClick={handleCompanyAgentsClick}
              sx={{
                pl: 4,
                color: "#fff",
                ...(companyAgentsOpen && activeStyle),
                transition: "all 0.3s ease",
                "&:hover": { backgroundColor: "#1e293b" },
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <People />
              </ListItemIcon>
              <ListItemText primary="Agents" />
              {companyAgentsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={companyAgentsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  component={Link}
                  to="/agents/profile"
                  sx={{
                    pl: 8,
                    color: "#fff",
                    ...(isActive("/agents/profile") && activeStyle),
                    transition: "all 0.3s ease",
                    "&:hover": { backgroundColor: "#1e293b" },
                  }}
                >
                  <ListItemText primary="Agent Details" />
                </ListItemButton>
              </List>
            </Collapse>

            {/* Teams */}
            <ListItemButton
              onClick={handleTeamsClick}
              sx={{
                pl: 4,
                color: "#fff",
                ...(teamsOpen && activeStyle),
                transition: "all 0.3s ease",
                "&:hover": { backgroundColor: "#1e293b" },
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Teams" />
              {teamsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={teamsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  component={Link}
                  to="/Teams/teams-page"
                  sx={{
                    pl: 8,
                    color: "#fff",
                    ...(isActive("/Teams/teams-page") && activeStyle),
                    transition: "all 0.3s ease",
                    "&:hover": { backgroundColor: "#1e293b" },
                  }}
                >
                  <ListItemText primary="Team Page" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/Teams/teams-member"
                  sx={{
                    pl: 8,
                    color: "#fff",
                    ...(isActive("/Teams/teams-member") && activeStyle),
                    transition: "all 0.3s ease",
                    "&:hover": { backgroundColor: "#1e293b" },
                  }}
                >
                  <ListItemText primary="Team Members" />
                </ListItemButton>
              </List>
            </Collapse>

            {/* Webhook */}
            <ListItemButton
              onClick={handleWebhookClick}
              sx={{
                pl: 4,
                color: "#fff",
                ...(webhookOpen && activeStyle),
                transition: "all 0.3s ease",
                "&:hover": { backgroundColor: "#1e293b" },
              }}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <LinkIcon />
              </ListItemIcon>
              <ListItemText primary="Webhook" />
              {webhookOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={webhookOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  component={Link}
                  to="/WebHook/log-details"
                  sx={{
                    pl: 8,
                    color: "#fff",
                    ...(isActive("/WebHook/log-details") && activeStyle),
                    transition: "all 0.3s ease",
                    "&:hover": { backgroundColor: "#1e293b" },
                  }}
                >
                  <ListItemText primary="Log Details" />
                </ListItemButton>
              </List>
            </Collapse>
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
          color: "#888",
        }}
      >
        Powered by{" "}
        <Box component="span" sx={{ color: "#0288d1", fontWeight: "bold" }}>
          Bitmax
        </Box>
      </Typography>
    </Drawer>
  );
};

export default Sidebar;


