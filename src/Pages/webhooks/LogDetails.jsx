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
  Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import DownloadIcon from "@mui/icons-material/GetApp";
import SearchIcon from "@mui/icons-material/Search";

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

  // Audio state
  const [audio, setAudio] = useState(null);
  const [playingId, setPlayingId] = useState(null);

  // Show snackbar
  const showSnackbar = (message, severity = "success") =>
    setSnackbar({ open: true, message, severity });

  // Fetch all logs
  const fetchAllLogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/superadmin/webhooklogs/all`);
      const logsData = res.data.logs || [];
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
      const res = await axios.get(
        `${BASE_URL}/api/superadmin/webhooklogs/${logId.trim()}`
      );
      const logData = res.data.webhook_log || res.data;
      console.log("API Response:", res.data);
      if (logData && logData.id) {
        setLogs([logData]);
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

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        try {
          audio.src = "";
        } catch (e) {}
      }
    };
  }, [audio]);

  // Play recording: recordingUrl should be a direct audio URL (mp3/wav)
  const handlePlay = (recordingUrl, id) => {
    if (!recordingUrl) {
      showSnackbar("No recording URL available", "warning");
      return;
    }

    // Stop existing audio if any
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    // If the recordingUrl needs to be proxied for auth/CORS, use your backend:
    // e.g. const proxiedUrl = `${BASE_URL}/api/proxyRecording?recordingUrl=${encodeURIComponent(recordingUrl)}`;
    // Use proxiedUrl instead of recordingUrl below.

    // Some APIs require adding a format extension like .mp3 - only do this if you know it works:
    let src = recordingUrl;
    // if (!src.endsWith(".mp3") && !src.endsWith(".wav")) { src = src + ".mp3"; } // optional

    const newAudio = new Audio(src);
    // optionally: newAudio.crossOrigin = "anonymous";
    setAudio(newAudio);
    setPlayingId(id);

    newAudio.play().catch((err) => {
      console.error("Audio play failed:", err);
      showSnackbar("Unable to play recording. Check CORS/auth.", "error");
      setPlayingId(null);
      setAudio(null);
    });

    newAudio.onended = () => {
      setPlayingId(null);
      setAudio(null);
    };

    newAudio.onerror = (e) => {
      console.error("Audio error", e);
      showSnackbar("Error loading audio", "error");
      setPlayingId(null);
      setAudio(null);
    };
  };

  const handleStop = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setPlayingId(null);
    setAudio(null);
  };

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto" }}>
      <Typography variant="h5" mb={1} fontWeight="bold" sx={{ pt: 3 }}>
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
          <SearchIcon />
          Search
        </Button>
        <Button
          sx={{ width: "300px" }}
          variant="contained"
          color="primary"
          onClick={fetchAllLogs}
        >
          <SearchIcon />
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
                  <TableCell align="center">
                    <strong>Call Recording</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((log) => {
                  // recording URL may be at log.payload.RecordingUrl
                  const recordingUrl =
                    log?.payload?.RecordingUrl ||
                    log?.payload?.recording_url ||
                    null;
                  return (
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

                      <TableCell align="center">
                        {recordingUrl ? (
                          <>
                            {playingId === log.id ? (
                              <Tooltip title="Stop">
                                <IconButton color="error" onClick={handleStop}>
                                  <StopIcon />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <Tooltip title="Play">
                                <IconButton
                                  color="primary"
                                  onClick={() =>
                                    handlePlay(recordingUrl, log.id)
                                  }
                                >
                                  <PlayArrowIcon />
                                </IconButton>
                              </Tooltip>
                            )}

                            {/* Download link - opens in new tab */}
                            <Tooltip title="Download">
                              <IconButton
                                component="a"
                                href={recordingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                sx={{ ml: 1 }}
                              >
                                <DownloadIcon />
                              </IconButton>
                            </Tooltip>
                          </>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            No Recording
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
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

