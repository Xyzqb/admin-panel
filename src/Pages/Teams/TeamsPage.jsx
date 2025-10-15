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
// } from "@mui/material";

// const BASE_URL = "https://digidialersuperadmin.onrender.com";

// const AgentsPage = () => {
//   const [agents, setAgents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchId, setSearchId] = useState("");
//   const [searchAdminId, setSearchAdminId] = useState("");
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

//   // Show snackbar
//   const showSnackbar = (message, severity) =>
//     setSnackbar({ open: true, message, severity });

//   // Fetch all agents
//   const fetchAgents = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/api/superadmin/team/${teams}`);
//       setAgents(res.data || []);
//     } catch (err) {
//       console.error("Error fetching agents:", err);
//       showSnackbar("Failed to load agents", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Search by ID
//   const searchAgentById = async () => {
//     if (!searchId.trim()) return showSnackbar("Enter agent ID", "warning");
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/api/superadmin/team/${searchId.trim()}`);
//       setAgents([res.data]); // wrap in array to display in table
//       showSnackbar("Agent found!", "success");
//     } catch (err) {
//       console.error(err);
//       setAgents([]);
//       showSnackbar("Agent not found", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Search agents under a specific admin
//   const searchAgentsByAdmin = async () => {
//     if (!searchAdminId.trim()) return showSnackbar("Enter admin ID", "warning");
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/api/superadmin/team/admin/${searchAdminId.trim()}`);
//       setAgents(res.data || []);
//       showSnackbar("Agents under admin loaded!", "success");
//     } catch (err) {
//       console.error(err);
//       setAgents([]);
//       showSnackbar("No agents found under this admin", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Clear search and show all
//   const clearSearch = () => {
//     setSearchId("");
//     setSearchAdminId("");
//     fetchAgents();
//     showSnackbar("Showing all agents", "info");
//   };

//   useEffect(() => {
//     fetchAgents();
//   }, []);

//   return (
//     <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3 }}>
//       <Typography variant="h4" mb={2} fontWeight="bold">Team Details</Typography>

//       {/* SEARCH */}
//       <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f8f9fa" }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">Search Team Details</Typography>
//         <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="flex-end">
//           <Box sx={{ flex: 1 }}>
//             <TextField
//               label="Search team details by ID"
//               value={searchId}
//               onChange={(e) => setSearchId(e.target.value)}
//               fullWidth
//               size="small"
//             />
//             <Button
//               variant="outlined"
//               onClick={searchAgentById}
//               sx={{ mt: 1, width: "100%", bgcolor: "primary.main", color: "white" }}
//             >
//               Search by ID
//             </Button>
//           </Box>

//           <Box sx={{ flex: 1 }}>
//             <TextField
//               label="Search team under Admin"
//               value={searchAdminId}
//               onChange={(e) => setSearchAdminId(e.target.value)}
//               fullWidth
//               size="small"
//             />
//             <Button
//               variant="outlined"
//               onClick={searchAgentsByAdmin}
//               sx={{ mt: 1, width: "100%", bgcolor: "primary.main", color: "white" }}
//             >
//               Search Team Under Admin
//             </Button>
//           </Box>

//           <Button
//             variant="contained"
//             color="secondary"
//             onClick={clearSearch}
//             sx={{ height: "35px" }}
//           >
//             List of All Teams
//           </Button>
//         </Stack>
//       </Paper>

//       {/* AGENTS TABLE */}
//       <Paper sx={{ p: 2 }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">
//           Team List {agents.length > 0 && `(${agents.length})`}
//         </Typography>

//         {loading ? (
//           <Box sx={{ textAlign: "center", py: 3 }}>
//             <CircularProgress />
//             <Typography sx={{ mt: 1 }}>Loading agents...</Typography>
//           </Box>
//         ) : agents.length > 0 ? (
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
//                   <TableCell><strong>ID</strong></TableCell>
//                   <TableCell><strong>Name</strong></TableCell>
//                   <TableCell><strong>Owner ID</strong></TableCell>
//                   <TableCell><strong>Company ID</strong></TableCell>
//                   <TableCell><Strong>Member Count</Strong></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {agents.map((agent, index) => (
//                   <TableRow key={agent._id || index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" }, "&:hover": { backgroundColor: "#f5f5f5" } }}>
//                     <TableCell>{agent._id || "N/A"}</TableCell>
//                     <TableCell>{agent.name || "N/A"}</TableCell>
//                     <TableCell>{agent.email || "N/A"}</TableCell>
//                     <TableCell>{agent.mobile || "N/A"}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         ) : (
//           <Box sx={{ textAlign: "center", py: 4 }}>
//             <Typography variant="h6" color="text.secondary">No agents found</Typography>
//             <Button variant="outlined" onClick={fetchAgents} sx={{ mt: 1 }}>Refresh List</Button>
//           </Box>
//         )}
//       </Paper>

