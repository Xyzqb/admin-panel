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


import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

const BASE_URL = "https://digidialersuperadmin.onrender.com";

const ShowAllCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [kycStatus, setKycStatus] = useState({});

  const token = localStorage.getItem("token");
  const getAuthHeader = () => ({ Authorization: `Bearer ${token}` });

  // ✅ Fetch all companies (get all company IDs first, then their KYC details)
  const fetchAllCompanies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/superadmin/kyc/details/${company_id}`,
        { headers: getAuthHeader() }
      );
      const data = res.data || [];
      setCompanies(data);

      // Fetch KYC status for each company
      data.forEach((c) => fetchKycStatus(c._id));
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Failed to fetch companies",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch company by ID
  const fetchCompanyById = async () => {
    if (!searchId.trim())
      return setSnackbar({
        open: true,
        message: "Enter company ID",
        severity: "warning",
      });

    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/superadmin/kyc/details/${searchId}`,
        { headers: getAuthHeader() }
      );

      const company = res.data;
      const companyId = company._id || company.id;
      setCompanies([company]);

      // Fetch KYC details
      await fetchKycDetails(companyId);
      await fetchKycStatus(companyId);
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Company not found by ID",
        severity: "error",
      });
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch company by Name
  const fetchCompanyByName = async () => {
    if (!searchName.trim())
      return setSnackbar({
        open: true,
        message: "Enter company name",
        severity: "warning",
      });

    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/superadmin/company/getcompanyname/${searchName}`,
        { headers: getAuthHeader() }
      );

      const company = res.data;
      setCompanies([company]);
      await fetchKycDetails(company._id);
      await fetchKycStatus(company._id);
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Company not found by name",
        severity: "error",
      });
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch KYC details
  const fetchKycDetails = async (company_id) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/superadmin/kyc/details/${company_id}`,
        { headers: getAuthHeader() }
      );

      console.log(`KYC details for ${company_id}:`, res.data);
    } catch (err) {
      console.error(`No KYC details found for ${company_id}`);
    }
  };

  // ✅ Fetch KYC status
  const fetchKycStatus = async (company_id) => {
    if (!company_id) return;
    try {
      const res = await axios.get(
        `${BASE_URL}/api/superadmin/kyc/status/${company_id}`,
        { headers: getAuthHeader() }
      );

      setKycStatus((prev) => ({
        ...prev,
        [company_id]: res.data?.status || "Pending",
      }));
    } catch (err) {
      console.error(`No KYC status for company ID ${company_id}`);
      setKycStatus((prev) => ({ ...prev, [company_id]: "Pending" }));
    }
  };

  // ✅ Approve / Reject KYC
  const verifyKyc = async (company_id, action) => {
    try {
      await axios.put(
        `${BASE_URL}/api/superadmin/kyc/verify/${company_id}`,
        { action }, // "approved" or "rejected"
        { headers: getAuthHeader() }
      );

      setSnackbar({
        open: true,
        message: `KYC ${action} successfully`,
        severity: "success",
      });

      fetchKycStatus(company_id);
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: `Failed to ${action} KYC`,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    if (token) fetchAllCompanies();
  }, [token]);

  return (
    <Box sx={{ p: 2, pt: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        KYC Details
      </Typography>

      {/* Search Section */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }} elevation={3}>
        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
        >
          <TextField
            label="Search by Company ID"
            size="small"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <Button variant="contained" onClick={fetchCompanyById}>
            Search
          </Button>

          <TextField
            label="Search by Company Name"
            size="small"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Button variant="contained" onClick={fetchCompanyByName}>
            Search
          </Button>

          <Button variant="contained" onClick={fetchAllCompanies}>
            Show All
          </Button>
        </Stack>
      </Paper>

      {/* Loading */}
      {loading ? (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{ p: 2, borderRadius: 3 }} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center"><b>Company ID</b></TableCell>
                <TableCell align="center"><b>Company Name</b></TableCell>
                <TableCell align="center"><b>Contact Person</b></TableCell>
                <TableCell align="center"><b>Mobile</b></TableCell>
                <TableCell align="center"><b>Email</b></TableCell>
                <TableCell align="center"><b>Website</b></TableCell>
                <TableCell align="center"><b>Address</b></TableCell>
                <TableCell align="center"><b>GST Number</b></TableCell>
                <TableCell align="center"><b>PAN Number</b></TableCell>
                <TableCell align="center"><b>KYC Status</b></TableCell>
                <TableCell align="center"><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={11} align="center">
                    No companies found.
                  </TableCell>
                </TableRow>
              ) : (
                companies.map((c, index) => (
                  <TableRow key={c._id || c.id || index}>
                    <TableCell align="center">{c._id || c.id}</TableCell>
                    <TableCell align="center">{c.name || "-"}</TableCell>
                    <TableCell align="center">{c.contactPerson || "-"}</TableCell>
                    <TableCell align="center">{c.mobile || "-"}</TableCell>
                    <TableCell align="center">{c.email || "-"}</TableCell>
                    <TableCell align="center">{c.website || "-"}</TableCell>
                    <TableCell align="center">{c.address || "-"}</TableCell>
                    <TableCell align="center">{c.gstNo || "-"}</TableCell>
                    <TableCell align="center">{c.panNo || "-"}</TableCell>
                    <TableCell align="center">
                      {kycStatus[c._id] || "Pending"}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => verifyKyc(c._id, "approved")}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => verifyKyc(c._id, "rejected")}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ShowAllCompany;
