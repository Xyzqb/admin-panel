import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Box,
  Paper,
  Typography,
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
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import PlanCard from "./PlanCard";
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

  // modal states
  const [openForm, setOpenForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    call_limit: "",
    sms_limit: "",
    unlimited_calls: false,
    unlimited_sms: false,
    description: "",
  });

  const showSnackbar = (message, severity = "success") =>
    setSnackbar({ open: true, message, severity });

  // fetch all plans
  const fetchAllPlans = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/superadmin/plan/all`);
      setPlans(res.data.allPlan || []);
    } catch (error) {
      showSnackbar("Failed to load plans", "error");
    } finally {
      setLoading(false);
    }
  };

  // fetch plan by ID
  const fetchPlanById = async () => {
    if (!planId.trim()) return showSnackbar("Enter plan ID", "warning");
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/superadmin/plan/${planId}`);
      const planData = res.data.planById;
      if (planData && planData.id) {
        setPlans([planData]);
        showSnackbar("Plan fetched successfully");
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

  // create or update plan
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

  // delete plan
  const DeletePlan = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/superadmin/plan/${id}`);
      showSnackbar("Plan deleted successfully");
      fetchAllPlans();
    } catch (err) {
      showSnackbar("Failed to delete plan", "error");
    }
  };

  // open modal for create
  const handleOpenCreate = () => {
    setEditMode(false);
    setFormData({
      id: "",
      name: "",
      price: "",
      call_limit: "",
      sms_limit: "",
      unlimited_calls: false,
      unlimited_sms: false,
      description: "",
    });
    setOpenForm(true);
  };

  // open modal for edit
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
      <Typography variant="h5" fontWeight="bold" sx={{ p: 3, pb: 1,}}>
        Plans Details
      </Typography>

      {/* 🔍 Search + Actions */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          display: "flex",
          gap: 2,
          alignItems: "center",
          background: "#f0f7ff",
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Search by Plan ID"
          value={planId}
          onChange={(e) => setPlansId(e.target.value)}
          size="small"
          sx={{ flex: "1 1 200px", minWidth: 220 }}
        />
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={fetchPlanById}
        >
          Search
        </Button>
        <Button variant="contained" onClick={fetchAllPlans}>
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

      {/* 🧾 Plan Cards */}
      {loading ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : plans.length > 0 ? (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="stretch"
          mr={1}
        >
          {plans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={plan.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: "0 6px 30px rgba(0,0,0,0.2)",
                    transform: "translateY(-4px)",
                  },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textAlign: "center",
                  height: 350,
                  width: 300,
                  margin: "auto",
                  color: "#fff",
                  background: "rgba(135, 206, 235, 0.08)",
                  boxShadow: "1px, 10px, 20px",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    {/* Edit + 🗑️ Delete beside ID */}
                    <Box
                      sx={{
                        width: "100%",
                        // background:
                        // "linear-gradient(135deg, #42a5f5 0%, #478ed1 100%)",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        py: 1.5,
                        borderRadius: "10px 10px 0 0",
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        {plan.name}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 1, color: "#ccc" }} />

                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="body2" sx={{ textAlign: "left" }}>
                      <b>Id:</b> {plan.id || "0"}
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: "left" }}>
                      <b>Price:</b> ₹{plan.price || "0"}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <b>Call Limit:</b> {plan.call_limit || "Not set"}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <b>SMS Limit:</b> {plan.sms_limit || "Not set"}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <b>Unlimited Calls:</b>{" "}
                      {plan.unlimited_calls ? "✅ Yes" : "❌ No"}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <b>Unlimited SMS:</b>{" "}
                      {plan.unlimited_sms ? "✅ Yes" : "❌ No"}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <b>plan description:</b>{" "}
                      {plan.description || "No description"}
                    </Typography>
                  </Box>

                  <Divider sx={{ mb: 1, color: "#ccc", p: 2 }} />

                  <Tooltip
                    title="Edit Plan"
                    sx={{ background: "#bee0ec", mr: 1 }}
                  >
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => handleOpenEdit(plan)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Plan" sx={{ background: "#ecd0beff" }}>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => DeletePlan(plan.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
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
              label="Price"
              type="number"
              name="price"
              size="small"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />

            <TextField
              label="Call Limit"
              name="call_limit"
              size="small"
              value={formData.call_limit}
              onChange={(e) =>
                setFormData({ ...formData, call_limit: e.target.value })
              }
            />

            <TextField
              label="SMS Limit"
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
                  checked={formData.unlimited_sms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      unlimited_sms: e.target.checked,
                    })
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

export default PlanDetails;