//       {/* SNACKBAR */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default AgentsPage;

//check

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
// } from "@mui/material";

// const BASE_URL = "https://digidialersuperadmin.onrender.com";

// const AgentsPage = () => {
//   const [agents, setAgents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchId, setSearchId] = useState("");
//   const [searchAdminId, setSearchAdminId] = useState("");
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

//   // Show snackbar
//   const showSnackbar = (message, severity) =>
//     setSnackbar({ open: true, message, severity });

//   // Fetch all teams
//   // const fetchAgents = async () => {
//   //   setLoading(true);
//   //   try {
//   //     const res = await axios.get(`${BASE_URL}/api/superadmin/team`);
//   //     const data = res.data || [];
//   //     // Normalize fields
//   //     const normalized = data.map(agent => ({
//   //       id: agent.id,
//   //       name: agent.name,
//   //       owner_id: agent.owner_id,
//   //       company_id: agent.company_id,
//   //       member_count: agent.member_count,
//   //     }));
//   //     setAgents(normalized);
//   //     showSnackbar("Teams loaded successfully!", "success");
//   //   } catch (err) {
//   //     console.error("Error fetching agents:", err);
//   //     showSnackbar("Failed to load teams", "error");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const fetchAgents = async () => {
//   setLoading(true);
//   try {
//     const res = await axios.get(`${BASE_URL}/api/superadmin/team/getall`); // <- Use correct endpoint
//     setAgents(res.data || []);
//     showSnackbar("Teams loaded successfully!", "success");
//   } catch (err) {
//     console.error("Error fetching agents:", err);
//     showSnackbar("Failed to load teams", "error");
//   } finally {
//     setLoading(false);
//   }
// };

//   // Search by ID
//   const searchAgentById = async () => {
//     if (!searchId.trim()) return showSnackbar("Enter team ID", "warning");
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/api/superadmin/team/${searchId.trim()}`);
//       const agent = res.data;
//       if (!agent) {
//         setAgents([]);
//         showSnackbar("Team not found", "error");
//       } else {
//         setAgents([{
//           id: agent.id,
//           name: agent.name,
//           owner_id: agent.owner_id,
//           company_id: agent.company_id,
//           member_count: agent.member_count,
//         }]);
//         showSnackbar("Team found!", "success");
//       }
//     } catch (err) {
//       console.error(err);
//       setAgents([]);
//       showSnackbar("Team not found", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Search teams under a specific admin
//   const searchAgentsByAdmin = async () => {
//     if (!searchAdminId.trim()) return showSnackbar("Enter admin ID", "warning");
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/api/superadmin/team/admin/${searchAdminId.trim()}`);
//       const data = res.data || [];
//       const normalized = data.map(agent => ({
//         id: agent.id,
//         name: agent.name,
//         owner_id: agent.owner_id,
//         company_id: agent.company_id,
//         member_count: agent.member_count,
//       }));
//       setAgents(normalized);
//       if (normalized.length === 0) {
//         showSnackbar("No teams found under this admin", "error");
//       } else {
//         showSnackbar("Teams under admin loaded successfully!", "success");
//       }
//     } catch (err) {
//       console.error(err);
//       setAgents([]);
//       showSnackbar("Failed to fetch teams under this admin", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Clear search and show all
//   const clearSearch = () => {
//     setSearchId("");
//     setSearchAdminId("");
//     fetchAgents();
//     showSnackbar("Showing all teams", "info");
//   };

//   useEffect(() => {
//     fetchAgents();
//   }, []);

//   return (
//     <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3 }}>
//       <Typography variant="h4" mb={2} fontWeight="bold">Team Details</Typography>

