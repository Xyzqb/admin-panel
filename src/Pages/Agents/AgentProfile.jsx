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

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  CircularProgress,
  Snackbar,
  Alert,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded";

const BASE_URL = "https://digidialersuperadmin.onrender.com";

const AgentsDetails = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [searchAdminId, setSearchAdminId] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentAgent, setCurrentAgent] = useState(null);

  const showSnackbar = (message, severity) =>
    setSnackbar({ open: true, message, severity });

  // Fetch all agents
  const fetchAgents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/superadmin/agent/getagent`);
      const rawAgents = res.data.agents || [];

      const result = rawAgents.map((agent) => ({
        _id: agent._id || agent.id,
        name: agent.name,
        email: agent.email,
        mobile: agent.mobile,
        profilePic: agent.profilePic,
        createdAt: agent.createdAt || agent.created_at,
      }));

      setAgents(result);
      showSnackbar("Agents loaded successfully!", "success");
    } catch (err) {
      showSnackbar("Failed to load agents", "error");
    } finally {
      setLoading(false);
    }
  };

  // Search by Agent ID
  const searchAgentById = async () => {
    if (!searchId.trim()) return showSnackbar("Enter agent ID", "warning");
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/superadmin/agent/${searchId.trim()}`
      );
      const rawAgent = res.data.agent || res.data;
      const result = rawAgent
        ? [
            {
              _id: rawAgent._id || rawAgent.id,
              name: rawAgent.name,
              email: rawAgent.email,
              mobile: rawAgent.mobile,
              profilePic: rawAgent.profilePic,
              createdAt: rawAgent.createdAt || rawAgent.created_at,
            },
          ]
        : [];
      setAgents(result);
      showSnackbar(
        result.length ? "Agent found!" : "Agent not found",
        result.length ? "success" : "error"
      );
    } catch {
      setAgents([]);
      showSnackbar("Agent not found", "error");
    } finally {
      setLoading(false);
    }
  };

  // Search agents under Admin
  const searchAgentsByAdmin = async () => {
    if (!searchAdminId.trim()) return showSnackbar("Enter admin ID", "warning");
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/superadmin/agent/admin/${searchAdminId.trim()}`
      );
      const rawAgents = res.data?.agents || [];
      const result = rawAgents.map((agent) => ({
        _id: agent._id || agent.id,
        name: agent.name,
        email: agent.email,
        mobile: agent.mobile,
        profilePic: agent.profilePic,
        createdAt: agent.createdAt || agent.created_at,
      }));
      setAgents(result);
      showSnackbar(
        result.length ? "Agents under admin loaded!" : "No agents found",
        result.length ? "success" : "error"
      );
    } catch {
      setAgents([]);
      showSnackbar("Failed to fetch agents", "error");
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchId("");
    setSearchAdminId("");
    fetchAgents();
    showSnackbar("Showing all agents", "info");
  };

  // Delete agent
  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this agent?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/superadmin/agent/${_id}`);
      setAgents((prev) => prev.filter((a) => a._id !== _id));
      showSnackbar("Agent deleted successfully!", "success");
    } catch {
      showSnackbar("Failed to delete agent", "error");
    }
  };

  // Edit agent
  const handleEdit = (agent) => {
    setCurrentAgent(agent);
    setEditDialogOpen(true);
  };

  const saveEdit = async () => {
    if (!currentAgent?._id) return showSnackbar("Invalid agent ID", "error");
    try {
      const payload = {
        name: currentAgent.name,
        email: currentAgent.email,
        mobile: currentAgent.mobile,
      };
      const res = await axios.patch(
        `${BASE_URL}/api/superadmin/agent/${currentAgent._id}`,
        payload
      );
      const updated = res.data.updatedAgents;
      setAgents((prev) =>
        prev.map((a) =>
          a._id === updated.id
            ? {
                ...a,
                name: updated.name,
                email: updated.email,
                mobile: updated.mobile,
              }
            : a
        )
      );
      setEditDialogOpen(false);
      showSnackbar("Agent updated successfully!", "success");
    } catch {
      showSnackbar("Failed to update agent", "error");
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <Box sx={{ p: 2, mx: "auto", mt: 3 }}>
      <Typography variant="h5" mb={1} fontWeight="bold">
        Agents Details
      </Typography>

      {/* Search Section */}
      <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f8f9fa", width:"910px" }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Search Agents
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems="flex-start"
        >
          <Box>
            <TextField
              label="Search by Agent ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              size="small"
              sx={{ width: "280px" }}
            />
            <Button
              variant="outlined"
              onClick={searchAgentById}
              sx={{
                mt: 1,
                width: "280px",
                bgcolor: "primary.main",
                color: "white",
                gap: 1,
              }}
            >
              <PersonSearchRoundedIcon />
              Search by ID
            </Button>
          </Box>
          <Box>
            <TextField
              label="Search agents under Admin"
              value={searchAdminId}
              onChange={(e) => setSearchAdminId(e.target.value)}
              size="small"
              sx={{ width: "300px" }}
            />
            <Button
              variant="outlined"
              onClick={searchAgentsByAdmin}
              sx={{
                mt: 1,
                width: "300px",
                bgcolor: "primary.main",
                color: "white",
                gap: 1,
              }}
            >
              <PersonSearchRoundedIcon />
              Search agents under Admin
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearSearch}
              sx={{
                mt: { xs: 2, md: 3 },
                width: "300px",
                height: "40px",
                gap: 1,
                mr: 6,
              }}
            >
              <PersonSearchRoundedIcon />
              Show All Agents
            </Button>
          </Box>
        </Stack>
      </Paper>

      {/* Agent Cards Section */}
      {loading ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <CircularProgress />
          <Typography sx={{ mt: 1 }}>Loading agents...</Typography>
        </Box>
      ) : agents.length > 0 ? (
        <Grid container spacing={2}>
          {agents.map((agent) => (
            <Grid item xs={3} sm={3} md={3} lg={3} key={agent._id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  width:"280px",
                  height:"310px",
                  p: 1,
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Avatar
                    src={agent.profilePic}
                    sx={{
                      width: 70,
                      height: 70,
                      mx: "auto",
                      bgcolor: "primary.light",
                      mb: 1,
                    }}
                  >
                    {agent.name?.[0]?.toUpperCase()}
                  </Avatar>
                  <Typography variant="h6">{agent.name}</Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ wordBreak: "break-all" }}
                  >
                    ID: {agent._id}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2">{agent.email}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {agent.mobile}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {agent.createdAt
                      ? new Date(agent.createdAt).toLocaleDateString()
                      : ""}
                    <br />
                    {agent.createdAt
                      ? new Date(agent.createdAt).toLocaleTimeString()
                      : ""}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <IconButton color="primary" onClick={() => handleEdit(agent)}>
                    {/* <EditIcon /> */}
                     <Button sx={{color:"#fff", backgroundColor:"skyblue"}}>Edit</Button>
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(agent._id)}
                  >
                    <Button sx={{color:"#fff", backgroundColor:"red"}}>Delete</Button>
                    {/* <DeleteIcon /> */}
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No agents found
          </Typography>
          <Button variant="outlined" onClick={fetchAgents} sx={{ mt: 1 }}>
            Refresh List
          </Button>
        </Box>
      )}

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Agent</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              value={currentAgent?.name || ""}
              onChange={(e) =>
                setCurrentAgent({ ...currentAgent, name: e.target.value })
              }
            />
            <TextField
              label="Email"
              value={currentAgent?.email || ""}
              onChange={(e) =>
                setCurrentAgent({ ...currentAgent, email: e.target.value })
              }
            />
            <TextField
              label="Mobile"
              value={currentAgent?.mobile || ""}
              onChange={(e) =>
                setCurrentAgent({ ...currentAgent, mobile: e.target.value })
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveEdit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AgentsDetails;

// Profile pic withou api

// <TableCell align="center">
//   {agent.profilePic ? (
//     <img
//       src={agent.profilePic} // or `${BASE_URL}/uploads/${agent.profilePic}` if needed
//       alt={agent.name}
//       style={{ width: 40, height: 40, borderRadius: "50%" }}
//     />
//   ) : (
//     <div
//       style={{
//         width: 40,
//         height: 40,
//         borderRadius: "50%",
//         backgroundColor: "#ccc",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         fontWeight: "bold",
//         color: "#fff",
//       }}
//     >
//       {agent.name ? agent.name[0].toUpperCase() : "?"}
//     </div>
//   )}
// </TableCell>
