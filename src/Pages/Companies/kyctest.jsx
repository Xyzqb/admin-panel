// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import axios from "axios";

// const BASE_URL = "https://digidialersuperadmin.onrender.com";

// const ShowAllCompany = () => {
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchId, setSearchId] = useState("");
//   const [searchName, setSearchName] = useState("");
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const [kycStatus, setKycStatus] = useState({});

//   const token = localStorage.getItem("token");

//   const getAuthHeader = () => ({ Authorization: `Bearer ${token}` });

//   // Fetch all companies
//  const fetchAllCompanies = async () => {
//   setLoading(true);
//   try {
//     const res = await axios.get(`${BASE_URL}/api/superadmin/kyc/details/:company_id`, {
//       headers: getAuthHeader(), // token will still be sent if available
//     });
//     const data = res.data || [];
//     setCompanies(data);

//     // Fetch KYC status for each company
//     data.forEach((c) => fetchKycStatus(c._id));
//   } catch (err) {
//     console.error(err);
//     setSnackbar({
//       open: true,
//       message: "Failed to fetch companies",
//       severity: "error",
//     });
//   } finally {
//     setLoading(false);
//   }
// };


//   // Fetch company by ID
//   const fetchCompanyById = async () => {
//     if (!searchId.trim())
//       return setSnackbar({
//         open: true,
//         message: "Enter company ID",
//         severity: "warning",
//       });
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/api/superadmin/company/getcompany/${searchId}`,
//         { headers: getAuthHeader() }
//       );

//       const company = res.data;
//       const companyId = company._id || company.id;
//       setCompanies([company]);
//       fetchKycStatus(companyId);
//     } catch (err) {
//       console.error(err);
//       setSnackbar({
//         open: true,
//         message: "Company not found by ID",
//         severity: "error",
//       });
//       setCompanies([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch company by Name
//   const fetchCompanyByName = async () => {
//     if (!searchName.trim())
//       return setSnackbar({
//         open: true,
//         message: "Enter company name",
//         severity: "warning",
//       });
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/api/superadmin/company/getcompanyname/${searchName}`,
//         {
//           headers: getAuthHeader(),
//         }
//       );
//       setCompanies([res.data]);
//       fetchKycStatus(res.data._id);
//     } catch (err) {
//       console.error(err);
//       setSnackbar({
//         open: true,
//         message: "Company not found by name",
//         severity: "error",
//       });
//       setCompanies([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchKycStatus = async (company_id) => {
//     if (!company_id) return;
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/api/superadmin/kyc/status/${company_id}`,
//         { headers: getAuthHeader() }
//       );

//       setKycStatus((prev) => ({
//         ...prev,
//         [company_id]: res.data?.kycData || {},
//       }));
//     } catch (err) {
//       console.error(`No KYC found for company ID ${company_id}`);
//       setKycStatus((prev) => ({ ...prev, [company_id]: {} }));
//     }
//   };

//   const verifyKyc = async (company_id, action) => {
//     try {
//       await axios.put(
//         `${BASE_URL}/api/superadmin/kyc/verify/${company_id}`,
//         { action }, // action = "approved" or "rejected"
//         { headers: getAuthHeader() }
//       );
//       setSnackbar({
//         open: true,
//         message: `KYC ${action} successfully`,
//         severity: "success",
//       });
//       fetchKycStatus(company_id);
//     } catch (err) {
//       console.error(err);
//       setSnackbar({
//         open: true,
//         message: `Failed to ${action} KYC`,
//         severity: "error",
//       });
//     }
//   };

//   useEffect(() => {
//     if (token) fetchAllCompanies();
//   }, [token]);

//   return (
//     <Box sx={{ p: 2, pt: 4 }}>
//       <Typography variant="h5" fontWeight="bold" mb={2}>
//         KYC Details
//       </Typography>

//       {/* Search Section */}
//       <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }} elevation={3}>
//         <Stack
//           spacing={2}
//           direction={{ xs: "column", sm: "row" }}
//           alignItems="center"
//         >
//           <TextField
//             label="Search by Company ID"
//             size="small"
//             value={searchId}
//             onChange={(e) => setSearchId(e.target.value)}
//           />
//           <Button variant="contained" onClick={fetchCompanyById}>
//             Search
//           </Button>

//           <TextField
//             label="Search by Company Name"
//             size="small"
//             value={searchName}
//             onChange={(e) => setSearchName(e.target.value)}
//           />
//           <Button variant="contained" onClick={fetchCompanyByName}>
//             Search
//           </Button>

//           <Button variant="contained" onClick={fetchAllCompanies}>
//             Show All
//           </Button>
//         </Stack>
//       </Paper>

//       {/* Loading */}
//       {loading ? (
//         <Box textAlign="center" mt={4}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Paper sx={{ p: 2, borderRadius: 3 }} elevation={3}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell align="center">
//                   <b>Company ID</b>
//                 </TableCell>
//                 <TableCell align="center">
//                   <b>Company Name</b>
//                 </TableCell>
//                 <TableCell align="center">
//                   <b>Contact Person</b>
//                 </TableCell>
//                 <TableCell align="center">
//                   <b>Mobile</b>
//                 </TableCell>
//                 <TableCell align="center">
//                   <b>Email</b>
//                 </TableCell>
//                 <TableCell align="center">
//                   <b>Website</b>
//                 </TableCell>
//                 <TableCell align="center">
//                   <b>Address</b>
//                 </TableCell>
//                 <TableCell align="center">
//                   <b>GST Number</b>
//                 </TableCell>
//                 <TableCell align="center">
//                   <b>PAN Number</b>
//                 </TableCell>
//                 <TableCell align="center">
//                   <b>KYC Status</b>
//                 </TableCell>
//                 <TableCell align="center">
//                   <b>Actions</b>
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {companies.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={11} align="center">
//                     No companies found.
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 companies.map((c) => (
//                   <TableRow key={c._id || c.id || index}>
//                     <TableCell align="center">{c._id || c.id}</TableCell>
//                     <TableCell align="center">{c.name || "-"}</TableCell>
//                     <TableCell align="center">
//                       {c.contactPerson || "-"}
//                     </TableCell>
//                     <TableCell align="center">{c.mobile || "-"}</TableCell>
//                     <TableCell align="center">{c.email || "-"}</TableCell>
//                     <TableCell align="center">{c.website || "-"}</TableCell>
//                     <TableCell align="center">{c.address || "-"}</TableCell>
//                     <TableCell align="center">{c.gstNo || "-"}</TableCell>
//                     <TableCell align="center">{c.panNo || "-"}</TableCell>
//                     <TableCell align="center">
//                       {kycStatus[c._id] || "Pending"}
//                     </TableCell>
//                     <TableCell align="center">
//                       <Button
//                         variant="contained"
//                         color="success"
//                         size="small"
//                         sx={{ mr: 1, width: "50%", height: "50%" }}
//                         onClick={() => verifyKyc(c._id, "approved")}
//                       >
//                         Approve
//                       </Button>

//                       <Button
//                         variant="contained"
//                         color="error"
//                         size="small"
//                         sx={{ mr: 1, width: "50%", height: "50%" }}
//                         onClick={() => verifyKyc(c._id, "rejected")}
//                       >
//                         Reject
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </Paper>
//       )}

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default ShowAllCompany;




// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import axios from "axios";

// const BASE_URL = "https://digidialersuperadmin.onrender.com";

// const ShowAllCompany = () => {
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchId, setSearchId] = useState("");
//   const [searchName, setSearchName] = useState("");
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

//   const token = localStorage.getItem("token");
//   const getAuthHeader = () => ({ Authorization: `Bearer ${token}` });

//   // Fetch all companies - example: you may need to fetch list of company IDs first
//   const fetchAllCompanies = async () => {
//     setLoading(true);
//     try {
//       // Replace with API to get all company IDs if needed
//       // Example: fetch list of all company IDs and map fetchKycDetails
//       // For demo, just fetching one example company
//       const res = await axios.get(`${BASE_URL}/api/superadmin/kyc/details/1`, { headers: getAuthHeader() });
//       const kyc = res.data.kycData;
//       setCompanies([kyc]);
//     } catch (err) {
//       console.error(err);
//       setSnackbar({ open: true, message: "Failed to fetch companies", severity: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch by ID
//   const fetchCompanyById = async () => {
//     if (!searchId.trim()) {
//       setSnackbar({ open: true, message: "Enter company ID", severity: "warning" });
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/api/superadmin/kyc/details/${searchId}`, { headers: getAuthHeader() });
//       const kyc = res.data.kycData;
//       setCompanies([kyc]);
//     } catch (err) {
//       console.error(err);
//       setSnackbar({ open: true, message: "Company not found by ID", severity: "error" });
//       setCompanies([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Approve / Reject KYC
//   const verifyKyc = async (company_id, action) => {
//     try {
//       await axios.put(
//         `${BASE_URL}/api/superadmin/kyc/verify/${company_id}`,
//         { action }, // "approved" or "rejected"
//         { headers: getAuthHeader() }
//       );

