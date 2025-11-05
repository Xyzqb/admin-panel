// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   Stack,
//   Table,
//   TableHead,
//   TableCell,
//   TableRow,
//   TableBody,
//   TableContainer,
//   CircularProgress,
//   Snackbar,
//   Alert,
//   Avatar,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
// import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded";
// import { Subject } from "@mui/icons-material";

// const BASE_URL = "https://digidialersuperadmin.onrender.com";

// const AgentsDetails = () => {
//   const [agents, setAgents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchId, setSearchId] = useState("");
//   const [searchAdminId, setSearchAdminId] = useState("");
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [currentAgent, setCurrentAgent] = useState(null);

//   const [showCreatedAt, setShowCreatedAt] = useState(false);

//   const showSnackbar = (message, severity) =>
//     setSnackbar({ open: true, message, severity });

//   // Search by Agent ID
//   const fetchAgents = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/api/superadmin/agent/getagent`);
//       console.log("Full API Response:", res.data);

//       const rawAgents = res.data.agents || [];

//       // Map API keys to your table keys
//       const result = rawAgents.map((agent) => ({
//         _id: agent._id || agent.id,
//         name: agent.name,
//         email: agent.email,
//         mobile: agent.mobile,
//         profilePic: agent.profilePic,
//         createdAt: agent.createdAt || agent.created_at,
//       }));

//       setAgents(result);
//       showSnackbar("Agents loaded successfully!", "success");
//     } catch (err) {
//       console.error("Fetch Error:", err.response?.data || err);
//       showSnackbar("Failed to load agents", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Search agents under Admin
//   const searchAgentById = async () => {
//     if (!searchId.trim()) return showSnackbar("Enter agent ID", "warning");
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/api/superadmin/agent/${searchId.trim()}`
//       );
//       console.log("Search by ID Response:", res.data);

//       const rawAgent = res.data.agent || res.data; // API might return agent object directly
//       const result = rawAgent
//         ? [
//             {
//               _id: rawAgent._id || rawAgent.id,
//               name: rawAgent.name,
//               email: rawAgent.email,
//               mobile: rawAgent.mobile,
//               profilePic: rawAgent.profilePic,
//               createdAt: rawAgent.createdAt || rawAgent.created_at,
//             },
//           ]
//         : [];

//       setAgents(result);

//       if (result.length === 0) {
//         showSnackbar("Agent not found", "error");
//       } else {
//         showSnackbar("Agent found!", "success");
//       }
//     } catch (err) {
//       console.error("Search Error:", err.response?.data || err);
//       setAgents([]);
//       showSnackbar("Agent not found", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const searchAgentsByAdmin = async () => {
//     if (!searchAdminId.trim()) return showSnackbar("Enter admin ID", "warning");
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/api/superadmin/agent/admin/${searchAdminId.trim()}`
//       );
//       console.log("Search by Admin Response:", res.data);

//       const rawAgents = res.data?.agents || [];

//       const result = rawAgents.map((agent) => ({
//         _id: agent._id || agent.id,
//         name: agent.name,
//         email: agent.email,
//         mobile: agent.mobile,
//         profilePic: agent.profilePic || agent.profile_pic,
//         createdAt: agent.createdAt || agent.created_at,
//       }));

//       setAgents(result);

//       if (result.length === 0) {
//         showSnackbar("No agents found under this admin", "error");
//       } else {
//         showSnackbar("Agents under admin loaded successfully!", "success");
//       }
//     } catch (err) {
//       console.error("Search Admin Error:", err.response?.data || err);
//       setAgents([]);
//       showSnackbar("Failed to fetch agents under this admin", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearSearch = () => {
//     setSearchId("");
//     setSearchAdminId("");
//     fetchAgents();
//     showSnackbar("Showing all agents", "info");
//   };

//   // Delete agent
//   const handleDelete = async (_id) => {
//     if (!_id) return showSnackbar("Invalid agent ID", "error");
//     if (!window.confirm("Are you sure you want to delete this agent?")) return;

//     try {
//       await axios.delete(`${BASE_URL}/api/superadmin/agent/${_id}`);
//       setAgents((prev) => prev.filter((a) => a._id !== _id));
//       showSnackbar("Agent deleted successfully!", "success");
//     } catch (err) {
//       console.error("Delete Error:", err.response?.data || err);
//       showSnackbar("Failed to delete agent", "error");
//     }
//   };

