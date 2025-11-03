
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  TextField,
  Button,
  Snackbar,
  Alert,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Description } from "@mui/icons-material";

const BASE_URL = "https://digidialersuperadmin.onrender.com";

const PlanDetails = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [planId, setPlansId] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Model states
  const [openForm, setOpenForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    call_limit: "",
    sms_limit: "",
    unlimited_calls: false,
    unlimited_sms: false,
    Description: "",
  });

  const showSnackbar = (message, severity = "success") =>
    setSnackbar({ open: true, message, severity });

  // Fetch all plans
  const fetchAllPlans = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/superadmin/plan/all`);
      setPlans(res.data.allPlan || []);
    } catch (error) {
      showSnackbar("failed to load plans", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch plan by ID
  const fetchPlanById = async () => {
    if (!planId.trim()) return showSnackbar("Enter plan ID", "warning");
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/superadmin/plan/${planId}`);
      // const planData = res.data.plan || res.data;
      const planData = res.data.planById;
      if (planData && planData.id) {
        setPlans([planData]);
        showSnackbar("plan fetch successfully");
      } else {
        showSnackbar("Plan not found", "error");
      }
    } catch (err) {
      console.error(err);
      showSnackbar("Plan not found", "error");
    } finally {
      setLoading(false);
    }
  };

  //  Create or update plan
  const handleSave = async () => {
    try {
      if (editMode) {
        await axios.patch(
          `${BASE_URL}/api/superadmin/plan/${formData.id}`,
          formData
        );
        showSnackbar("Plan updated successfully");
      } else {
        await axios.post(`${BASE_URL}/api/superadmin/plan/create`, formData);
        showSnackbar("Plan created successfully");
      }
      setOpenForm(false);
      fetchAllPlans();
    } catch (err) {
      showSnackbar("Failed to save plan", "error");
    }
  };

  // Delete plan
  const DeletePlan = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/superadmin/plan/${id}`);
      showSnackbar("Plan deleted successfully");
      fetchAllPlans();
    } catch (err) {
      showSnackbar("Failed to delete plan", "error");
    }
  };

  // Open model for create
  const handleOpenCreate = () => {
    setEditMode(false);
    setFormData({
      id: "",
      name: "",
      price: "",
      call_limit: "",
      unlimited_calls: "",
      unlimited_sms: "",
      Description: "",
    });
    setOpenForm(true);
  };

  // ✅ Open Modal for Edit
  const handleOpenEdit = (plan) => {
    setEditMode(true);
    setFormData(plan);
    setOpenForm(true);
  };

  useEffect(() => {
    fetchAllPlans();
  }, []);

  return (
    <Box sx={{ p: 3, maxWidth: "1200px", mx: "auto" }}>
      <Typography variant="h5" fontWeight="bold" sx={{ p: 2, pb:1}}>
        Plans Details
      </Typography>

      <Paper
        sx={{
          p: 2,
          mb: 3,
          display: "flex",
          gap: 2,
          alignItems: "center",
          background: "#f0f7ff",
        }}
      >
        <TextField
          label="search by plan ID"
          value={planId}
          onChange={(e) => setPlansId(e.target.value)}
          size="small"
          sx={{ width: 300 }}
        />

        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={fetchPlanById}
          sx={{ width: "180px" }}
        >
          Search
        </Button>
        <Button
          variant="contained"
          onClick={fetchAllPlans}
          sx={{ width: "180px" }}
        >
          Show All
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
        >
          Add New Plan
        </Button>
      </Paper>

      {/* 📋 Plans Table */}
      <Paper sx={{ p: 2 }}>
        {loading ? (
          <Box sx={{ textAlign: "center", py: 4 }}>{<CircularProgress />}</Box>
        ) : plans.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
                <TableRow>
                  <TableCell align="center">
                    <strong>ID</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Price (₹)</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Call Limit</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>SMS Limit</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Unlimited Calls</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Unlimited SMS</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Description</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {plans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell align="center">{plan.id}</TableCell>
                    <TableCell align="center">{plan.name}</TableCell>
                    <TableCell align="center">{plan.price}</TableCell>
                    <TableCell align="center">
                      {plan.call_limit || "-"}
                    </TableCell>
                    <TableCell align="center">
                      {plan.sms_limit || "-"}
                    </TableCell>
                    <TableCell align="center">
                      {plan.unlimited_calls ? "✅" : "❌"}
                    </TableCell>
                    <TableCell align="center">
                      {plan.unlimited_sms ? "✅" : "❌"}
                    </TableCell>
                    <TableCell align="center">{plan.description}</TableCell>

                    <TableCell align="center">
                      <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="center"
                      alignItems="center"
                      >
                      <Tooltip title="Edit">
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenEdit(plan)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => DeletePlan(plan.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                       </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          // <Typography sx={{ textAlign: "center", py: 4 }}>
          //   No plans found.
          // </Typography>
          <Typography
            sx={{
              textAlign: "center",
              py: 6,
              fontSize: "1.1rem",
              color: "gray",
              fontStyle: "italic",
            }}
          >
            No plans available.
          </Typography>
        )}
      </Paper>

      {/* 📝 Create / Edit Dialog */}
      <Dialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{editMode ? "Edit Plan" : "Create Plan"}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Plan Name"
              name="name"
              size="small"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              fullWidth
            />

            <TextField
              label="price"
              type="number"
              name="price"
              size="small"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />

            <TextField
              label="call limit"
              name="call_limit"
              size="small"
              value={formData.call_limit}
              onChange={(e) =>
                setFormData({ ...formData, call_limit: e.target.value })
              }
            />

            <TextField
              label="SMS limit"
              name="sms_limit"
              size="small"
              value={formData.sms_limit}
              onChange={(e) =>
                setFormData({ ...formData, sms_limit: e.target.value })
              }
              fullWidth
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.unlimited_calls}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      unlimited_calls: e.target.checked,
                    })
                  }
                />
              }
              label="Unlimited Calls"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.unlimited_calls}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              }
              label="Unlimited SMS"
            />

            <TextField
              label="Description"
              name="description"
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editMode ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "buttom", horizontal: "center" }}
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

export default PlanDetails;