//       {/* SEARCH SECTION */}
//       <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f8f9fa" }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">Search Teams</Typography>
//         <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="flex-end">
//           <Box sx={{ flex: 1 }}>
//             <TextField
//               label="Search by Team ID"
//               value={searchId}
//               onChange={(e) => setSearchId(e.target.value)}
//               fullWidth
//               size="small"
//             />
//             <Button
//               variant="outlined"
//               onClick={searchAgentById}
//               sx={{ mt: 1, width: "100%", bgcolor: "primary.main", color: "white" }}
//             >
//               Search by ID
//             </Button>
//           </Box>

//           <Box sx={{ flex: 1 }}>
//             <TextField
//               label="Search Teams under Admin"
//               value={searchAdminId}
//               onChange={(e) => setSearchAdminId(e.target.value)}
//               fullWidth
//               size="small"
//             />
//             <Button
//               variant="outlined"
//               onClick={searchAgentsByAdmin}
//               sx={{ mt: 1, width: "100%", bgcolor: "primary.main", color: "white" }}
//             >
//               Search Teams Under Admin
//             </Button>
//           </Box>

//           <Button
//             variant="contained"
//             color="secondary"
//             onClick={clearSearch}
//             sx={{ height: "35px" }}
//           >
//             List All Teams
//           </Button>
//         </Stack>
//       </Paper>

//       {/* TEAMS TABLE */}
//       <Paper sx={{ p: 2 }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">
//           Team List {agents.length > 0 && `(${agents.length})`}
//         </Typography>

//         {loading ? (
//           <Box sx={{ textAlign: "center", py: 3 }}>
//             <CircularProgress />
//             <Typography sx={{ mt: 1 }}>Loading teams...</Typography>
//           </Box>
//         ) : agents.length > 0 ? (
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
//                   <TableCell><strong>ID</strong></TableCell>
//                   <TableCell><strong>Name</strong></TableCell>
//                   <TableCell><strong>Owner ID</strong></TableCell>
//                   <TableCell><strong>Company ID</strong></TableCell>
//                   <TableCell><strong>Member Count</strong></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {agents.map((agent, index) => (
//                   <TableRow key={agent.id || index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" }, "&:hover": { backgroundColor: "#f5f5f5" } }}>
//                     <TableCell>{agent.id || "N/A"}</TableCell>
//                     <TableCell>{agent.name || "N/A"}</TableCell>
//                     <TableCell>{agent.owner_id || "N/A"}</TableCell>
//                     <TableCell>{agent.company_id || "N/A"}</TableCell>
//                     <TableCell>{agent.member_count || "N/A"}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         ) : (
//           <Box sx={{ textAlign: "center", py: 4 }}>
//             <Typography variant="h6" color="text.secondary">No teams found</Typography>
//             <Button variant="outlined" onClick={fetchAgents} sx={{ mt: 1 }}>Refresh List</Button>
//           </Box>
//         )}
//       </Paper>

//       {/* SNACKBAR */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default AgentsPage;


//check 4
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

