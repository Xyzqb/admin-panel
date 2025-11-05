import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  CircularProgress,
  Snackbar,
  Alert,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ProfilePic from "./Profile";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded";

const BASE_URL = "https://digidialersuperadmin.onrender.com";

const AgentsDetails = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [searchAdminId, setSearchAdminId] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentAgent, setCurrentAgent] = useState(null);

  const [openImage, setOpenImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const showSnackbar = (message, severity) =>
    setSnackbar({ open: true, message, severity });

  // Fetch all agents
  const fetchAgents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/superadmin/agent/getagent`);
      const rawAgents = res.data.agents || [];

      const result = rawAgents.map((agent) => ({
        _id: agent._id || agent.id,
        name: agent.name,
        email: agent.email,
        mobile: agent.mobile,
        profilePic: agent.profile_pic,
        createdAt: agent.createdAt || agent.created_at,
      }));

      setAgents(result);
      showSnackbar("Agents loaded successfully!", "success");
    } catch (err) {
      showSnackbar("Failed to load agents", "error");
    } finally {
      setLoading(false);
    }
  };

  // Search by Agent ID
  const searchAgentById = async () => {
    if (!searchId.trim()) return showSnackbar("Enter agent ID", "warning");
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/superadmin/agent/${searchId.trim()}`
      );
      const rawAgent = res.data.agent || res.data;
      const result = rawAgent
        ? [
            {
              _id: rawAgent._id || rawAgent.id,
              name: rawAgent.name,
              email: rawAgent.email,
              mobile: rawAgent.mobile,
              profilePic: rawAgent.profile_Pic,
              createdAt: rawAgent.createdAt || rawAgent.created_at,
            },
          ]
        : [];
      setAgents(result);
      showSnackbar(
        result.length ? "Agent found!" : "Agent not found",
        result.length ? "success" : "error"
      );
    } catch {
      setAgents([]);
      showSnackbar("Agent not found", "error");
    } finally {
      setLoading(false);
    }
  };

  // Search agents under Admin
  const searchAgentsByAdmin = async () => {
    if (!searchAdminId.trim()) return showSnackbar("Enter admin ID", "warning");
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/superadmin/agent/admin/${searchAdminId.trim()}`
      );
      const rawAgents = res.data?.agents || [];
      const result = rawAgents.map((agent) => ({
        _id: agent._id || agent.id,
        name: agent.name,
        email: agent.email,
        mobile: agent.mobile,
        profilePic: agent.profile_pic,
        createdAt: agent.createdAt || agent.created_at,
      }));
      setAgents(result);
      showSnackbar(
        result.length ? "Agents under admin loaded!" : "No agents found",
        result.length ? "success" : "error"
      );
    } catch {
      setAgents([]);
      showSnackbar("Failed to fetch agents", "error");
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchId("");
    setSearchAdminId("");
    fetchAgents();
    showSnackbar("Showing all agents", "info");
  };

  // Delete agent
  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this agent?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/superadmin/agent/${_id}`);
      setAgents((prev) => prev.filter((a) => a._id !== _id));
      showSnackbar("Agent deleted successfully!", "success");
    } catch {
      showSnackbar("Failed to delete agent", "error");
    }
  };

  // Edit agent
  const handleEdit = (agent) => {
    setCurrentAgent(agent);
    setEditDialogOpen(true);
  };

  const saveEdit = async () => {
    if (!currentAgent?._id) return showSnackbar("Invalid agent ID", "error");
    try {
      const payload = {
        name: currentAgent.name,
        email: currentAgent.email,
        mobile: currentAgent.mobile,
      };
      const res = await axios.patch(
        `${BASE_URL}/api/superadmin/agent/${currentAgent._id}`,
        payload
      );
      const updated = res.data.updatedAgents;
      setAgents((prev) =>
        prev.map((a) =>
          a._id === updated.id
            ? {
                ...a,
                name: updated.name,
                email: updated.email,
                mobile: updated.mobile,
              }
            : a
        )
      );
      setEditDialogOpen(false);
      showSnackbar("Agent updated successfully!", "success");
    } catch {
      showSnackbar("Failed to update agent", "error");
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <Box sx={{ p: 2, mx: "auto", mt: 3 }}>
      <Typography variant="h5" mb={1} fontWeight="bold">
        Agents Details
      </Typography>

      {/* Search Section */}
      <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f8f9fa", width: "910px" }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Search Agents
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems="flex-start"
        >
          <Box>
            <TextField
              label="Search by Agent ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              size="small"
              sx={{ width: "280px" }}
            />
            <Button
              variant="outlined"
              onClick={searchAgentById}
              sx={{
                mt: 1,
                width: "280px",
                bgcolor: "primary.main",
                color: "white",
                gap: 1,
              }}
            >
              <PersonSearchRoundedIcon />
              Search by ID
            </Button>
          </Box>
          <Box>
            <TextField
              label="Search agents under Admin"
              value={searchAdminId}
              onChange={(e) => setSearchAdminId(e.target.value)}
              size="small"
              sx={{ width: "300px" }}
            />
            <Button
              variant="outlined"
              onClick={searchAgentsByAdmin}
              sx={{
                mt: 1,
                width: "300px",
                bgcolor: "primary.main",
                color: "white",
                gap: 1,
              }}
            >
              <PersonSearchRoundedIcon />
              Search agents under Admin
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearSearch}
              sx={{
                mt: { xs: 2, md: 3 },
                width: "300px",
                height: "40px",
                gap: 1,
                mr: 6,
              }}
            >
              <PersonSearchRoundedIcon />
              Show All Agents
            </Button>
          </Box>
        </Stack>
      </Paper>

      {/* Agent Cards Section */}
      {loading ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <CircularProgress />
          <Typography sx={{ mt: 1 }}>Loading agents...</Typography>
        </Box>
      ) : agents.length > 0 ? (
        <Grid container spacing={2}>
          {agents.map((agent) => (
            <Grid item xs={3} sm={3} md={3} lg={3} key={agent._id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  width: "290px",
                  height: "300px",
                  background: "#e9f5f9",
                  p: 1,
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Avatar
                    src={ProfilePic(agent.profilePic)}
                    onClick={() => {
                      setSelectedImage(ProfilePic(agent.profilePic));
                      setOpenImage(true);
                    }}
                    onError={(e) => (e.currentTarget.src = "")}
                    sx={{
                      width: 70,
                      height: 70,
                      mx: "auto",
                      bgcolor: "primary.light",
                      mb: 1,
                      cursor: "pointer",
                      border: "2px solid #1976d2",
                      transition: "0.3s",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  >
                    {agent.name?.[0]?.toUpperCase()}
                  </Avatar>
                  <Typography variant="h6">{agent.name}</Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ wordBreak: "break-all" }}
                  >
                    ID: {agent._id}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2">{agent.email}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {agent.mobile}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {agent.createdAt
                      ? new Date(agent.createdAt).toLocaleDateString()
                      : ""}
                    <br />
                    {agent.createdAt
                      ? new Date(agent.createdAt).toLocaleTimeString()
                      : ""}
                  </Typography>
                </CardContent>

                <CardActions
                  sx={{
                    justifyContent: "center",
                    gap: 2,
                    mt: 1,
                    pb: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(agent)}
                    sx={{
                      backgroundColor: "#2596be",
                      borderRadius: 3,
                      textTransform: "none",
                      mt: -2,
                      fontWeight: 500,
                      "&:hover": { backgroundColor: "#1976d2" },
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(agent._id)}
                    sx={{
                      borderRadius: 3,
                      textTransform: "none",
                      mt: -2,
                      fontWeight: 500,
                      backgroundColor: "#cb4545ff",
                      "&:hover": { backgroundColor: "#a73232" },
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No agents found
          </Typography>
          <Button variant="outlined" onClick={fetchAgents} sx={{ mt: 1 }}>
            Refresh List
          </Button>
        </Box>
      )}

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Agent</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              value={currentAgent?.name || ""}
              onChange={(e) =>
                setCurrentAgent({ ...currentAgent, name: e.target.value })
              }
            />
            <TextField
              label="Email"
              value={currentAgent?.email || ""}
              onChange={(e) =>
                setCurrentAgent({ ...currentAgent, email: e.target.value })
              }
            />
            <TextField
              label="Mobile"
              value={currentAgent?.mobile || ""}
              onChange={(e) =>
                setCurrentAgent({ ...currentAgent, mobile: e.target.value })
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveEdit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openImage}
        onClose={() => setOpenImage(false)}
        maxWidth="md"
        PaperProps={{
          sx: { backgroundColor: "transparent", boxShadow: "none" },
        }}
      >
        <Box
          onClick={() => setOpenImage(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            backgroundColor: "rgba(0,0,0,0.8)",
            p: 2,
          }}
        >
          <img
            src={selectedImage}
            alt="Profile"
            style={{
              maxWidth: "80vw",
              maxHeight: "80vh",
              borderRadius: "10px",
              objectFit: "contain",
            }}
          />
        </Box>
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

export default AgentsDetails;
