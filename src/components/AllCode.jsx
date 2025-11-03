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