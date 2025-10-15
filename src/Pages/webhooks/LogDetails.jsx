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
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const BASE_URL = "https://digidialersuperadmin.onrender.com";

const LogDetails = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [logId, setLogId] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [selectedLog, setSelectedLog] = useState(null); // For payload dialog

  // Show snackbar
  const showSnackbar = (message, severity = "success") =>
    setSnackbar({ open: true, message, severity });

  // Fetch all logs
  const fetchAllLogs = async () => {
  setLoading(true);
  try {
    const res = await axios.get(`${BASE_URL}/api/superadmin/webhooklogs/all`);
    const logsData = res.data.logs || []; // ✅ always get array
    setLogs(logsData);
    showSnackbar("All logs loaded", "success");
  } catch (err) {
    console.error(err);
    setLogs([]);
    showSnackbar("Failed to fetch logs", "error");
  } finally {
    setLoading(false);
  }
};


// Fetch log by ID
const fetchLogById = async () => {
  if (!logId.trim()) return showSnackbar("Enter Log ID", "warning");
  setLoading(true);
  try {
    const res = await axios.get(`${BASE_URL}/api/superadmin/webhooklogs/${logId.trim()}`);
    const logData = res.data.webhook_log;
      console.log("API Response:", res.data);
    if (logData && logData.id) {
      setLogs([logData]); // wrap in array for table
      showSnackbar("Log details loaded", "success");
    } else {
      setLogs([]);
      showSnackbar("Log not found", "error");
    }
  } catch (err) {
    console.error(err);
    setLogs([]);
    showSnackbar("Log not found", "error");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchAllLogs();
  }, []);

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto" }}>
      <Typography variant="h4" mb={2} fontWeight="bold" sx={{ pt: 3 }}>
        WebHook Logs
      </Typography>

      {/* Search */}
      <Paper
        sx={{ p: 2, mb: 3, display: "flex", gap: 2, alignItems: "center" }}
      >
        <TextField
          label="Search by Log ID"
          value={logId}
          onChange={(e) => setLogId(e.target.value)}
          size="small"
          sx={{ width: "300px" }}
        />
        <Button
          sx={{ width: "300px" }}
          variant="contained"
          color="primary"
          onClick={fetchLogById}
        >
          Search
        </Button>
        <Button
          sx={{ width: "300px" }}
          variant="contained"
          color="primary"
          onClick={fetchAllLogs}
        >
          Show All Logs
        </Button>
      </Paper>

      {/* Logs Table */}
      <Paper sx={{ p: 2 }}>
        {loading ? (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <CircularProgress />
            <Typography sx={{ mt: 1 }}>Loading logs...</Typography>
          </Box>
        ) : logs.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
                <TableRow>
                  <TableCell>
                    <strong>ID</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Team ID</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Event Type</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Payload</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              {/* <TableBody>
                 {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.id}</TableCell>
                    <TableCell>{log.team_id || "N/A"}</TableCell>
                    <TableCell>{log.event_type || "N/A"}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => setSelectedLog(log.payload)}
                      >
                        <InfoIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))} 
              </TableBody> */}
              <TableBody>
  {logs.map((log) => (
    <TableRow key={log.id}>
      <TableCell>{log.id}</TableCell>
      <TableCell>{log.team_id || "N/A"}</TableCell>
      <TableCell>{log.event_type || "N/A"}</TableCell>
      <TableCell>
        <IconButton color="primary" onClick={() => setSelectedLog(log.payload)}>
          <InfoIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
</TableBody>


            </Table>
          </TableContainer>
        ) : (
          <Typography sx={{ textAlign: "center", py: 4 }}>
            No logs found
          </Typography>
        )}
      </Paper>

      {/* Payload Dialog */}
      <Dialog
        open={!!selectedLog}
        onClose={() => setSelectedLog(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Log Payload</DialogTitle>
        <DialogContent dividers>
          <Box
            component="pre"
            sx={{
              whiteSpace: "pre-wrap",
              backgroundColor: "#f9f9f9",
              p: 2,
              borderRadius: 2,
            }}
          >
            {JSON.stringify(selectedLog, null, 2)}
          </Box>
        </DialogContent>
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

export default LogDetails;
