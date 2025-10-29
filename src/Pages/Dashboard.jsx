import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
} from "recharts";
import Business from "@mui/icons-material/Business";
import Person from "@mui/icons-material/Person";
import Group from "@mui/icons-material/Group";
import Groups from "@mui/icons-material/Groups";
import axios from "axios";

const BASE_URL = "https://digidialersuperadmin.onrender.com";

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAnalytics = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/api/superadmin/analytic`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("📊 Analytics API Response:", res.data);

      // Extract and map data
      const data = res.data.data;

      setAnalytics({
        totalCompanies: Number(data.company || 0),
        totalAdmins: Number(data.admins || 0),
        totalAgents: Number(data.agents || 0),
        totalTeams: Number(data.teams || 0),
        companyGrowth: (data.companyGrowth || []).map((g) => ({
          month: g.month,
          count: Number(g.count),
        })),
        kycStatus: (data.kycStatus || []).map((k) => ({
          status: k.status,
          count: Number(k.count),
        })),
      });
    } catch (err) {
      console.error("Analytics fetch error:", err);
      setError("Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          p: 4,
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#334155",
          color: "#fff",
        }}
      >
        <CircularProgress color="inherit" />
        <Typography sx={{ ml: 2 }}>Loading dashboard...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, background: "#334155", minHeight: "100vh" }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!analytics) return null;

  const {
    totalCompanies,
    totalAdmins,
    totalAgents,
    totalTeams,
    companyGrowth,
    kycStatus,
  } = analytics;

  // Prepare KYC data with all statuses
  const kycData = ["approved", "pending", "rejected"].map((status) => {
    const found = kycStatus.find((k) => k.status.toLowerCase() === status);
    return {
      status: status.charAt(0).toUpperCase() + status.slice(1), // Capitalize
      count: found ? found.count : 0,
      color:
        status === "approved"
          ? "#4caf50"
          : status === "rejected"
          ? "#f44336"
          : "#ff9800", // pending
    };
  });

  return (
    <Box
      sx={{ p: 4, background: "#334155", color: "#fff", minHeight: "100vh" }}
    >
      {/* Header */}
      <Typography variant="h4" sx={{ mb: 3, pt: 1, fontWeight: "bold" }}>
        Super Admin Dashboard Overview
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3, ml:1}}>
        {[
          {
            title: "Companies",
            value: totalCompanies,
            icon: <Business fontSize="large" />,
          },
          {
            title: "Admins",
            value: totalAdmins,
            icon: <Person fontSize="large" />,
          },
          {
            title: "Agents",
            value: totalAgents,
            icon: <Groups fontSize="large" />,
          },
          {
            title: "Teams",
            value: totalTeams,
            icon: <Group fontSize="large" />,
          },
        ].map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 2,
                background: "#fff",
                color: "#000",
                // textAlign: "left",
                width: "175px",
                justifyItems: "center",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}
              >
                {card.icon}
                <Typography variant="subtitle2">{card.title}</Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={2}>
        {/* Company Growth Line Chart */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 2,
              background: "#fff",
              color: "#000",
              height: 300,
              width: "400px",
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Company Growth
            </Typography>
            {companyGrowth.length === 0 ? (
              <Typography align="center">No growth data available</Typography>
            ) : (
              <ResponsiveContainer width="100%" height="85%">
                <LineChart data={companyGrowth}>
                  <XAxis dataKey="month" stroke="#000" />
                  <YAxis stroke="#000" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#1976d2"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>

        {/* KYC Status Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 2,
              background: "#fff",
              color: "#000",
              height: 300,
              width: "400px",
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              KYC Status
            </Typography>
            {kycData.length === 0 ? (
              <Typography align="center">No KYC data available</Typography>
            ) : (
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={kycData}>
                  <XAxis dataKey="status" stroke="#000" />
                  <YAxis stroke="#000" allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" barSize={60}>
                    {kycData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>

      </Grid>

      {/* Footer */}
      <Typography
        variant="caption"
        sx={{ display: "block", textAlign: "center", color: "#ccc", mt: 4 }}
      >
        Powered by{" "}
        <Box component="span" sx={{ color: "skyblue", fontWeight: "bold" }}>
          Bitmax
        </Box>
      </Typography>
    </Box>
  );
};

export default Dashboard;



// import React from "react";
// import { Box, Typography, Grid, Paper } from "@mui/material";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
// } from "recharts";
// import Business from "@mui/icons-material/Business";
// import Person from "@mui/icons-material/Person";
// import Group from "@mui/icons-material/Group";
// import Groups from "@mui/icons-material/Groups";

// // Mock data
// const companyGrowthData = [
//   { month: "Jan", companies: 20 },
//   { month: "Feb", companies: 25 },
//   { month: "Mar", companies: 30 },
//   { month: "Apr", companies: 40 },
//   { month: "May", companies: 45 },
// ];

// const kycStatusData = [
//   { status: "Verified", count: 80 },
//   { status: "Pending", count: 15 },
//   { status: "Rejected", count: 5 },
// ];

// const Dashboard = () => {
//   return (
//     <Box
//       sx={{ p: 4, background: "#334155", color: "#fff", minHeight: "100vh" }}
//     >
//       {/* Header */}
//       <Typography variant="h4" sx={{ mb: 3, pt: 1, fontWeight:"bold"}}>
//         Super Admin Dashboard Overview
//       </Typography>

//       {/* Summary Cards */}
//       <Grid container spacing={2} sx={{ mb: 3 }}>
//         {[
//           {
//             title: "Companies",
//             value: "25",
//             icon: <Business fontSize="large" />,
//           },
//           { title: "Admins", value: "40", icon: <Person fontSize="large" /> },
//           { title: "Agents", value: "20", icon: <Groups fontSize="large" /> },
//           { title: "Teams", value: "120", icon: <Group fontSize="large" /> },
//         ].map((card, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <Paper
//               sx={{
//                 p: 2,
//                 borderRadius: 2,
//                 background: "#fff",
//                 color: "#000",
//                 textAlign: "left",
//                 width: "175px",
//                 justifyItems: "center",
//               }}
//             >
//               <Box
//                 sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}
//               >
//                 {card.icon}
//                 <Typography variant="subtitle2">{card.title}</Typography>
//               </Box>
//               <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//                 {card.value}
//               </Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Charts */}
//       <Grid container spacing={2}>
//         {/* Company Growth Line Chart */}
//         <Grid item xs={12} md={6}>
//           <Paper
//             sx={{
//               p: 2,
//               borderRadius: 2,
//               background: "#fff",
//               color: "#000",
//               height: 300,
//               width: "400px",
//             }}
//           >
//             <Typography variant="subtitle2" sx={{ mb: 2 }}>
//               Company Growth
//             </Typography>
//             <ResponsiveContainer width="100%" height="85%">
//               <LineChart data={companyGrowthData}>
//                 <XAxis dataKey="month" stroke="#000" />
//                 <YAxis stroke="#000" />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="companies"
//                   stroke="#1976d2"
//                   strokeWidth={3}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </Paper>
//         </Grid>

//         {/* KYC Status Bar Chart */}
//         <Grid item xs={12} md={6}>
//           <Paper
//             sx={{
//               p: 2,
//               borderRadius: 2,
//               background: "#fff",
//               color: "#000",
//               height: 300,
//               width: "400px",
//             }}
//           >
//             <Typography variant="subtitle2" sx={{ mb: 2 }}>
//               KYC Status
//             </Typography>
//             <ResponsiveContainer width="100%" height="85%">
//               <BarChart data={kycStatusData}>
//                 <XAxis dataKey="status" stroke="#000" />
//                 <YAxis stroke="#000" />
//                 <Tooltip />
//                 <Bar dataKey="count" fill="#1976d2" />
//               </BarChart>
//             </ResponsiveContainer>
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* Footer */}
//       <Typography
//         variant="caption"
//         sx={{ display: "block", textAlign: "center", color: "#888", mt: 4 }}
//       >
//         Powered by{" "}
//         <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
//           Bitmax
//         </Box>
//       </Typography>
//     </Box>
//   );
// };

// export default Dashboard;