//       setSnackbar({ open: true, message: `KYC ${action} successfully`, severity: "success" });

//       // Update local state status
//       setCompanies((prev) =>
//         prev.map((c) =>
//           c.company_id === company_id ? { ...c, status: action } : c
//         )
//       );
//     } catch (err) {
//       console.error(err);
//       setSnackbar({ open: true, message: `Failed to ${action} KYC`, severity: "error" });
//     }
//   };

//   useEffect(() => {
//     if (token) fetchAllCompanies();
//   }, [token]);

//   return (
//     <Box sx={{ p: 2, pt: 4 }}>
//       <Typography variant="h5" fontWeight="bold" mb={2}>
//         KYC Details
//       </Typography>

//       {/* Search Section */}
//       <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }} elevation={3}>
//         <Stack spacing={2} direction={{ xs: "column", sm: "row" }} alignItems="center">
//           <TextField label="Search by Company ID" size="small" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
//           <Button variant="contained" onClick={fetchCompanyById}>Search</Button>
//           <Button variant="contained" onClick={fetchAllCompanies}>Show All</Button>
//         </Stack>
//       </Paper>

//       {/* Loading */}
//       {loading ? (
//         <Box textAlign="center" mt={4}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Paper sx={{ p: 2, borderRadius: 3 }} elevation={3}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell align="center"><b>Company ID</b></TableCell>
//                 <TableCell align="center"><b>Company Name</b></TableCell>
//                 <TableCell align="center"><b>Registration No</b></TableCell>
//                 <TableCell align="center"><b>GST Number</b></TableCell>
//                 <TableCell align="center"><b>PAN Number</b></TableCell>
//                 <TableCell align="center"><b>Director Name</b></TableCell>
//                 <TableCell align="center"><b>Director Mobile</b></TableCell>
//                 <TableCell align="center"><b>Director Email</b></TableCell>
//                 <TableCell align="center"><b>Website</b></TableCell>
//                 <TableCell align="center"><b>Address</b></TableCell>
//                 <TableCell align="center"><b>Status</b></TableCell>
//                 <TableCell align="center"><b>Actions</b></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {companies.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={12} align="center">No companies found.</TableCell>
//                 </TableRow>
//               ) : (
//                 companies.map((c) => (
//                   <TableRow key={c.company_id}>
//                     <TableCell align="center">{c.company_id}</TableCell>
//                     <TableCell align="center">{c.company_name}</TableCell>
//                     <TableCell align="center">{c.registration_no}</TableCell>
//                     <TableCell align="center">{c.gst_number}</TableCell>
//                     <TableCell align="center">{c.pan_number}</TableCell>
//                     <TableCell align="center">{c.director_name}</TableCell>
//                     <TableCell align="center">{c.director_mobile}</TableCell>
//                     <TableCell align="center">{c.director_email}</TableCell>
//                     <TableCell align="center">{c.company_website}</TableCell>
//                     <TableCell align="center">{c.company_address}</TableCell>
//                     <TableCell align="center">{c.status}</TableCell>
//                     <TableCell align="center">
//                       <Button variant="contained" color="success" size="small" sx={{ mr: 1 }} onClick={() => verifyKyc(c.company_id, "approved")}>Approve</Button>
//                       <Button variant="contained" color="error" size="small" onClick={() => verifyKyc(c.company_id, "rejected")}>Reject</Button>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </Paper>
//       )}

