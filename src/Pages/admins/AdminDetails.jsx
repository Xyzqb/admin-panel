import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Stack,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const BASE_URL = "https://digidialersuperadmin.onrender.com";

const AdminDetails = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const [editAdmin, setEditAdmin] = useState({
    id: "",
    company_id: "",
    name: "",
    email: "",
    password: "",
    mobile: "",
    global_role: "",
  });

  const [newAdmin, setNewAdmin] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    mobile: "",
    company_id: "",
    global_role: "",
  });

  const showSnackbar = (message, severity = "success") =>
    setSnackbar({ open: true, message, severity });

  // Fetch all admins
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/api/superadmin/users/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const allAdmins =
        res?.data?.allAdmin || res?.data?.admins || res?.data || [];
      setAdmins(allAdmins);
    } catch (err) {
      console.error("Fetch admins error:", err?.response?.data || err.message);
      showSnackbar("Failed to fetch admins", "error");
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  // Search admin by ID
  const fetchAdminById = async () => {
    if(!searchId.trim()) return showSnackbar("Enter Admin ID", "warning");
    setLoading(true);
    try{
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/api/superadmin/users/admin`,{
        headers: {Authorization: `Bearer ${token}`},
      });
      const allAdmins = res?.data?.allAdmin || res?.data || [];
      const admin = allAdmins.find((a) => String(a.id) === searchId.trim());
      if(!admin) throw new error("Admin not found");
      setAdmins([admin]);
      showSnackbar("Admin found!", "success");
    } catch(err){
      console.err("Search error:", err);
      setAdmins([]);
      showSnackbar("Admin not found", "error");
    } finally{
      setLoading(false);
    }
  };

  // Add new admin
  const addNewAdmin = async () => {
    try {
      const payload = {
        name: newAdmin.name.trim(),
        email: newAdmin.email.trim(),
        password: newAdmin.password,
        mobile: newAdmin.mobile.trim(),
        company_id: String(newAdmin.company_id).trim(),
        global_role: newAdmin.global_role.trim(),
      };

      if (Object.values(payload).some((v) => !v)) {
        return showSnackbar("All fields are required", "warning");
      }

      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${BASE_URL}/api/superadmin/users/createAdmin`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const addedAdmin = { id: res.data?.id, ...payload }; // include id from response
      setAdmins((prev) => [...prev, addedAdmin]);
      showSnackbar("Admin added successfully!");
      setAddDialogOpen(false);
      setNewAdmin({
        id: "",
        name: "",
        email: "",
        password: "",
        mobile: "",
        company_id: "",
        global_role: "",
      });
    } catch (err) {
      console.error("Add admin error:", err?.response?.data || err.message);
      const msg =
        err?.response?.data?.message || err?.message || "Failed to add admin";
      showSnackbar(msg, "error");
    }
  };

  // Delete admin
  const deleteAdmin = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/api/superadmin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showSnackbar("Admin deleted successfully!");
      fetchAdmins();
    } catch (err) {
      console.error("Delete admin error:", err?.response?.data || err.message);
      showSnackbar("Failed to delete admin", "error");
    }
  };

  // Open edit dialog
  const openEditDialog = (admin) => {
    setEditAdmin({ ...admin });
    setEditDialogOpen(true);
  };

  // Update admin
  const updateAdmin = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `${BASE_URL}/api/superadmin/users/${editAdmin.id}`,
        {
          name: editAdmin.name,
          email: editAdmin.email,
          password: editAdmin.password,
          mobile: editAdmin.mobile,
          company_id: editAdmin.company_id,
          global_role: editAdmin.global_role,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showSnackbar("Admin updated successfully!");
      setEditDialogOpen(false);
      fetchAdmins();
    } catch (err) {
      console.error("Update admin error:", err?.response?.data || err);
      showSnackbar("Failed to update admin", "error");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3 }}>
      <Typography variant="h4" mb={2} fontWeight="bold">
        Admins Details
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setAddDialogOpen(true)}
        sx={{ mb: 3, color: "#fff" }}
      >
        Add Admin
      </Button>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
        <TextField
          sx={{ backgroundColor: "white" }}
          label="Search by Admin ID"
          size="small"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={fetchAdminById}
          sx={{ minWidth: 120 }}
        >
          Search
        </Button>
        <Button
          variant="contained"
          onClick={fetchAdmins}
          sx={{ minWidth: 120 }}
        >
          Show All
        </Button>
      </Stack>

      <Paper>
        {loading ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Company ID</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Mobile Number</TableCell>
                  <TableCell align="center">Global Role</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {admins.length > 0 ? (
                  admins.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell align="center">{admin.id}</TableCell>
                      <TableCell align="center">{admin.company_id}</TableCell>
                      <TableCell align="center">{admin.name}</TableCell>
                      <TableCell align="center">{admin.email}</TableCell>
                      <TableCell align="center">{admin.mobile}</TableCell>
                      <TableCell align="center">{admin.global_role}</TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <IconButton color="primary" onClick={() => openEditDialog(admin)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => deleteAdmin(admin.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No admins found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth>
        <DialogTitle>Edit Admin</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Name"
              size="small"
              value={editAdmin.name}
              onChange={(e) => setEditAdmin({ ...editAdmin, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Email"
              size="small"
              value={editAdmin.email}
              onChange={(e) => setEditAdmin({ ...editAdmin, email: e.target.value })}
              fullWidth
            />
            <TextField
              label="Password"
              size="small"
              value={editAdmin.password}
              onChange={(e) => setEditAdmin({ ...editAdmin, password: e.target.value })}
              fullWidth
            />
            <TextField
              label="Mobile Number"
              size="small"
              value={editAdmin.mobile}
              onChange={(e) => setEditAdmin({ ...editAdmin, mobile: e.target.value })}
              fullWidth
            />
            <TextField
              label="Company ID"
              size="small"
              value={editAdmin.company_id}
              onChange={(e) => setEditAdmin({ ...editAdmin, company_id: e.target.value })}
              fullWidth
            />
            <TextField
              label="Global Role"
              size="small"
              value={editAdmin.global_role}
              onChange={(e) => setEditAdmin({ ...editAdmin, global_role: e.target.value })}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={updateAdmin}>Update</Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} fullWidth>
        <DialogTitle>Add New Admin</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Name"
              size="small"
              value={newAdmin.name}
              onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Email"
              size="small"
              value={newAdmin.email}
              onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
              fullWidth
            />
            <TextField
              label="Password"
              size="small"
              type="password"
              value={newAdmin.password}
              onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
              fullWidth
            />
            <TextField
              label="Mobile Number"
              size="small"
              value={newAdmin.mobile}
              onChange={(e) => setNewAdmin({ ...newAdmin, mobile: e.target.value })}
              fullWidth
            />
            <TextField
              label="Company ID"
              size="small"
              value={newAdmin.company_id}
              onChange={(e) => setNewAdmin({ ...newAdmin, company_id: e.target.value })}
              fullWidth
            />
            <TextField
              label="Global Role"
              size="small"
              value={newAdmin.global_role}
              onChange={(e) => setNewAdmin({ ...newAdmin, global_role: e.target.value })}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="success" onClick={addNewAdmin}>Add Admin</Button>
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

export default AdminDetails;
