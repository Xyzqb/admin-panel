// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Box,
//   Paper,
//   Typography,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   CircularProgress,
//   TextField,
//   Button,
//   Snackbar,
//   Alert,
//   IconButton,
//   Tooltip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   FormControlLabel,
//   Checkbox,
//   Stack,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import SearchIcon from "@mui/icons-material/Search";
// import { Description } from "@mui/icons-material";

// const BASE_URL = "https://digidialersuperadmin.onrender.com";

// const PlanDetails = () => {
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [planId, setPlansId] = useState("");
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   // Model states
//   const [openForm, setOpenForm] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     id: "",
//     name: "",
//     call_limit: "",
//     sms_limit: "",
//     unlimited_calls: false,
//     unlimited_sms: false,
//     Description: "",
//   });

//   const showSnackbar = (message, severity = "success") =>
//     setSnackbar({ open: true, message, severity });

//   // Fetch all plans
//   const fetchAllPlans = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/api/superadmin/plan/all`);
//       setPlans(res.data.allPlan || []);
//     } catch (error) {
//       showSnackbar("failed to load plans", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Fetch plan by ID
//   const fetchPlanById = async () => {
//     if (!planId.trim()) return showSnackbar("Enter plan ID", "warning");
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/api/superadmin/plan/${planId}`);
//       // const planData = res.data.plan || res.data;
//       const planData = res.data.planById;
//       if (planData && planData.id) {
//         setPlans([planData]);
//         showSnackbar("plan fetch successfully");
//       } else {
//         showSnackbar("Plan not found", "error");
//       }
//     } catch (err) {
//       console.error(err);
//       showSnackbar("Plan not found", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   //  Create or update plan
//   const handleSave = async () => {
//     try {
//       if (editMode) {
//         await axios.patch(
//           `${BASE_URL}/api/superadmin/plan/${formData.id}`,
//           formData
//         );
//         showSnackbar("Plan updated successfully");
//       } else {
//         await axios.post(`${BASE_URL}/api/superadmin/plan/create`, formData);
//         showSnackbar("Plan created successfully");
//       }
//       setOpenForm(false);
//       fetchAllPlans();
//     } catch (err) {
//       showSnackbar("Failed to save plan", "error");
//     }
//   };

//   // Delete plan
//   const DeletePlan = async (id) => {
//     try {
//       await axios.delete(`${BASE_URL}/api/superadmin/plan/${id}`);
//       showSnackbar("Plan deleted successfully");
//       fetchAllPlans();
//     } catch (err) {
//       showSnackbar("Failed to delete plan", "error");
//     }
//   };

//   // Open model for create
//   const handleOpenCreate = () => {
//     setEditMode(false);
//     setFormData({
//       id: "",
//       name: "",
//       price: "",
//       call_limit: "",
//       unlimited_calls: "",
//       unlimited_sms: "",
//       Description: "",
//     });
//     setOpenForm(true);
//   };

//   // ✅ Open Modal for Edit
//   const handleOpenEdit = (plan) => {
//     setEditMode(true);
//     setFormData(plan);
//     setOpenForm(true);
//   };

//   useEffect(() => {
//     fetchAllPlans();
//   }, []);

//   return (
//     <Box sx={{ p: 3, maxWidth: "1200px", mx: "auto" }}>
//       <Typography variant="h5" fontWeight="bold" sx={{ p: 2, pb:1}}>
//         Plans Details
//       </Typography>

//       <Paper
//         sx={{
//           p: 2,
//           mb: 3,
//           display: "flex",
//           gap: 2,
//           alignItems: "center",
//           background: "#f0f7ff",
//         }}
//       >
//         <TextField
//           label="search by plan ID"
//           value={planId}
//           onChange={(e) => setPlansId(e.target.value)}
//           size="small"
//           sx={{ width: 300 }}
//         />

//         <Button
//           variant="contained"
//           startIcon={<SearchIcon />}
//           onClick={fetchPlanById}
//           sx={{ width: "180px" }}
//         >
//           Search
//         </Button>
//         <Button
//           variant="contained"
//           onClick={fetchAllPlans}
//           sx={{ width: "180px" }}
//         >
//           Show All
//         </Button>
//         <Button
//           variant="contained"
//           color="success"
//           startIcon={<AddIcon />}
//           onClick={handleOpenCreate}
//         >
//           Add New Plan
//         </Button>
//       </Paper>

//       {/* 📋 Plans Table */}
//       <Paper sx={{ p: 2 }}>
//         {loading ? (
//           <Box sx={{ textAlign: "center", py: 4 }}>{<CircularProgress />}</Box>
//         ) : plans.length > 0 ? (
//           <TableContainer>
//             <Table>
//               <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
//                 <TableRow>
//                   <TableCell align="center">
//                     <strong>ID</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Name</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Price (₹)</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Call Limit</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>SMS Limit</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Unlimited Calls</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Unlimited SMS</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Description</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Actions</strong>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {plans.map((plan) => (
//                   <TableRow key={plan.id}>
//                     <TableCell align="center">{plan.id}</TableCell>
//                     <TableCell align="center">{plan.name}</TableCell>
//                     <TableCell align="center">{plan.price}</TableCell>
//                     <TableCell align="center">
//                       {plan.call_limit || "-"}
//                     </TableCell>
//                     <TableCell align="center">
//                       {plan.sms_limit || "-"}
//                     </TableCell>
//                     <TableCell align="center">
//                       {plan.unlimited_calls ? "✅" : "❌"}
//                     </TableCell>
//                     <TableCell align="center">
//                       {plan.unlimited_sms ? "✅" : "❌"}
//                     </TableCell>
//                     <TableCell align="center">{plan.description}</TableCell>

//                     <TableCell align="center">
//                       <Stack
//                       direction="row"
//                       spacing={1}
//                       justifyContent="center"
//                       alignItems="center"
//                       >
//                       <Tooltip title="Edit">
//                         <IconButton
//                           color="primary"
//                           onClick={() => handleOpenEdit(plan)}
//                         >
//                           <EditIcon fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Delete">
//                         <IconButton
//                           color="error"
//                           onClick={() => DeletePlan(plan.id)}
//                         >
//                           <DeleteIcon fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                        </Stack>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         ) : (
//           // <Typography sx={{ textAlign: "center", py: 4 }}>
//           //   No plans found.
//           // </Typography>
//           <Typography
//             sx={{
//               textAlign: "center",
//               py: 6,
//               fontSize: "1.1rem",
//               color: "gray",
//               fontStyle: "italic",
//             }}
//           >
//             No plans available.
//           </Typography>
//         )}
//       </Paper>

//       {/* 📝 Create / Edit Dialog */}
//       <Dialog
//         open={openForm}
//         onClose={() => setOpenForm(false)}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>{editMode ? "Edit Plan" : "Create Plan"}</DialogTitle>
//         <DialogContent dividers>
//           <Stack spacing={2} sx={{ mt: 1 }}>
//             <TextField
//               label="Plan Name"
//               name="name"
//               size="small"
//               value={formData.name}
//               onChange={(e) =>
//                 setFormData({ ...formData, name: e.target.value })
//               }
//               fullWidth
//             />

//             <TextField
//               label="price"
//               type="number"
//               name="price"
//               size="small"
//               value={formData.price}
//               onChange={(e) =>
//                 setFormData({ ...formData, price: e.target.value })
//               }
//             />

//             <TextField
//               label="call limit"
//               name="call_limit"
//               size="small"
//               value={formData.call_limit}
//               onChange={(e) =>
//                 setFormData({ ...formData, call_limit: e.target.value })
//               }
//             />

//             <TextField
//               label="SMS limit"
//               name="sms_limit"
//               size="small"
//               value={formData.sms_limit}
//               onChange={(e) =>
//                 setFormData({ ...formData, sms_limit: e.target.value })
//               }
//               fullWidth
//             />

//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={formData.unlimited_calls}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       unlimited_calls: e.target.checked,
//                     })
//                   }
//                 />
//               }
//               label="Unlimited Calls"
//             />
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={formData.unlimited_calls}
//                   onChange={(e) =>
//                     setFormData({ ...formData, description: e.target.value })
//                   }
//                 />
//               }
//               label="Unlimited SMS"
//             />

//             <TextField
//               label="Description"
//               name="description"
//               multiline
//               rows={3}
//               value={formData.description}
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//               fullWidth
//             />
//           </Stack>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenForm(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleSave}>
//             {editMode ? "Update" : "Create"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* ✅ Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "buttom", horizontal: "center" }}
//       >
//         <Alert
//           severity={snackbar.severity}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default PlanDetails;

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
      <Typography variant="h5" fontWeight="bold" sx={{ p: 2, pb: 1 }}>
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
          width: "880px",
        }}
      >
        <TextField
          label="Search by Plan ID"
          value={planId}
          onChange={(e) => setPlansId(e.target.value)}
          size="small"
          sx={{ width: 300 }}
        />
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={fetchPlanById}
          sx={{ minWidth: 150 }}
        >
          Search
        </Button>
        <Button
          variant="contained"
          onClick={fetchAllPlans}
          sx={{ minWidth: 170 }}
        >
          Show All
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ width: "200px" }}
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
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
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
                  height: 320,
                  width: 300,
                  margin: "auto",
                  background: "#f9fbff",
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
                    {/* <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", variant:"h6", }}
                    >
                      ID: {plan.id}
                    
                    </Typography> */}

                    {/* Edit + 🗑️ Delete beside ID */}
                    <Typography variant="h6" fontWeight="bold">
                      {plan.name}
                    </Typography>
                    {/* <Tooltip title="Edit Plan">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleOpenEdit(plan)}
                      >
                        <EditIcon sx={{ size: "small" }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Plan">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => DeletePlan(plan.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip> */}
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

                  <Tooltip title="Edit Plan">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => handleOpenEdit(plan)}
                    >
                      <EditIcon sx={{ size: "small" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Plan">
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
