// import React, { useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   CircularProgress,
//   Snackbar,
//   Alert,
//   IconButton,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";

// const BASE_URL = "https://digidialersuperadmin.onrender.com";

// const TeamMembers = () => {
//   const [teamId, setTeamId] = useState("");
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   // Snackbar helper
//   const showSnackbar = (message, severity = "success") => {
//     setSnackbar({ open: true, message, severity });
//   };

//   // ✅ Fetch members by team ID
//   const fetchMembers = async () => {
//     const trimmedId =  teamId.trim();
//     if(!trimmedId) return showSnackbar("Enter Team ID", "warning");
//     setLoading(true);
//     try{
//       const res = await axios.get(`${BASE_URL}/api/superadmin/teammember/${trimmedId}`);
//       console.log("API response:", res.data);
//       setMembers(res.data.members || []);
//     showSnackbar("Team members loaded successfully", "success");
//     } catch(err) {
//     console.error("Error fetching members:", err);
//     setMembers([]);
//     showSnackbar("Failed to fetch team members", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Delete single member
//   const removeMember = async (id) => {
//     if (!window.confirm("Are you sure you want to remove this member?")) return;

//     try {
//       await axios.delete(`${BASE_URL}/api/superadmin/teammember/${id}`);
//       showSnackbar("Member removed successfully", "success");

//       // Remove from state instantly
//       setMembers((prev) => prev.filter((member) => member._id !== id));
//     } catch (err) {
//       console.error("Error removing member:", err);
//       showSnackbar("Failed to remove member", "error");
//     }
//   };

//   return (
//     <Box sx={{ p: 3, maxWidth: "1000px", mx: "auto", pt: 5 }}>
//       <Typography variant="h4" mb={2} fontWeight="bold">
//         Team Members
//       </Typography>

//       {/* 🔍 Search Section */}
//       <Paper sx={{ p: 3, mb: 3, backgroundColor: "#f8f9fa", borderRadius: 2 }}>
//         <Box
//           sx={{
//             display: "flex",
//             flexWrap: "wrap",
//             alignItems: "center",
//             justifyContent: "space-between",
//             gap: 2,
//           }}
//         >
//           <TextField
//             label="Enter Team ID"
//             value={teamId}
//             onChange={(e) => setTeamId(e.target.value)}
//             size="small"
//             sx={{ flexGrow: 1, minWidth: 250 }}
//           />

//           <Box sx={{ display: "flex", gap: 2 }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={fetchMembers}
//               sx={{ minWidth: 180 }}
//             >
//               Search by Team ID
//             </Button>
//           </Box>
//         </Box>
//       </Paper>

//       {/* 🧾 Members Table */}
//       <Paper sx={{ p: 2, borderRadius: 2 }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">
//           Members List {members.length > 0 && `(${members.length})`}
//         </Typography>

//         {loading ? (
//           <Box sx={{ textAlign: "center", py: 4 }}>
//             <CircularProgress />
//             <Typography sx={{ mt: 1 }}>Loading team members...</Typography>
//           </Box>
//         ) : members.length > 0 ? (
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
//                   <TableCell><strong>User ID</strong></TableCell>
//                   <TableCell><strong>Name</strong></TableCell>
//                   <TableCell><strong>Email</strong></TableCell>
//                   <TableCell><strong>Role</strong></TableCell>
//                   <TableCell><strong>Action</strong></TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {members.map((member) => (
//                   <TableRow key={member.user_id}>
//                     <TableCell>{member.user_id}</TableCell>
//                     <TableCell>{member.name || "N/A"}</TableCell>
//                     <TableCell>{member.email || "N/A"}</TableCell>
//                     <TableCell>{member.role || "N/A"}</TableCell>
//                     <TableCell>
//                       <IconButton
//                         color="error"
//                         onClick={() => removeMember(member._id)}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         ) : (
//           <Box sx={{ textAlign: "center", py: 4 }}>
//             <Typography>No members found</Typography>
//           </Box>
//         )}
//       </Paper>

//       {/* ✅ Snackbar */}
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

// export default TeamMembers;



import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const BASE_URL = "https://digidialersuperadmin.onrender.com";

const TeamMembers = () => {
  const [teamId, setTeamId] = useState("");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Snackbar helper
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // ✅ Fetch members by team ID
  const fetchMembers = async () => {
    const trimmedId = teamId.trim();
    if (!trimmedId) return showSnackbar("Enter Team ID", "warning");
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/superadmin/teammember/${trimmedId}`
      );
      console.log("API response:", res.data);
      setMembers(res.data.members || []);
      showSnackbar("Team members loaded successfully", "success");
    } catch (err) {
      console.error("Error fetching members:", err);
      setMembers([]);
      showSnackbar("Failed to fetch team members", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete single member (with teamId + userId)
  const removeMember = async (userId) => {
    if (!teamId.trim()) return showSnackbar("Please enter a Team ID first", "warning");
    // if (!window.confirm("Are you sure you want to remove this member?")) return;

    try {
      await axios.delete(`${BASE_URL}/api/superadmin/teammember/delete/${teamId}/${userId}`);
      showSnackbar("Member removed successfully", "success");

      // Update UI instantly
      setMembers((prev) => prev.filter((member) => member.user_id !== userId));
    } catch (err) {
      console.error("Error removing member:", err);
      showSnackbar("Failed to remove member", "error");
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: "1000px", mx: "auto", pt: 5 }}>
      <Typography variant="h4" mb={2} fontWeight="bold">
        Team Members
      </Typography>

      {/* 🔍 Search Section */}
      <Paper sx={{ p: 3, mb: 3, backgroundColor: "#f8f9fa", borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <TextField
            label="Enter Team ID"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            size="small"
            sx={{ flexGrow: 1, minWidth: 250 }}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={fetchMembers}
              sx={{ minWidth: 180 }}
            >
              Search by Team ID
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* 🧾 Members Table */}
      <Paper sx={{ p: 2, borderRadius: 2 }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Members List {members.length > 0 && `(${members.length})`}
        </Typography>

        {loading ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CircularProgress />
            <Typography sx={{ mt: 1 }}>Loading team members...</Typography>
          </Box>
        ) : members.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                  <TableCell><strong>User ID</strong></TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Role</strong></TableCell>
                  <TableCell><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.user_id}>
                    <TableCell>{member.user_id}</TableCell>
                    <TableCell>{member.name || "N/A"}</TableCell>
                    <TableCell>{member.email || "N/A"}</TableCell>
                    <TableCell>{member.role || "N/A"}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => removeMember(member.user_id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography>No members found</Typography>
          </Box>
        )}
      </Paper>

      {/* ✅ Snackbar */}
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

export default TeamMembers;