const BASE_URL = "https://digidialersuperadmin.onrender.com";

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [searchAdminId, setSearchAdminId] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Show snackbar
  const showSnackbar = (message, severity) =>
    setSnackbar({ open: true, message, severity });

  // Fetch all teams
  const fetchTeams = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/superadmin/team/all`);
      // Ensure res.data is an array
      const data = Array.isArray(res.data) ? res.data : res.data.teams || [];
      const normalized = data.map(team => ({
        id: team.id,
        name: team.name,
        owner_id: team.owner_id,
        company_id: team.company_id,
        member_count: team.member_count,
        created_at: team.created_at,
      }));
      setTeams(normalized);
      showSnackbar("Teams loaded successfully!", "success");
    } catch (err) {
      console.error("Error fetching teams:", err);
      showSnackbar("Failed to load teams", "error");
    } finally {
      setLoading(false);
    }
  };

  // Search team by ID
  const searchTeamById = async () => {
  const trimmedId = searchId.trim();
  if (!trimmedId) return showSnackbar("Enter team ID", "warning");

  setLoading(true);
  try {
    const res = await axios.get(`${BASE_URL}/api/superadmin/team/${trimmedId}`);
    const team = res.data;

    // Check if the API returns an object or { team: {...} }
    const teamData = team.team || team; 

    if (!teamData || !teamData.id) {
      setTeams([]);
      showSnackbar("Team not found", "error");
    } else {
      setTeams([{
        id: teamData.id,
        name: teamData.name,
        owner_id: teamData.owner_id,
        company_id: teamData.company_id,
        member_count: teamData.member_count,
        created_at: teamData.created_at,
      }]);
      showSnackbar("Team found!", "success");
    }
  } catch (err) {
    console.error("Search by ID error:", err);
    setTeams([]);
    showSnackbar("Team not found", "error");
  } finally {
    setLoading(false);
  }
};


  // Search teams under a specific admin
  const searchTeamsByAdmin = async () => {
    if (!searchAdminId.trim()) return showSnackbar("Enter admin ID", "warning");
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/superadmin/team/admin/${searchAdminId.trim()}`);
      const data = Array.isArray(res.data) ? res.data : res.data.teams || [];
      const normalized = data.map(team => ({
        id: team.id,
        name: team.name,
        owner_id: team.owner_id,
        company_id: team.company_id,
        member_count: team.member_count,
        created_at: team.created_at,
      }));
      setTeams(normalized);
      if (normalized.length === 0) {
        showSnackbar("No teams found under this admin", "error");
      } else {
        showSnackbar("Teams under admin loaded successfully!", "success");
      }
    } catch (err) {
      console.error("Search by admin error:", err);
      setTeams([]);
      showSnackbar("Failed to fetch teams under this admin", "error");
    } finally {
      setLoading(false);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchId("");
    setSearchAdminId("");
    fetchTeams();
    showSnackbar("Showing all teams", "info");
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3 }}>
      <Typography variant="h4" mb={2} fontWeight="bold">Team Details</Typography>

      {/* SEARCH SECTION */}
      <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f8f9fa" }}>
        <Typography variant="h6" mb={2} fontWeight="bold">Search Teams</Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="flex-end">
          <Box sx={{ flex: 1 }}>
            <TextField
              label="Search by Team ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              fullWidth
              size="small"
            />
            <Button
              variant="outlined"
              onClick={searchTeamById}
              sx={{ mt: 1, width: "100%", bgcolor: "primary.main", color: "white" }}
            >
              Search by ID
            </Button>
          </Box>

          <Box sx={{ flex: 1 }}>
            <TextField
              label="Search Teams under Admin"
              value={searchAdminId}
              onChange={(e) => setSearchAdminId(e.target.value)}
              fullWidth
              size="small"
            />
            <Button
              variant="outlined"
              onClick={searchTeamsByAdmin}
              sx={{ mt: 1, width: "100%", bgcolor: "primary.main", color: "white" }}
            >
              Search Teams Under Admin
            </Button>
          </Box>

          <Button
            variant="contained"
            color="secondary"
            onClick={clearSearch}
            sx={{ height: "35px" }}
          >
            List All Teams
          </Button>
        </Stack>
      </Paper>

      {/* TEAMS TABLE */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Team List {teams.length > 0 && `(${teams.length})`}
        </Typography>

        {loading ? (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <CircularProgress />
            <Typography sx={{ mt: 1 }}>Loading teams...</Typography>
          </Box>
        ) : teams.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Owner ID</strong></TableCell>
                  <TableCell><strong>Company ID</strong></TableCell>
                  <TableCell><strong>Member Count</strong></TableCell>
                  <TableCell><strong>Created At</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teams.map((team, index) => (
                  <TableRow key={team.id || index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" }, "&:hover": { backgroundColor: "#f5f5f5" } }}>
                    <TableCell>{team.id || "N/A"}</TableCell>
                    <TableCell>{team.name || "N/A"}</TableCell>
                    <TableCell>{team.owner_id || "N/A"}</TableCell>
                    <TableCell>{team.company_id || "N/A"}</TableCell>
                    <TableCell>{team.member_count || "N/A"}</TableCell>
                    <TableCell>{team.created_at ? new Date(team.created_at).toLocaleString() : "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="text.secondary">No teams found</Typography>
            <Button variant="outlined" onClick={fetchTeams} sx={{ mt: 1 }}>Refresh List</Button>
          </Box>
        )}
      </Paper>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TeamsPage;