//       {/* Snackbar */}
//       <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
//         <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default ShowAllCompany;


// .................. working code in table ......................

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Snackbar,
//   Alert,
//   IconButton,
// } from "@mui/material";
// import axios from "axios";
// import InfoIcon from "@mui/icons-material/Info";

// const BASE_URL = "https://digidialersuperadmin.onrender.com";

// const ShowAllCompany = () => {
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchId, setSearchId] = useState("");
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const [selectedLog, setSelectedLog] = useState(null);

//   const token = localStorage.getItem("token");
//   const getAuthHeader = () => ({ Authorization: `Bearer ${token}` });

//   // Fetch all companies
//   const fetchAllCompanies = async () => {
//   setLoading(true);
//   try {
//     const res = await axios.get(`${BASE_URL}/api/superadmin/kyc/list`, {
//       headers: getAuthHeader(),
//     });
//     const kyc = res.data.kycList; // corrected
//     setCompanies(Array.isArray(kyc) ? kyc : kyc ? [kyc] : []);
//   } catch (err) {
//     console.error(err);
//     setSnackbar({
//       open: true,
//       message: "Failed to fetch companies",
//       severity: "error",
//     });
//   } finally {
//     setLoading(false);
//   }
// };

//   // Fetch by ID
//   const fetchCompanyById = async () => {
//     if (!searchId.trim()) {
//       setSnackbar({
//         open: true,
//         message: "Enter company ID",
//         severity: "warning",
//       });
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/api/superadmin/kyc/details/${searchId}`,
//         { headers: getAuthHeader() }
//       );
//       const kyc = res.data.kycData;
//       setCompanies(Array.isArray(kyc) ? kyc : kyc ? [kyc] : []);
//     } catch (err) {
//       console.error(err);
//       setSnackbar({
//         open: true,
//         message: "Company not found by ID",
//         severity: "error",
//       });
//       setCompanies([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Approve , Reject KYC
//   const verifyKyc = async (company_id, action) => {
//     try {
//       await axios.put(
//         `${BASE_URL}/api/superadmin/kyc/verify/${company_id}`,
//         { action },
//         { headers: getAuthHeader() }
//       );

//       setSnackbar({
//         open: true,
//         message: `KYC ${action} successfully`,
//         severity: "success",
//       });

//       setCompanies((prev) =>
//         prev.map(c =>
//           c.id === company_id ? { ...c, status: action } : c
//         )
//       );
//     } catch (err) {
//       // console.error(err);
//       setSnackbar({
//         open: true,
//         message: `Failed to ${action} KYC`,
//         severity: "error",
//       });
//     }
//   };

//   useEffect(() => {
//     if (token) fetchAllCompanies();
//   }, [token]);

//   return (
//     <Box sx={{ p: 2, pt: 4 }}>
//       <Typography variant="h5" fontWeight="bold" mb={2}>
//         KYC Details
//       </Typography>

//       {/* Search Section */}
//       <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }} elevation={3}>
//         <Stack
//           spacing={2}
//           direction={{ xs: "column", sm: "row" }}
//           alignItems="center"
//         >
//           <TextField
//             label="Search by Company ID"
//             size="small"
//             value={searchId}
//             onChange={(e) => setSearchId(e.target.value)}
//             sx={{ width: "400px" }}
//           />
//           <Button
//             sx={{ width: "300px" }}
//             variant="contained"
//             onClick={fetchCompanyById}
//           >
//             Search
//           </Button>

//           <Button variant="contained" onClick={fetchAllCompanies}>
//             Show All
//           </Button>
//         </Stack>
//       </Paper>

//       {/* Loading */}
//       {loading ? (
//         <Box textAlign="center" mt={4}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Paper sx={{ p: 2, borderRadius: 3 }} elevation={3}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell align="center">
//                   <b>Company ID</b>
//                 </TableCell>
//                 <TableCell align="center">
//                   <b>Company Name</b>
//                 </TableCell>
//                 <TableCell align="center">
//                   <b>Registration No</b>
//                 </TableCell>
//                 <TableCell align="center">
//                   <b>GST Number</b>
//                 </TableCell>
//                 <TableCell align="center">
//                   <b>PAN Number</b>
//                 </TableCell>
//                 <TableCell align="center">
//                   <b>Director Name</b>
//                 </TableCell>
//                 <TableCell align="center">
//                   <b>Director Mobile</b>
//                 </TableCell>
//                 <TableCell align="center">
//                   <b>Director Email</b>
//                 </TableCell>
//                 <TableCell align="center">
//                   <b>Website</b>
//                 </TableCell>
//                 <TableCell align="center">
//                   <b>Address</b>
//                 </TableCell>
//                 <TableCell align="center">
//                   <b>Status</b>
//                 </TableCell>
//                 <TableCell align="center">
//                   <b>Actions</b>
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {companies.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={12} align="center">
//                     No companies found.
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 companies.map(
//                   (c) =>
//                     c && (
//                       <TableRow key={c.company_id}>
//                         <TableCell align="center">{c.company_id}</TableCell>
//                         <TableCell align="center">{c.company_name}</TableCell>
//                         <TableCell align="center">{c.registration_no}</TableCell>
//                         <TableCell align="center">{c.gst_number}</TableCell>
//                         <TableCell align="center">{c.pan_number}</TableCell>
//                         <TableCell align="center">{c.director_name}</TableCell>
//                         <TableCell align="center">{c.director_mobile}</TableCell>
//                         <TableCell align="center">{c.director_email}</TableCell>
//                         <TableCell align="center">{c.company_website}</TableCell>
//                         <TableCell align="center">
//                           <Stack direction="column" spacing={1} alignItems="center">
//                             <IconButton
//                               color="primary"
//                               onClick={() =>
//                                 setSelectedLog((prev) =>
//                                   prev === c.company_id ? null : c.company_id
//                                 )
//                               }
//                             >
//                               <InfoIcon />
//                             </IconButton>
//                             {selectedLog === c.company_id && (
//                               <Typography variant="body2" sx={{ mt: 1 }}>
//                                 {c.company_address}
//                               </Typography>
//                             )}
//                           </Stack>
//                         </TableCell>
//                         <TableCell align="center">{c.status}</TableCell>
//                         <TableCell align="center">

//                           <Button
//                             variant="contained"
//                             color="success"
//                             size="small"
//                             sx={{ mr: 1, mb: 1,}}
//                             onClick={() => verifyKyc(c.company_id, "approved")}
//                           >
//                             Approve
//                           </Button>

//                           <Button
//                             variant="contained"
//                             color="error"
//                             size="small"
//                             onClick={() => verifyKyc(c.company_id, "rejected")}
//                           >
//                             Reject
//                           </Button>

//                         </TableCell>
//                       </TableRow>
//                     )
//                 )
//               )}
//             </TableBody>
//           </Table>
//         </Paper>
//       )}

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default ShowAllCompany;



// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Stack,
//   CircularProgress,
//   Snackbar,
//   Alert,
//   IconButton,
// } from "@mui/material";
// import axios from "axios";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// const BASE_URL = "https://digidialersuperadmin.onrender.com";

// const ShowAllCompany = () => {
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchId, setSearchId] = useState("");
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const [expandedCompany, setExpandedCompany] = useState(null);

//   const token = localStorage.getItem("token");
//   const getAuthHeader = () => ({ Authorization: `Bearer ${token}` });

//   // Fetch all companies
//   const fetchAllCompanies = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/api/superadmin/kyc/list`, {
//         headers: getAuthHeader(),
//       });
//       const kyc = res.data.kycList;
//       setCompanies(Array.isArray(kyc) ? kyc : kyc ? [kyc] : []);
//     } catch (err) {
//       console.error(err);
//       setSnackbar({
//         open: true,
//         message: "Failed to fetch companies",
//         severity: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch by ID
//   const fetchCompanyById = async () => {
//     if (!searchId.trim()) {
//       setSnackbar({
//         open: true,
//         message: "Enter company ID",
//         severity: "warning",
//       });
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/api/superadmin/kyc/details/${searchId}`,
//         { headers: getAuthHeader() }
//       );
//       const kyc = res.data.kycData;
//       setCompanies(Array.isArray(kyc) ? kyc : kyc ? [kyc] : []);
//     } catch (err) {
//       console.error(err);
//       setSnackbar({
//         open: true,
//         message: "Company not found by ID",
//         severity: "error",
//       });
//       setCompanies([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Approve / Reject KYC
//   const verifyKyc = async (company_id, action) => {
//     try {
//       await axios.put(
//         `${BASE_URL}/api/superadmin/kyc/verify/${company_id}`,
//         { action },
//         { headers: getAuthHeader() }
//       );

//       setSnackbar({
//         open: true,
//         message: `KYC ${action} successfully`,
//         severity: "success",
//       });

//       setCompanies((prev) =>
//         prev.map((c) =>
//           c.company_id === company_id ? { ...c, status: action } : c
//         )
//       );
//     } catch (err) {
//       setSnackbar({
//         open: true,
//         message: `Failed to ${action} KYC`,
//         severity: "error",
//       });
//     }
//   };

//   useEffect(() => {
//     if (token) fetchAllCompanies();
//   }, [token]);

//   return (
//     <Box sx={{ p: 2, pt: 4 }}>
//       <Typography variant="h5" fontWeight="bold" mb={2}>
//         KYC Details
//       </Typography>

//       {/* Search Section */}
//       <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }} elevation={3}>
//         <Stack
//           spacing={2}
//           direction={{ xs: "column", sm: "row" }}
//           alignItems="center"
//         >
//           <TextField
//             label="Search by Company ID"
//             size="small"
//             value={searchId}
//             onChange={(e) => setSearchId(e.target.value)}
//             sx={{ width: "400px" }}
//           />
//           <Button
//             sx={{ width: "300px" }}
//             variant="contained"
//             onClick={fetchCompanyById}
//           >
//             Search
//           </Button>

//           <Button variant="contained" onClick={fetchAllCompanies}>
//             Show All
//           </Button>
//         </Stack>
//       </Paper>

//       {loading ? (
//         <Box textAlign="center" mt={4}>
//           <CircularProgress />
//         </Box>
//       ) : companies.length === 0 ? (
//         <Typography>No companies found.</Typography>
//       ) : (
//         <Stack spacing={2}>
//           {companies.map((c) => (
//             <Paper
//               key={c.company_id}
//               sx={{ p: 2, borderRadius: 2 }}
//               elevation={3}
//             >
//               {/* Top Box with Company ID */}
//               <Box
//                 sx={{
//                   p: 1,
//                   backgroundColor: "#f0f0f0",
//                   borderRadius: 1,
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   cursor: "pointer",
//                   width:"300px"
//                 }}
//                 onClick={() =>
//                   setExpandedCompany(
//                     expandedCompany === c.company_id ? null : c.company_id
//                   )
//                 }
//               >
//                 <Typography variant="h6">{c.company_id}</Typography>
//                 {expandedCompany === c.company_id ? (
//                   <ExpandLessIcon />
//                 ) : (
//                   <ExpandMoreIcon />
//                 )}
//               </Box>

//                {/* Expanded Details */}
//               {/* {expandedCompany === c.company_id && (
//                 <Box sx={{ mt: 2 }}>
//                   <Typography>
//                     <b>Company Name:</b> {c.company_name}
//                   </Typography>
//                   <Typography>
//                     <b>Registration No:</b> {c.registration_no}
//                   </Typography>
//                   <Typography>
//                     <b>GST Number:</b> {c.gst_number}
//                   </Typography>
//                   <Typography>
//                     <b>PAN Number:</b> {c.pan_number}
//                   </Typography>
//                   <Typography>
//                     <b>Director Name:</b> {c.director_name}
//                   </Typography>
//                   <Typography>
//                     <b>Director Mobile:</b> {c.director_mobile}
//                   </Typography>
//                   <Typography>
//                     <b>Director Email:</b> {c.director_email}
//                   </Typography>
//                   <Typography>
//                     <b>Website:</b> {c.company_website}
//                   </Typography>
//                   <Typography>
//                     <b>Address:</b> {c.company_address}
//                   </Typography>
//                   <Typography>
//                     <b>Status:</b> {c.status}
//                   </Typography>
//                    <Typography>
//                     <b>PDF Data:</b> {c.status}
//                   </Typography>
//                   <Stack direction="row" spacing={1} mt={1} mb={1}>
//                     <Button
//                       variant="contained"
//                       color="success"
//                       size="small"
//                       onClick={() => verifyKyc(c.company_id, "approved")}
//                     >
//                       Approve
//                     </Button>
//                     <Button
//                       variant="contained"
//                       color="error"
//                       size="small"
//                       onClick={() => verifyKyc(c.company_id, "rejected")}
//                     >
//                       Reject
//                     </Button>
//                   </Stack>

//                   {/* PDF Documents 
//                   {["directorPan", "directorAadhaar", "gstDoc", "companyPanDoc"].map(
//                     (doc) =>
//                       c[doc] && (
//                         <Typography
//                           key={doc}
//                           variant="caption"
//                           sx={{ display: "block" }}
//                         >
//                           <b>{doc.replace(/([A-Z])/g, " $1")}:</b>{" "}
//                           {c[doc].name || c[doc]}
//                         </Typography>
//                       )
//                   )}
//                 </Box>
//               )} */}

//               {/* Expanded Details */}
//               {expandedCompany === c.company_id && (
//                 <Box sx={{ mt: 2 }}>
//                   <Typography>
//                     <b>Company Name:</b> {c.company_name}
//                   </Typography>
//                   <Typography>
//                     <b>Registration No:</b> {c.registration_no}
//                   </Typography>
//                   <Typography>
//                     <b>GST Number:</b> {c.gst_number}
//                   </Typography>
//                   <Typography>
//                     <b>PAN Number:</b> {c.pan_number}
//                   </Typography>
//                   <Typography>
//                     <b>Director Name:</b> {c.director_name}
//                   </Typography>
//                   <Typography>
//                     <b>Director Mobile:</b> {c.director_mobile}
//                   </Typography>
//                   <Typography>
//                     <b>Director Email:</b> {c.director_email}
//                   </Typography>
//                   <Typography>
//                     <b>Website:</b> {c.company_website}
//                   </Typography>
//                   <Typography>
//                     <b>Address:</b> {c.company_address}
//                   </Typography>
//                   <Typography>
//                     <b>Status:</b> {c.status}
//                   </Typography>

//                   <Stack direction="row" spacing={1} mt={1} mb={1}>
//                     <Button
//                       variant="contained"
//                       color="success"
//                       size="small"
//                       onClick={() => verifyKyc(c.company_id, "approved")}
//                     >
//                       Approve
//                     </Button>
//                     <Button
//                       variant="contained"
//                       color="error"
//                       size="small"
//                       onClick={() => verifyKyc(c.company_id, "rejected")}
//                     >
//                       Reject
//                     </Button>
//                   </Stack>

//                   {/* PDF Documents */}
//                   <Box mt={2}>
//                     <Typography variant="subtitle2" sx={{ mb: 1 }}>
//                       PDF Documents:
//                     </Typography>
//                     {[
//                       "directorPan",
//                       "directorAadhaar",
//                       "gstDoc",
//                       "companyPanDoc",
//                     ].map(
//                       (doc) =>
//                         c[doc] && (
//                           <Button
//                             key={doc}
//                             size="small"
//                             variant="outlined"
//                             sx={{ mr: 1, mb: 1 }}
//                             href={
//                               typeof c[doc] === "string" ? c[doc] : c[doc].url
//                             } // assuming API returns url or object with url
//                             target="_blank"
//                           >
//                             {doc.replace(/([A-Z])/g, " $1")}
//                           </Button>
//                         )
//                     )}
//                   </Box>
//                 </Box>
//               )}

//             </Paper>
//           ))}
//         </Stack>
//       )}

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default ShowAllCompany;