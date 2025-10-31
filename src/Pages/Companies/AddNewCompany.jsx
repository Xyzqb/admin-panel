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

const AddNewCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Show snackbar
  const showSnackbar = (message, severity) =>
    setSnackbar({ open: true, message, severity });

  // Fetch all companies
  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/superadmin/company/allcompany`
      );
      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.companies || [];
      setCompanies(data);
    } catch (err) {
      console.error("Error fetching companies:", err);
      showSnackbar("Failed to load companies", "error");
    } finally {
      setLoading(false);
    }
  };

  // Add new company
  const addCompany = async () => {
    if (!name.trim() || !domain.trim()) {
      showSnackbar("Please fill all fields", "warning");
      return;
    }
    setAddLoading(true);
    try {
      const token =
        localStorage.getItem("authToken") || localStorage.getItem("token");
      if (!token) {
        showSnackbar("Please login first", "error");
        setAddLoading(false);
        return;
      }

      const res = await axios.post(
        `${BASE_URL}/api/superadmin/company/create`,
        { name: name.trim(), domain: domain.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newCompany = res.data;
      setCompanies((prev) => [newCompany, ...prev]);
      setName("");
      setDomain("");
      showSnackbar("Company added successfully!", "success");
      fetchCompanies();
    } catch (err) {
      console.error("Error adding company:", err.response?.data || err.message);
      let errorMessage = "Failed to add company";

      if (err.response) {
        if (err.response.status === 400)
          errorMessage =
            err.response.data?.message || "Invalid data. Checks input";
        else if (err.response.status === 401)
          errorMessage = "Unauthorized. Login again.";
        else if (err.response.status === 409)
          errorMessage = "Company already exists.";
        else
          errorMessage =
            err.response.data?.message || `Error: ${err.response.status}`;
      } else if (err.request) {
        errorMessage = "Network error. Check connection.";
      }

      showSnackbar(errorMessage, "error");
    } finally {
      setAddLoading(false);
    }
  };

  // Search by ID
  const searchCompanyById = async () => {
    if (!searchId.trim()) return showSnackbar("Enter company ID", "warning");
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/superadmin/company/getcompany/${searchId}`
      );
      const data = res.data;
      setCompanies(Array.isArray(data) ? data : [data]);
      showSnackbar("Company found!", "success");
    } catch (err) {
      showSnackbar("Company not found", "error");
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  // Search by Name
  const searchCompanyByName = async () => {
    if (!searchName.trim())
      return showSnackbar("Enter company name", "warning");

    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/superadmin/company/getcompanyname/${encodeURIComponent(
          searchName.trim()
        )}`
      );

      // normalize response
      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.company
        ? [res.data.company]
        : [];

      if (data.length === 0) {
        showSnackbar("Company not found", "error");
        setCompanies([]);
      } else {
        setCompanies(data);
        showSnackbar("Company found!", "success");
      }
    } catch (err) {
      console.error("Search by name error:", err.response?.data || err.message);
      showSnackbar("Company not found", "error");
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  // Clear search and show all companies
  const clearSearch = () => {
    setSearchId("");
    setSearchName("");
    fetchCompanies();
    showSnackbar("Showing all companies", "info");
  };

  // Handle Enter key in form
  const handleKeyPress = (e) => {
    if (e.key === "Enter") addCompany();
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3 }}>
      <Typography variant="h4" mb={1} fontWeight="bold">
        Add Company
      </Typography>

      {/* ADD COMPANY sx={{ backgroundColor: "#e3f2fd" }}*/}
      {/* <Paper sx={{ p: 2, mb: 2, backgroundColor: "#00838f" , boxShadow:"0px, 10px, 15px"}}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Add New Company
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="flex-end"
        >
          <TextField
            label="Company Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            fullWidth
            size="small"
            required
          />
          <TextField
            label="Domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyPress={handleKeyPress}
            fullWidth
            size="small"
            required
            placeholder="example.com"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addCompany}
            disabled={addLoading}
            sx={{ minWidth: "120px", height: "40px" }}
          >
            {addLoading ? <CircularProgress size={40} /> : "Add"}
          </Button>
        </Stack>
      </Paper> */}

      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: "#26a69a",
          boxShadow: "0px 8px 25px, #fff",
          color: "#fff",
        }}
      >
        <Typography variant="h6" mb={2} fontWeight="bold">
          Add New Company
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="flex-end"
        >
          <TextField
            label="Company Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            fullWidth
            size="small"
            required
            sx={{ background: "#fff", borderRadius: 1 }}
          />
          <TextField
            label="Domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyPress={handleKeyPress}
            fullWidth
            size="small"
            required
            placeholder="example.com"
            sx={{ background: "#fff", borderRadius: 1 }}
          />
          <Button
            variant="contained"
            onClick={addCompany}
            disabled={addLoading}
            sx={{
              minWidth: "120px",
              height: "40px",
              backgroundColor: "#00897b",
              "&:hover": { backgroundColor: "#3ddfcaff" },
            }}
          >
            {addLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Add"
            )}
          </Button>
        </Stack>
      </Paper>

      {/* SEARCH */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          // background: "#80cbc4",
          // background:"	#0080ff",
          background: "#b0bec5",
          boxShadow: "0px 8px 25px, #fff",
          color: "black",
        }}
      >
        <Typography variant="h6" mb={2} fontWeight="bold">
          Search Company
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems="flex-end"
        >
          <Box sx={{ flex: 1 }}>
            <TextField
              label="Search by ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              fullWidth
              size="small"
              sx={{ background: "#fff", borderRadius: 1 }}
            />
            <Button
              variant="contained"
              onClick={searchCompanyById}
              sx={{
                mt: 1,
                width: "100%",
                backgroundColor: "primary",
                // "&:hover": { backgroundColor: "#3ddfcaff" },
              }}
            >
              Search by ID
            </Button>
          </Box>

          <Box sx={{ flex: 1 }}>
            <TextField
              label="Search by Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              fullWidth
              size="small"
              sx={{ background: "#fff", borderRadius: 1 }}
            />
            <Button
              variant="contained"
              onClick={searchCompanyByName}
              sx={{
                mt: 1,
                width: "100%",
                backgroundColor: "primary",
                // "&:hover": { backgroundColor: "#3ddfcaff" },
              }}
            >
              Search by Name
            </Button>
          </Box>

          <Button
            variant="contained"
            color="secondary"
            onClick={clearSearch}
            sx={{
              height: "40px",
              fontWeight: "bold",
              backgroundColor: "primary",
              // "&:hover": { backgroundColor: "#3ddfcaff" },
            }}
          >
            Show All
          </Button>
        </Stack>
      </Paper>

      {/* COMPANY TABLE  */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Company List {companies.length > 0 && `(${companies.length})`}
        </Typography>

        {loading ? (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <CircularProgress />
            <Typography sx={{ mt: 1 }}>Loading companies...</Typography>
          </Box>
        ) : Array.isArray(companies) && companies.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                  <TableCell>
                    <strong>ID</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Domain</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companies.map((company, index) => (
                  <TableRow
                    key={company._id || company.id || index}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                      "&:hover": { backgroundColor: "#f5f5f5" },
                    }}
                  >
                    <TableCell
                      sx={{ fontFamily: "monospace", fontSize: "0.8rem" }}
                    >
                      {company._id || company.id || "N/A"}
                    </TableCell>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>
                      <Typography
                        color="primary"
                        sx={{ textDecoration: "underline" }}
                      >
                        {company.domain}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{ color: "success.main", fontWeight: "bold" }}
                      >
                        Active
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No companies found
            </Typography>
            <Button variant="outlined" onClick={fetchCompanies} sx={{ mt: 1 }}>
              Refresh List
            </Button>
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

export default AddNewCompany;
