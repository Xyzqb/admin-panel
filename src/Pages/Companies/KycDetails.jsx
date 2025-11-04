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
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

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

  const token = localStorage.getItem("authToken");

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

  // console.log("Companies data:", companies);

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
    console.log(`Verifying KYC for ${company_id} with action: ${action}`);
    try {
      await axios.put(
        `${BASE_URL}/api/superadmin/kyc/verify/${company_id}`,
        { action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
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
      <Typography variant="h5" fontWeight="bold" mb={1}>
        KYC Details
      </Typography>

      {/* 🔍 Search Section */}
      <Paper
        sx={{ p: 2, mb: 4, borderRadius: 1, width: "915px" }}
        elevation={2}
      >
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
            <PersonSearchRoundedIcon />
            Search by ID
          </Button>

          <Button
            variant="contained"
            onClick={fetchAllCompanies}
            sx={{ width: "290px" }}
          >
            <SearchRoundedIcon />
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
                <Box
                  sx={{
                    p: 1.5,
                    backgroundColor: "f0f0f0",
                    borderRadius: 1.5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "250px",
                  }}
                  onClick={() =>
                    setExpandedCompany(
                      expandedCompany === c.company_id ? null : c.company_id
                    )
                  }
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    {/* 🏢 Company Name + ID */}
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{ mb: 1 }}
                    >
                      {c.company_name || "Unnamed Company"} ({c.company_id})
                    </Typography>

                    {/* 🏷️ Status Badge */}
                    <Box
                      sx={{
                        px: 2,
                        py: 0.5,
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: "bold",
                        color:
                          c.status === "approved"
                            ? "#1b5e20"
                            : c.status === "rejected"
                            ? "#b71c1c"
                            : "#f57f17",
                        backgroundColor:
                          c.status === "approved"
                            ? "#c8e6c9"
                            : c.status === "rejected"
                            ? "#ffcdd2"
                            : "#fff9c4",
                        textTransform: "capitalize",
                        boxShadow: "0 0 4px rgba(0,0,0,0.1)",
                        width: "fit-content",
                        mb: 1,
                      }}
                    >
                      {c.status || "pending"}
                    </Box>
                  </Box>

                  {expandedCompany === c.company_id ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </Box>

                {/* Expanded Details */}
                {expandedCompany === c.company_id && (
                  <Box sx={{ mt: 2 }}>
                    {/* ✅ All details in one flex row */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#f0f6ff",
                        borderRadius: "8px",
                        padding: "16px",
                        gap: 2,
                        fontSize: "14px",
                        boxShadow: "0 1px 3px",
                        "& > *:nth-of-type(odd)": {
                          backgroundColor: "#f0f6f",
                        },
                        "& > *:nth-of-type(even)": {
                          backgroundColor: "#e3f2fd",
                        },
                        "& > *": {
                          padding: "8px 4px",
                        },
                      }}
                    >
                      <Typography>
                        <b>Name:</b> {c.company_name}
                      </Typography>
                      <Typography>
                        <b>Reg No:</b> {c.registration_no}
                      </Typography>
                      <Typography>
                        <b>GST:</b> {c.gst_number}
                      </Typography>
                      <Typography>
                        <b>PAN:</b> {c.pan_number}
                      </Typography>
                      <Typography>
                        <b>Director:</b> {c.director_name}
                      </Typography>
                      <Typography>
                        <b>Mobile:</b> {c.director_mobile}
                      </Typography>
                      <Typography>
                        <b>Email:</b> {c.director_email}
                      </Typography>
                      <Typography>
                        <b>Website:</b> {c.company_website}
                      </Typography>
                      <Typography>
                        <b>Address:</b> {c.company_address}
                      </Typography>
                      <Typography>
                        <b>Status:</b> {c.status}
                      </Typography>
                    </Box>

                    {/* 📄 PDF Documents */}
                    <DocumentViewer documents={c.documents} />

                    {/* ✅ Approve / Reject buttons */}
                    <Box sx={{ mt: 2, padding: "14px" }}>
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => verifyKyc(c.company_id, "approved")}
                          disabled={
                            c.status === "approved" || c.status === "rejected"
                          }
                          sx={{
                            filter:
                              c.status === "approved" || c.status === "rejected"
                                ? "blur(1px)"
                                : "none",
                            boxShadow:
                              c.status === "pending"
                                ? "0 0 10px 2px rgba(76, 175, 80, 0.8)" // glowing green effect
                                : "none",
                            transition: "all 0.3s ease",
                            cursor:
                              c.status === "approved" || c.status === "rejected"
                                ? "not-allowed"
                                : "pointer",
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => verifyKyc(c.company_id, "rejected")}
                          disabled={
                            c.status === "approved" || c.status === "rejected"
                          }
                          sx={{
                            filter:
                              c.status === "approved" || c.status === "rejected"
                                ? "blur(1px)"
                                : "none",
                            boxShadow:
                              c.status === "pending"
                                ? "0 0 10px 2px rgba(76, 175, 80, 0.8)" // glowing green effect
                                : "none",
                            transition: "all 0.3s ease",
                            cursor:
                              c.status === "approved" || c.status === "rejected"
                                ? "not-allowed"
                                : "pointer",
                          }}
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
