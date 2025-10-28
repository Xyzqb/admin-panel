import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DocumentViewer from "../Companies/DocumentViwer";

const BASE_URL = "https://digidialersuperadmin.onrender.com";

const ShowAllCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [expandedCompany, setExpandedCompany] = useState(null);

  const token = localStorage.getItem("token");
  const getAuthHeader = () => ({ Authorization: `Bearer ${token}` });

  // ✅ Fetch all companies
  const fetchAllCompanies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/superadmin/kyc/list`, {
        headers: getAuthHeader(),
      });
      const kyc = res.data.kycList;
      setCompanies(Array.isArray(kyc) ? kyc : kyc ? [kyc] : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setSnackbar({
        open: true,
        message: "Failed to fetch companies",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  console.log("Companies data:", companies);

  // ✅ Fetch company by ID
  const fetchCompanyById = async () => {
    if (!searchId.trim()) {
      setSnackbar({
        open: true,
        message: "Enter company ID",
        severity: "warning",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/superadmin/kyc/details/${searchId}`,
        { headers: getAuthHeader() }
      );
      const kyc = res.data.kycData;
      setCompanies(Array.isArray(kyc) ? kyc : kyc ? [kyc] : []);
    } catch (err) {
      console.error("Fetch by ID error:", err);
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

  // ✅ Approve / Reject KYC
  const verifyKyc = async (company_id, action) => {
    try {
      await axios.put(
        `${BASE_URL}/api/superadmin/kyc/verify/${company_id}`,
        { status: action }, // ✅ backend expects status
        { headers: getAuthHeader() }
      );

      setSnackbar({
        open: true,
        message: `KYC ${action} successfully`,
        severity: "success",
      });

      // update UI immediately
      setCompanies((prev) =>
        prev.map((c) =>
          c.company_id === company_id ? { ...c, status: action } : c
        )
      );
    } catch (err) {
      console.error("KYC verify failed:", err.response?.data || err);
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

  // ✅ Function to resolve PDF URL
  const getPdfUrl = (value) => {
    if (!value) return "#";
    if (typeof value === "string" && value.startsWith("http")) return value;
    return `${BASE_URL}/uploads/${value}`;
  };

  return (
    <Box sx={{ p: 2, pt: 6 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        KYC Details
      </Typography>

      {/* 🔍 Search Section */}
      <Paper sx={{ p: 2, mb: 4, borderRadius: 1, width:"915px"}} elevation={2}>
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
            sx={{ width: "290px" }}
          />

          <Button
            sx={{ width: "290px" }}
            variant="contained"
            onClick={fetchCompanyById}
          >
            Search by ID
          </Button>

          <Button variant="contained" 
          onClick={fetchAllCompanies}
            sx={{ width: "290px" }}
          >
            Show All
          </Button>
        </Stack>
      </Paper>

      {/* 📦 Data Display Section */}
      {loading ? (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : companies.length === 0 ? (
        <Typography>No companies found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {companies.map((c) => (
            <Grid item md={2} lg={2} key={c.company_id}>
              <Paper sx={{ p: 2, borderRadius: 2 }} elevation={3}>
            
                {/* <Box
                  sx={{
                    p: 1,
                    backgroundColor: "#f0f0f0",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    width:"250px"
                  }}
                  onClick={() =>
                    setExpandedCompany(
                      expandedCompany === c.company_id ? null : c.company_id
                    )
                  }
                >
                  <Typography variant="h6">{c.company_id}</Typography>
                  {expandedCompany === c.company_id ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </Box> */}


               <Box
               sx={{
                p:1.5,
                backgroundColor:"f0f0f0",
                borderRadius: 1.5,
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                // width:"100%",
                width:"250px"
               }}
               onClick={() =>
                setExpandedCompany(
                expandedCompany === c.company_id ? null : c.company_id)
               }
               >
              
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                 <span>{c.company_id}</span> {c.company_name || "Unnamed Company"}
                </Typography>
              </Box>

              {expandedCompany === c.company_id ? (
                <ExpandLessIcon/>
              ) : (
                <ExpandMoreIcon/>
              )}
               </Box>

                {/* Expanded Details */}
                {expandedCompany === c.company_id && (
                  <Box sx={{ mt: 2 }}>
                    {/* ✅ All details in one flex row */}
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                        fontSize: "14px",
                      }}
                    >
                      <Typography><b>Name:</b> {c.company_name}</Typography>
                      <Typography><b>Reg No:</b> {c.registration_no}</Typography>
                      <Typography><b>GST:</b> {c.gst_number}</Typography>
                      <Typography><b>PAN:</b> {c.pan_number}</Typography>
                      <Typography><b>Director:</b> {c.director_name}</Typography>
                      <Typography><b>Mobile:</b> {c.director_mobile}</Typography>
                      <Typography><b>Email:</b> {c.director_email}</Typography>
                      <Typography><b>Website:</b> {c.company_website}</Typography>
                      <Typography><b>Address:</b> {c.company_address}</Typography>
                      <Typography><b>Status:</b> {c.status}</Typography>
                    </Box>

                    {/* 📄 PDF Documents */}
                <DocumentViewer documents={c.documents} />


                    {/* ✅ Approve / Reject buttons */}
                    <Box sx={{ mt: 2 }}>
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => verifyKyc(c.company_id, "approved")}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => verifyKyc(c.company_id, "rejected")}
                        >
                          Reject
                        </Button>
                      </Stack>
                    </Box>
                  </Box>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* ✅ Snackbar for feedback */}
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