//   // Open edit dialog
//   const handleEdit = (agent) => {
//     setCurrentAgent(agent);
//     setEditDialogOpen(true);
//   };

//   // Save edited agent
//   const saveEdit = async () => {
//     if (!currentAgent?._id) return showSnackbar("Invalid agent ID", "error");

//     try {
//       const payload = {
//         name: currentAgent.name,
//         email: currentAgent.email,
//         mobile: currentAgent.mobile,
//       };

//       const res = await axios.patch(
//         `${BASE_URL}/api/superadmin/agent/${currentAgent._id}`,
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );

//       console.log("Update Response:", res.data);

//       const updatedAgentRaw = res.data.updatedAgents;

//       const updatedAgent = {
//         _id: updatedAgentRaw.id,
//         name: updatedAgentRaw.name,
//         email: updatedAgentRaw.email,
//         mobile: updatedAgentRaw.mobile,
//         profilePic: updatedAgentRaw.profile_pic,
//         createdAt: updatedAgentRaw.createdAt || updatedAgentRaw.created_at,
//       };

//       setAgents((prev) =>
//         prev.map((a) => (a._id === updatedAgent._id ? updatedAgent : a))
//       );

//       setEditDialogOpen(false);
//       showSnackbar("Agent updated successfully!", "success");
//     } catch (err) {
//       console.error("Update Error:", err.response?.data || err);
//       showSnackbar("Failed to update agent", "error");
//     }
//   };

//   useEffect(() => {
//     fetchAgents();
//   }, []);

//   return (
//     <Box sx={{ p: 2, mx: "auto", mt: 3 }}>
//       <Typography variant="h5" mb={1} fontWeight="bold">
//         Agents Details
//       </Typography>

//       {/* Search Section */}
//       <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f8f9fa" }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">
//           Search Agents
//         </Typography>
//         <Stack
//           direction={{ xs: "column", md: "row" }}
//           spacing={2}
//           alignItems="flex-start"
//         >
//           <Box>
//             <TextField
//               label="Search by Agent ID"
//               value={searchId}
//               onChange={(e) => setSearchId(e.target.value)}
//               size="small"
//               sx={{ width: "300px" }}
//             />
//             <Button
//               variant="outlined"
//               onClick={searchAgentById}
//               sx={{
//                 mt: 1,
//                 width: "300px",
//                 bgcolor: "primary.main",
//                 color: "white",
//                 gap: 1,
//               }}
//             >
//               <PersonSearchRoundedIcon />
//               Search by ID
//             </Button>
//           </Box>
//           <Box>
//             <TextField
//               label="Search agents under Admin"
//               value={searchAdminId}
//               onChange={(e) => setSearchAdminId(e.target.value)}
//               size="small"
//               sx={{ width: "300px" }}
//             />
//             <Button
//               variant="outlined"
//               onClick={searchAgentsByAdmin}
//               sx={{
//                 mt: 1,
//                 width: "300px",
//                 bgcolor: "primary.main",
//                 color: "white",
//                 gap: 1,
//               }}
//             >
//               <PersonSearchRoundedIcon />
//               Search agents under Admin
//             </Button>
//           </Box>
//           <Box>
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={clearSearch}
//               sx={{
//                 mt: { xs: 2, md: 3 },
//                 width: "300px",
//                 height: "40px",
//                 gap: 1,
//                 mr: 6,
//               }}
//             >
//               <PersonSearchRoundedIcon />
//               Show All Agents
//             </Button>
//           </Box>
//         </Stack>
//       </Paper>

