import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import logo from "../../assets/digidial_logo.jpg";

const KYCForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    mobile: "",
    email: "",
    website: "",
    address1: "",
    address2: "",
    gstNo: "",
    companyPan: "",
    gstDoc: null,
    companyPanDoc: null,
    directorPan: null,
    directorAadhaar: null,
  });

  const [department, setDepartment] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);

  // 🔹 Handle text input
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // 🔹 Handle file upload
  const handleFileChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });

  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    data.append("department", department);

    // 🔹 Example API call (replace with your endpoint)
    try {
      /*
      const response = await fetch("YOUR_API_URL_HERE", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      console.log("API response:", result);
      */
      console.log("✅ KYC Data Submitted:", Object.fromEntries(data));

      // Show success message
      setSuccessOpen(true);

      // Reset form
      setFormData({
        companyName: "",
        contactPerson: "",
        mobile: "",
        email: "",
        website: "",
        address1: "",
        address2: "",
        gstNo: "",
        companyPan: "",
        gstDoc: null,
        companyPanDoc: null,
        directorPan: null,
        directorAadhaar: null,
      });
      setDepartment("");
    } catch (error) {
      console.error("Error submitting KYC:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessOpen(false);
  };

  // Placeholder style
  const placeholderStyle = {
    "&::placeholder": { fontSize: "0.8rem", color: "#999" },
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        background: "#334155",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          p: { xs: 3, sm: 5 },
          maxWidth: 600,
          width: "100%",
          overflow: "visible",
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Box
            component="img"
            src={logo}
            alt="digidial"
            sx={{ height: 180, width: 380 }}
          />
        </Box>

        <form onSubmit={handleSubmit}>
          {/* Company Details */}
          <TextField
            fullWidth
            label="Company Name"
            name="companyName"
            size="small"
            placeholder="Enter Company Name"
            value={formData.companyName}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
            InputProps={{ sx: placeholderStyle }}
          />

          <TextField
            fullWidth
            label="Contact Person"
            name="contactPerson"
            placeholder="Director Name"
            size="small"
            value={formData.contactPerson}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
            InputProps={{ sx: placeholderStyle }}
          />

          <TextField
            fullWidth
            type="tel"
            label="Mobile Number"
            name="mobile"
            placeholder="Enter Mobile Number"
            size="small"
            value={formData.mobile}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
            InputProps={{ sx: placeholderStyle }}
          />

          <TextField
            fullWidth
            type="email"
            label="Email ID"
            name="email"
            size="small"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
            InputProps={{ sx: placeholderStyle }}
          />

          <TextField
            fullWidth
            label="Company Website"
            name="website"
            size="small"
            placeholder="https://example.com"
            value={formData.website}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputProps={{ sx: placeholderStyle }}
          />

          <TextField
            fullWidth
            label="Company Address"
            name="address1"
            placeholder="Street address"
            size="small"
            value={formData.address1}
            onChange={handleChange}
            multiline
            rows={2}
            required
            sx={{ mb: 2 }}
            InputProps={{ sx: placeholderStyle }}
          />

          <TextField
            fullWidth
            label="Address Line 2"
            name="address2"
            size="small"
            placeholder="Apartment, suite, etc. (optional)"
            value={formData.address2}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputProps={{ sx: placeholderStyle }}
          />

          <Divider sx={{ my: 2 }} />

          {/* Company Documents */}
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
            Company Documents
          </Typography>

          <TextField
            fullWidth
            label="Company GST No."
            name="gstNo"
            placeholder="Enter GST Number"
            size="small"
            value={formData.gstNo}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
            InputProps={{ sx: placeholderStyle }}
          />

          {/* GST Upload */}
          <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
            Upload GST Document
            <input
              type="file"
              hidden
              name="gstDoc"
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />
          </Button>
          {formData.gstDoc && (
            <Typography variant="caption" sx={{ mb: 2, display: "block" }}>
              {formData.gstDoc.name}
            </Typography>
          )}

          {/* Company PAN */}
          <TextField
            fullWidth
            label="Company PAN Number"
            name="companyPan"
            placeholder="Enter PAN Number"
            size="small"
            value={formData.companyPan}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
            InputProps={{ sx: placeholderStyle }}
          />

          {/* Company PAN Upload */}
          <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
            Upload Company PAN
            <input
              type="file"
              hidden
              name="companyPanDoc"
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />
          </Button>
          {formData.companyPanDoc && (
            <Typography variant="caption" sx={{ mb: 2, display: "block" }}>
              {formData.companyPanDoc.name}
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Director Documents */}
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
            Director Documents
          </Typography>

          <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
            Upload Director PAN
            <input
              type="file"
              hidden
              name="directorPan"
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />
          </Button>
          {formData.directorPan && (
            <Typography variant="caption" sx={{ mb: 2, display: "block" }}>
              {formData.directorPan.name}
            </Typography>
          )}

          <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
            Upload Director Aadhaar
            <input
              type="file"
              hidden
              name="directorAadhaar"
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />
          </Button>
          {formData.directorAadhaar && (
            <Typography variant="caption" sx={{ mb: 2, display: "block" }}>
              {formData.directorAadhaar.name}
            </Typography>
          )}

          {/* Department Dropdown */}
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="department-label">Department</InputLabel>
            <Select
              labelId="department-label"
              id="department-select"
              value={department}
              label="Department"
              onChange={(e) => setDepartment(e.target.value)}
              required
              MenuProps={{ disablePortal: true }}
            >
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Operations">Operations</MenuItem>
              <MenuItem value="Support">Support</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit KYC
          </Button>
        </form>
      </Paper>

      {/* ✅ Success Snackbar */}
      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          ✅ KYC submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default KYCForm;



// import React, { useState } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   Divider,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import logo from "../../assets/digidial_logo.jpg";
// import axios from "axios";

// const BASE_URL = "https://digidialersuperadmin.onrender.com";

// const KYCForm = () => {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     contactPerson: "",
//     mobile: "",
//     email: "",
//     website: "",
//     address1: "",
//     address2: "",
//     gstNo: "",
//     companyPan: "",
//     gstDoc: null,
//     companyPanDoc: null,
//     directorPan: null,
//     directorAadhaar: null,
//   });

//   const [department, setDepartment] = useState("");
//   const [successOpen, setSuccessOpen] = useState(false);

//   const [companyId, setCompanyId] = useState("");
//   const [kycDetails, setKycDetails] = useState(null);
//   const [kycStatus, setKycStatus] = useState("");

//   // 🔹 Handle text input
//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   // 🔹 Handle file upload
//   const handleFileChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.files[0] });

//   // 🔹 Submit KYC Form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = new FormData();
//       Object.keys(formData).forEach((key) => {
//         data.append(key, formData[key]);
//       });
//       data.append("department", department);

//       console.log("✅ KYC Data Submitted:", Object.fromEntries(data));
//       setSuccessOpen(true);

//       // Reset form
//       setFormData({
//         companyName: "",
//         contactPerson: "",
//         mobile: "",
//         email: "",
//         website: "",
//         address1: "",
//         address2: "",
//         gstNo: "",
//         companyPan: "",
//         gstDoc: null,
//         companyPanDoc: null,
//         directorPan: null,
//         directorAadhaar: null,
//       });
//       setDepartment("");
//     } catch (error) {
//       console.error("Error submitting KYC:", error);
//     }
//   };

//   // 🔹 Fetch KYC Details by company_id
//   const fetchKycDetails = async () => {
//     if (!companyId.trim()) return alert("Enter Company ID");
//     try {
//       const res = await axios.get(`${BASE_URL}/api/superadmin/kyc/details/${companyId}`);
//       setKycDetails(res.data);
//       console.log("KYC Details:", res.data);
//     } catch (err) {
//       console.error("Failed to fetch KYC details:", err);
//     }
//   };

//   // 🔹 Fetch KYC Status
//   const fetchKycStatus = async () => {
//     if (!companyId.trim()) return alert("Enter Company ID");
//     try {
//       const res = await axios.get(`${BASE_URL}/api/superadmin/kyc/status/${companyId}`);
//       setKycStatus(res.data.status);
//       console.log("KYC Status:", res.data.status);
//     } catch (err) {
//       console.error("Failed to fetch KYC status:", err);
//     }
//   };

//   // 🔹 Verify KYC (Approve/Reject)
//   const verifyKyc = async (action) => {
//     if (!companyId.trim()) return alert("Enter Company ID");
//     try {
//       await axios.put(`${BASE_URL}/api/superadmin/kyc/verify/${companyId}`, { action });
//       alert(`KYC ${action} successfully`);
//       fetchKycStatus();
//     } catch (err) {
//       console.error(`Failed to ${action} KYC:`, err);
//     }
//   };

//   const handleCloseSnackbar = () => setSuccessOpen(false);

//   const placeholderStyle = {
//     "&::placeholder": { fontSize: "0.8rem", color: "#999" },
//   };

//   return (
//     <Box
//       sx={{
//         p: { xs: 2, sm: 4 },
//         background: "#334155",
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Paper sx={{ p: { xs: 3, sm: 5 }, maxWidth: 700, width: "100%" }}>
//         {/* Logo */}
//         <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
//           <Box component="img" src={logo} alt="digidial" sx={{ height: 180, width: 380 }} />
//         </Box>

//         {/* 🔹 Company ID for API actions */}
//         <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
//           <TextField
//             label="Company ID"
//             value={companyId}
//             onChange={(e) => setCompanyId(e.target.value)}
//             size="small"
//             fullWidth
//           />
//           <Button variant="contained" onClick={fetchKycDetails}>Fetch Details</Button>
//           <Button variant="contained" onClick={fetchKycStatus}>Get Status</Button>
//         </Box>

//         {kycStatus && (
//           <Typography sx={{ mb: 2 }}>KYC Status: {kycStatus}</Typography>
//         )}

//         {kycDetails && (
//           <pre style={{ background: "#f0f0f0", padding: "10px", borderRadius: "6px" }}>
//             {JSON.stringify(kycDetails, null, 2)}
//           </pre>
//         )}

//         {/* Approve/Reject Buttons */}
//         <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
//           <Button variant="contained" color="success" onClick={() => verifyKyc("approved")}>
//             Approve
//           </Button>
//           <Button variant="contained" color="error" onClick={() => verifyKyc("rejected")}>
//             Reject
//           </Button>
//         </Box>

//         <Divider sx={{ my: 2 }} />

//         {/* KYC Form */}
//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="Company Name"
//             name="companyName"
//             size="small"
//             placeholder="Enter Company Name"
//             value={formData.companyName}
//             onChange={handleChange}
//             required
//             sx={{ mb: 2 }}
//             InputProps={{ sx: placeholderStyle }}
//           />

//           <TextField
//             fullWidth
//             label="Contact Person"
//             name="contactPerson"
//             placeholder="Director Name"
//             size="small"
//             value={formData.contactPerson}
//             onChange={handleChange}
//             required
//             sx={{ mb: 2 }}
//             InputProps={{ sx: placeholderStyle }}
//           />

//           <TextField
//             fullWidth
//             type="tel"
//             label="Mobile Number"
//             name="mobile"
//             placeholder="Enter Mobile Number"
//             size="small"
//             value={formData.mobile}
//             onChange={handleChange}
//             required
//             sx={{ mb: 2 }}
//             InputProps={{ sx: placeholderStyle }}
//           />

//           <TextField
//             fullWidth
//             type="email"
//             label="Email ID"
//             name="email"
//             size="small"
//             placeholder="name@example.com"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             sx={{ mb: 2 }}
//             InputProps={{ sx: placeholderStyle }}
//           />

//           {/* Department Dropdown */}
//           <FormControl fullWidth size="small" sx={{ mb: 2 }}>
//             <InputLabel id="department-label">Department</InputLabel>
//             <Select
//               labelId="department-label"
//               id="department-select"
//               value={department}
//               label="Department"
//               onChange={(e) => setDepartment(e.target.value)}
//               required
//               MenuProps={{ disablePortal: true }}
//             >
//               <MenuItem value="HR">HR</MenuItem>
//               <MenuItem value="IT">IT</MenuItem>
//               <MenuItem value="Sales">Sales</MenuItem>
//               <MenuItem value="Marketing">Marketing</MenuItem>
//               <MenuItem value="Finance">Finance</MenuItem>
//               <MenuItem value="Operations">Operations</MenuItem>
//               <MenuItem value="Support">Support</MenuItem>
//             </Select>
//           </FormControl>

//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Submit KYC
//           </Button>
//         </form>

//         {/* ✅ Success Snackbar */}
//         <Snackbar
//           open={successOpen}
//           autoHideDuration={3000}
//           onClose={handleCloseSnackbar}
//           anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//         >
//           <Alert
//             onClose={handleCloseSnackbar}
//             severity="success"
//             sx={{ width: "100%" }}
//           >
//             ✅ KYC submitted successfully!
//           </Alert>
//         </Snackbar>
//       </Paper>
//     </Box>
//   );
// };

// export default KYCForm;

