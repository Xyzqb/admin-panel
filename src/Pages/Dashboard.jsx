// import React from "react";
// import { Box, Typography, Grid, Paper, Button } from "@mui/material";
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
// import Business from '@mui/icons-material/Business';
// import Person from '@mui/icons-material/Person';
// import Group from '@mui/icons-material/Group';
// import Groups from '@mui/icons-material/Groups';

// // Mock data
// const callVolumeData = [
//   { time: "9 AM", calls: 120 },
//   { time: "10 AM", calls: 200 },
//   { time: "11 AM", calls: 150 },
//   { time: "12 PM", calls: 300 },
//   { time: "1 PM", calls: 250 },
//   { time: "2 PM", calls: 350 },
// ];

// const agentActivityData = [
//   { name: "Ramsey", activity: 20 },
//   { name: "Kapoor", activity: 25 },
//   { name: "Nelson", activity: 18 },
//   { name: "Hollie", activity: 22 },
//   { name: "James", activity: 28 },
// ];

// const kycStatusData = [
//   { status: "Verified", count: 80 },
//   { status: "Pending", count: 15 },
//   { status: "Rejected", count: 5 },
// ];

// const Dashboard = () => {

//   return (
//     <Box
//       sx={{
//         p: 4,
//         background: "#334155",
//         Height: "100vh",
//         // height:"95%",
//         color: "#fff",
//         mt:0,
//         ml:1,
//         pt:"50px",
//       }}
//     >
//       {/* Header */}
//       <Typography variant="h4" sx={{ mb: 2 }}>
//        Super Admin Dashboard Overview
//       </Typography>

//       {/* Summary Cards */}
//       <Grid container spacing={2} sx={{ mb:2, }}>
//         {[
//           { title: "Companies", value: "25", icon:<Business fontSize="large"/>},
//           { title: "Admins", value: "40", icon:<Person fontSize="large"/>},
//           { title: "Agents", value: "20", icon:<Groups fontSize="large"/>},
//           { title: "Teams", value: "120", icon:<Group fontSize="large"/>},
//         ].map((card, index) => (
//           <Grid item xs={12} sm={4} md={3} key={index}>
//             <Paper
//               sx={{
//                 p: 2,
//                 borderRadius: 2,
//                 background: "#fff",
//                 color: "#000",
//                 textAlign: "center",
//                 width:"150px"
//               }}
//             >
//               <Typography variant="subtitle2">{card.title}</Typography>
//               <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//                 {card.value}
//               </Typography>
//               <Typography variant="caption">{card.subtitle}</Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Main Charts */}
//       <Grid container spacing={2} sx={{ mb:2 }}>
//         {/* Call Volume Line Chart */}
//         <Grid item xs={12} md={8}>
//           <Paper
//             sx={{
//               p: 2,
//               borderRadius: 2,
//               background: "#fff",
//               color: "#000",
//               height: { xs: 300, sm: 300 },
//               width: {xs:300, sm: 400},
//             }}
//           >
//             <Typography variant="subtitle2" sx={{ mb: 2 }}>
//               Company Growth
//             </Typography>
//             <ResponsiveContainer width="100%" height="90%">
//               <LineChart data={callVolumeData}>
//                 <XAxis dataKey="time" stroke="#000" />
//                 <YAxis stroke="#000" />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="calls"
//                   stroke="#1976d2"
//                   strokeWidth={3}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </Paper>
//         </Grid>

//         {/* Agent Activity Bar Chart */}
//         <Grid item xs={12} md={4}>
//           <Paper
//             sx={{
//               p: 2,
//               borderRadius: 2,
//               background: "#fff",
//               color: "#000",
//               height: { xs: 300, sm: 300 },
//               width: {xs:300, sm: 400},
//             }}
//           >
//             <Typography variant="subtitle2" sx={{ mb: 2 }}>
//               KYC Status
//             </Typography>
//             <ResponsiveContainer width="100%" height="90%">
//               <BarChart data={kycStatusData}>
//                 <XAxis dataKey="name" stroke="#000" />
//                 <YAxis stroke="#000" />
//                 <Tooltip />
//                 <Bar dataKey="activity" fill="#1976d2" />
//               </BarChart>
//             </ResponsiveContainer>
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* Footer */}
//             <Typography
//               variant="caption"
//               sx={{
//                 display: "block",
//                 textAlign: "center",
//                 color: "#888",
//                 // height: { xs: 120, sm: 150, md: 180, lg: 500 },
//               }}
//             >
//               Powered by{" "}
//               <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
//                 Bitmax
//               </Box>
//             </Typography>
//     </Box>

//   );
// };

// export default Dashboard;



import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import Business from "@mui/icons-material/Business";
import Person from "@mui/icons-material/Person";
import Group from "@mui/icons-material/Group";
import Groups from "@mui/icons-material/Groups";

// Mock data
const companyGrowthData = [
  { month: "Jan", companies: 20 },
  { month: "Feb", companies: 25 },
  { month: "Mar", companies: 30 },
  { month: "Apr", companies: 40 },
  { month: "May", companies: 45 },
];

const kycStatusData = [
  { status: "Verified", count: 80 },
  { status: "Pending", count: 15 },
  { status: "Rejected", count: 5 },
];

const Dashboard = () => {
  return (
    <Box
      sx={{ p: 4, background: "#334155", color: "#fff", minHeight: "100vh" }}
    >
      {/* Header */}
      <Typography variant="h4" sx={{ mb: 3, pt: 1, fontWeight:"bold"}}>
        Super Admin Dashboard Overview
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          {
            title: "Companies",
            value: "25",
            icon: <Business fontSize="large" />,
          },
          { title: "Admins", value: "40", icon: <Person fontSize="large" /> },
          { title: "Agents", value: "20", icon: <Groups fontSize="large" /> },
          { title: "Teams", value: "120", icon: <Group fontSize="large" /> },
        ].map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 2,
                background: "#fff",
                color: "#000",
                textAlign: "left",
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
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={companyGrowthData}>
                <XAxis dataKey="month" stroke="#000" />
                <YAxis stroke="#000" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="companies"
                  stroke="#1976d2"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
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
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={kycStatusData}>
                <XAxis dataKey="status" stroke="#000" />
                <YAxis stroke="#000" />
                <Tooltip />
                <Bar dataKey="count" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Footer */}
      <Typography
        variant="caption"
        sx={{ display: "block", textAlign: "center", color: "#888", mt: 4 }}
      >
        Powered by{" "}
        <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
          Bitmax
        </Box>
      </Typography>
    </Box>
  );
};

export default Dashboard;
