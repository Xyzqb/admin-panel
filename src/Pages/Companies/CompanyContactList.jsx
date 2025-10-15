// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Grid,
//   Paper,
//   Typography,
//   TextField,
//   InputAdornment,
//   IconButton,
//   TableContainer,
//   Table,
//   TableHead,
//   TableCell,
//   TableRow,
//   TableBody,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import axios from "axios";

// const CompanyContactList = () => {
//   // ✅ State
//   const [contacts, setContacts] = useState([]);
//   const [filter, setFilter] = useState("All");
//   const [search, setSearch] = useState("");

//   // ✅ Fetch contacts from API
//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         const res = await axios.get("https://api.example.com/contacts"); // Replace with your API
//         setContacts(res.data || []);
//       } catch (error) {
//         console.error("Error fetching contacts:", error);
//         // Fallback dummy data
//         setContacts([
//           { id: 1, name: "John Doe", number: "123-456-7890", email: "john@example.com", status: "Customer" },
//           { id: 2, name: "Jane Smith", number: "987-654-3210", email: "jane@example.com", status: "Lead" },
//           { id: 3, name: "Bob Lee", number: "555-555-5555", email: "bob@example.com", status: "Lead" },
//         ]);
//       }
//     };
//     fetchContacts();
//   }, []);

//   // ✅ Delete contact
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`https://api.example.com/contacts/${id}`); // Replace with API delete
//       setContacts(contacts.filter((c) => c.id !== id));
//     } catch (error) {
//       console.error("Delete failed", error);
//       setContacts(contacts.filter((c) => c.id !== id)); // fallback
//     }
//   };

//   // ✅ Add new contact
//   const handleAddContact = async () => {
//     const newContact = { id: Date.now(), name: "New Contact", number: "000-000-0000", email: "new@example.com", status: "Lead" };
//     try {
//       const res = await axios.post("https://api.example.com/contacts", newContact);
//       setContacts([...contacts, res.data]);
//     } catch (error) {
//       console.error("Add failed", error);
//       setContacts([...contacts, newContact]); // fallback
//     }
//   };


//   // ✅ Import contacts
//   const handleImportContacts = async () => {
//     const importedContacts = [
//       { id: Date.now() + 1, name: "Alice", number: "111-222-3333", email: "alice@example.com", status: "Customer" },
//       { id: Date.now() + 2, name: "Mark", number: "444-555-6666", email: "mark@example.com", status: "Lead" },
//     ];
//     try {
//       const res = await Promise.all(importedContacts.map((c) => axios.post("https://api.example.com/contacts", c)));
//       const newContacts = res.map((r) => r.data);
//       setContacts([...contacts, ...newContacts]);
//     } catch (error) {
//       console.error("Import failed", error);
//       setContacts([...contacts, ...importedContacts]); // fallback
//     }
//   };

//   // ✅ Save contacts
//   const handleSave = async () => {
//     try {
//       await axios.put("https://api.example.com/contacts", contacts); // Replace with API
//       alert("Contacts saved successfully!");
//     } catch (error) {
//       console.error("Save failed", error);
//       alert("Contacts saved locally (API not connected).");
//     }
//   };

//   // ✅ Filtered & searched contacts
//   const filteredContacts = contacts.filter((c) => {
//     const matchFilter = filter === "All" || c.status === filter;
//     const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.number.includes(search) || c.email.toLowerCase().includes(search.toLowerCase());
//     return matchFilter && matchSearch;
//   });

//   return (
//     <Box sx={{ p: 2, minHeight: "100vh", background: "#1e293b", color: "#fff", width: "100%" }}>
//       <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, pt:4}}>
//         Company Contact List
//       </Typography>

//       {/* Search */}
//       <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, mb: 2 }}>
//         <TextField
//           placeholder="Search Contacts..."
//           size="small"
//           variant="outlined"
//           sx={{ flex: 1, maxWidth: 300, background: "#fff", borderRadius: 1 }}
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton>
//                   <SearchIcon />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>

//       {/* Filter + Actions */}
//       <Grid container spacing={2} sx={{ mb: 2, alignItems: "center" }}>
//         <Grid item>
//           <Button variant="contained" color={filter === "All" ? "primary" : "inherit"} onClick={() => setFilter("All")} sx={{color:"#1e293b"}}>
//             All
//           </Button>
//         </Grid>
//         <Grid item>
//           <Button variant="contained" color={filter === "Customer" ? "primary" : "inherit"} onClick={() => setFilter("Customer")} sx={{color:"#1e293b"}}>
//             Customer
//           </Button>
//         </Grid>
//         <Grid item>
//           <Button variant="contained" color={filter === "Lead" ? "primary" : "inherit"} onClick={() => setFilter("Lead")} sx={{color:"#1e293b"}}>
//             Lead
//           </Button>
//         </Grid>