//       {/* Agents Table */}
//       <Paper sx={{ p: 2 }}>
//         <Box display="flex" alignItems="center" mb={2}>
//           <SupervisorAccountRoundedIcon sx={{ mr: 1 }} />
//           <Typography variant="h6" fontWeight="bold">
//             Agents List {agents.length > 0 && `(${agents.length})`}
//           </Typography>
//         </Box>
//         {loading ? (
//           <Box sx={{ textAlign: "center", py: 3 }}>
//             <CircularProgress />
//             <Typography sx={{ mt: 1 }}>Loading agents...</Typography>
//           </Box>
//         ) : agents.length > 0 ? (
//           <TableContainer>
//             <Box sx={{ overflowX: "auto" }}>
//               <Table sx={{ minWidth: 1000 }}>
//                 <TableHead>
//                   <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
//                     <TableCell align="center">
//                       <strong>ID</strong>
//                     </TableCell>
//                     <TableCell align="center">
//                       <strong>Name</strong>
//                     </TableCell>
//                     <TableCell align="center">
//                       <strong>Email</strong>
//                     </TableCell>
//                     <TableCell align="center">
//                       <strong>Created At</strong>
//                     </TableCell>
//                     <TableCell align="center">
//                       <strong>Mobile</strong>
//                     </TableCell>
//                     <TableCell align="center">
//                       <strong>Profile Pic</strong>
//                     </TableCell>
//                     <TableCell align="center">
//                       <strong>Actions</strong>
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {agents.map((agent, index) => (
//                     <TableRow key={agent._id || index}>
//                       <TableCell
//                         sx={{
//                           fontFamily: "monospace",
//                           fontSize: "0.8rem",
//                           align: "center",
//                         }}
//                       >
//                         {agent._id}
//                       </TableCell>
//                       <TableCell align="center">{agent.name}</TableCell>
//                       <TableCell align="center">{agent.email}</TableCell>
//                       {/* <TableCell align="center">
//                         {agent.createdAt
//                           ? new Date(agent.createdAt).toLocaleString()
//                           : "—"}
//                       </TableCell> */}

//                       <TableCell align="center">
//                         {agent.createdAt ? (
//                           <Box>
//                             <Typography variant="body2">
//                               {new Date(agent.createdAt).toLocaleDateString()}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                               {new Date(agent.createdAt).toLocaleTimeString()}
//                             </Typography>
//                           </Box>
//                         ) : (
//                           "—"
//                         )}
//                       </TableCell>

//                       <TableCell align="center">{agent.mobile}</TableCell>
//                       <TableCell align="center">
//                         {agent.profilePic ? (
//                           <Avatar
//                             src={agent.profilePic}
//                             sx={{ width: 40, height: 40 }}
//                           />
//                         ) : (
//                           <Avatar
//                             sx={{ width: 40, height: 40, bgcolor: "grey.400" }}
//                           >
//                             {agent.name ? agent.name[0].toUpperCase() : "?"}
//                           </Avatar>
//                         )}
//                       </TableCell>
//                       <TableCell align="center">
//                         <IconButton
//                           color="primary"
//                           onClick={() => handleEdit(agent)}
//                         >
//                           <EditIcon sx={{ FontSize: "large" }} />
//                         </IconButton>
//                         <IconButton
//                           color="error"
//                           onClick={() => handleDelete(agent._id)}
//                         >
//                           <DeleteIcon sx={{ FontSize: "large" }} />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </TableContainer>
//         ) : (
//           <Box sx={{ textAlign: "center", py: 4 }}>
//             <Typography variant="h6" color="text.secondary">
//               No agents found
//             </Typography>
//             <Button variant="outlined" onClick={fetchAgents} sx={{ mt: 1 }}>
//               Refresh List
//             </Button>
//           </Box>
//         )}
//       </Paper>

//       {/* Edit Agent Dialog */}
//       <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
//         <DialogTitle>Edit Agent</DialogTitle>
//         <DialogContent>
//           <Stack spacing={2} sx={{ mt: 1 }}>
//             <TextField
//               label="Name"
//               value={currentAgent?.name || ""}
//               onChange={(e) =>
//                 setCurrentAgent({ ...currentAgent, name: e.target.value })
//               }
//             />
//             <TextField
//               label="Email"
//               value={currentAgent?.email || ""}
//               onChange={(e) =>
//                 setCurrentAgent({ ...currentAgent, email: e.target.value })
//               }
//             />
//             <TextField
//               label="Mobile"
//               value={currentAgent?.mobile || ""}
//               onChange={(e) =>
//                 setCurrentAgent({ ...currentAgent, mobile: e.target.value })
//               }
//             />
//           </Stack>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
//           <Button variant="contained" onClick={saveEdit}>
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           severity={snackbar.severity}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default AgentsDetails;