//         {/* Right side actions */}
//         <Grid item xs />
//         <Grid item>
//           <Button variant="contained" color="primary" onClick={handleAddContact}>
//             + Add Contact
//           </Button>
//         </Grid>
//         <Grid item>
//           <Button variant="contained" sx={{ background: "#fff", color: "#1e293b" }} onClick={handleImportContacts}>
//             Import Contacts
//           </Button>
//         </Grid>
//       </Grid>

//       <Box sx={{ borderBottom: "1px solid white", my: 2 }} />

//       {/* Table */}
//       <Paper sx={{ p: 2, borderRadius: 2, background: "#283645", color: "#fff", overflowX: "auto" }}>
//         <TableContainer>
//           <Table size="small">
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ color: "#fff", fontWeight: "bold", textAlign:"left"}}>Company Name</TableCell>
//                 <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Director Name</TableCell>
//                 <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Date</TableCell>
//                 <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>KYC Status</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredContacts.length > 0 ? (
//                 filteredContacts.map((c) => (
//                   <TableRow key={c.id}>
//                     <TableCell sx={{ color: "#fff" }}>{c.name}</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>{c.number}</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>{c.email}</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>{c.status}</TableCell>
//                     <TableCell>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={5} sx={{ color: "#fff", textAlign: "center" }}>
//                     No contacts found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>

//       {/* Save Button */}
//       <Box textAlign="center" sx={{ mt: 3 }}>
//         <Button variant="contained" color="primary" size="large" onClick={handleSave}>
//           Save Contact
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default CompanyContactList;



import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  CircularProgress,
  Snackbar,
  Alert,
  Stack,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const BASE_URL = "https://superfone-admin.onrender.com";

const CompanyContactList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const token = localStorage.getItem("token");

  // ✅ Fetch all companies
  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/superadmin/company/allcompany`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompanies(res.data || []);
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: "Failed to fetch companies", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchCompanies();
  }, [token]);

  // ✅ Search by ID
  const handleSearchById = async (id) => {
    if (!id) return fetchCompanies();
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/superadmin/company/getcompany/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompanies([res.data]);
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: "Company not found by ID", severity: "error" });
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Search by Name
  const handleSearchByName = async (name) => {
    if (!name) return fetchCompanies();
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/superadmin/company/getcompanyname/${name}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompanies([res.data]);
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: "Company not found by Name", severity: "error" });
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Filtered & searched companies
  const filteredCompanies = companies.filter((c) => {
    const matchFilter = filterStatus === "All" || c.status === filterStatus;
    const matchSearch =
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.domain?.toLowerCase().includes(search.toLowerCase()) ||
      c.directorName?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <Box sx={{ p: 2, minHeight: "100vh", background: "#1e293b", color: "#fff" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, pt: 4 }}>
        Company Dashboard
      </Typography>

      {/* Search */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ mb: 2 }}
      >
        <TextField
          placeholder="Search by Name, Domain, Director, Email..."
          size="small"
          variant="outlined"
          sx={{ flex: 1, background: "#fff", borderRadius: 1 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={fetchCompanies}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          placeholder="Search by ID"
          size="small"
          variant="outlined"
          sx={{ flex: 0.5, background: "#fff", borderRadius: 1 }}
          onChange={(e) => handleSearchById(e.target.value)}
        />
      </Stack>

      {/* Filter Buttons */}
      <Grid container spacing={2} sx={{ mb: 2, alignItems: "center" }}>
        {["All", "Pending", "Approved", "Rejected"].map((status) => (
          <Grid item key={status}>
            <Button
              variant={filterStatus === status ? "contained" : "outlined"}
              color={filterStatus === status ? "primary" : "inherit"}
              onClick={() => setFilterStatus(status)}
              sx={{ color: "#1e293b" }}
            >
              {status}
            </Button>
          </Grid>
        ))}
        <Grid item xs />
        <Grid item>
          <Button variant="contained" onClick={fetchCompanies}>
            Refresh
          </Button>
        </Grid>
      </Grid>

      {/* Table */}
      <Paper sx={{ p: 2, borderRadius: 2, background: "#283645", overflowX: "auto" }}>
        {loading ? (
          <Box textAlign="center" p={4}>
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Company Name</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Director Name</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Mobile</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Website</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>KYC Status</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((c) => (
                    <TableRow key={c._id}>
                      <TableCell sx={{ color: "#fff" }}>{c.name}</TableCell>
                      <TableCell sx={{ color: "#fff" }}>{c.directorName || "-"}</TableCell>
                      <TableCell sx={{ color: "#fff" }}>{c.mobile || "-"}</TableCell>
                      <TableCell sx={{ color: "#fff" }}>{c.email || "-"}</TableCell>
                      <TableCell sx={{ color: "#fff" }}>{c.website || "-"}</TableCell>
                      <TableCell sx={{ color: "#fff" }}>{c.kycStatus || "Pending"}</TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        {new Date(c.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ textAlign: "center", color: "#fff" }}>
                      No companies found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CompanyContactList;
