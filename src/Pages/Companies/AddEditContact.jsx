// import React, { useState } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Stack,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Divider,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import InputAdornment from "@mui/material/InputAdornment";
// import IconButton from "@mui/material/IconButton";

// const AddEditAgent = () => {
//   const [companyName, setCompanyName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [department, setDepartment] = useState("");

//   const handleSave = () => {
//     const agentData = { companyName, email, phone, department };
//     console.log(agentData);
//     alert("Agent data saved! Check console.");
//   };

//   return (
//     <Box sx={{ p:2 ,width:"100%", background: "#334155", height:"100%"}}>
//       <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", pt: 5 }}>
//         Add/Edit Contact
//       </Typography>

//       {/* Search Field */}
//       <Box
//         sx={{
//           display: "flex",
//           mb: 3,
//         }}
//       >
//         <TextField
//           placeholder="Search Contact..."
//           size="small"
//           variant="outlined"
//           sx={{ flex: 1, maxWidth: 700, background: "#fff", borderRadius: 1 }}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton>
//                   <SearchIcon />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>

//       {/* Main Form */}
//       <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
//         {/* Left Panel */}
//         <Paper sx={{ p: 3, flex: 1 }}>
//           <Stack spacing={2}>
//             <Typography variant="subtitle2">Company Name</Typography>
//             <TextField
//               fullWidth
//               size="small"
//               value={companyName}
//               onChange={(e) => setCompanyName(e.target.value)}
//             />

//             <Typography variant="subtitle2">Email Address</Typography>
//             <TextField
//               fullWidth
//               size="small"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             <Typography variant="subtitle2">Phone Number</Typography>
//             <TextField
//               fullWidth
//               size="small"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />

//             <Button sx={{ background: "blue", color: "white" }}>
//               + Add Another Number
//             </Button>
//           </Stack>
//         </Paper>

//         {/* Right Panel */}
//         <Paper sx={{ p: 3, flex: 1 }}>
//           <Stack spacing={2}>
//             <Typography variant="subtitle2">Department</Typography>
//             <FormControl fullWidth size="small">
//               <InputLabel>Select Department</InputLabel>
//               <Select
//                 value={department}
//                 onChange={(e) => setDepartment(e.target.value)}
//               >
//                 <MenuItem value="Sales">Sales</MenuItem>
//                 <MenuItem value="Support">Support</MenuItem>
//                 <MenuItem value="Marketing">Marketing</MenuItem>
//               </Select>
//             </FormControl>

//             <Divider sx={{ my: 3, bgcolor: "black" }} />

//             <Typography variant="subtitle2">Notes</Typography>
//             <TextField fullWidth size="small" multiline rows={4} />
//           </Stack>
//         </Paper>
//       </Stack>

//       {/* Save Button */}
//       <Box textAlign="center" sx={{ mt: 3 }}>
//         <Button
//           variant="contained"
//           color="primary"
//           size="large"
//           onClick={handleSave}
//         >
//           Save Contact
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default AddEditAgent;


import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const AddEditAgent = () => {
  // Main form states
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [notes, setNotes] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Additional numbers state
  const [additionalNumbers, setAdditionalNumbers] = useState([]);

  // Notification state
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // Handle adding new number field
  const handleAddNumber = () => {
    setAdditionalNumbers([
      ...additionalNumbers,
      { id: Date.now(), name: "", address: "", phoneNumber: "" }
    ]);
  };

  // Handle removing number field
  const handleRemoveNumber = (id) => {
    setAdditionalNumbers(additionalNumbers.filter(item => item.id !== id));
  };

  // Handle additional number field changes
  const handleAdditionalNumberChange = (id, field, value) => {
    setAdditionalNumbers(additionalNumbers.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Show notification
  const showNotification = (message, severity = "success") => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  // Validate form data
  const validateForm = () => {
    if (!companyName.trim()) {
      showNotification("Company name is required", "error");
      return false;
    }
    if (!email.trim()) {
      showNotification("Email is required", "error");
      return false;
    }
    if (!phone.trim()) {
      showNotification("Phone number is required", "error");
      return false;
    }
    return true;
  };

  // Handle save - API integration
  const handleSave = async () => {
    if (!validateForm()) return;

    const agentData = {
      companyName,
      email,
      phone,
      department,
      notes,
      additionalNumbers: additionalNumbers.filter(item => 
        item.name.trim() || item.address.trim() || item.phoneNumber.trim()
      )
    };

    console.log("Saving agent data:", agentData);

    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://your-api-endpoint.com/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agentData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Save successful:", result);
        showNotification("Contact saved successfully!");
        
        // Reset form after successful save
        resetForm();
      } else {
        throw new Error('Failed to save contact');
      }
    } catch (error) {
      console.error("Error saving contact:", error);
      showNotification("Failed to save contact. Please try again.", "error");
    }
  };

  // Reset form
  const resetForm = () => {
    setCompanyName("");
    setEmail("");
    setPhone("");
    setDepartment("");
    setNotes("");
    setAdditionalNumbers([]);
  };

  // Handle search
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      // Replace with your actual search API endpoint
      const response = await fetch(`https://your-api-endpoint.com/agents/search?q=${encodeURIComponent(searchTerm)}`);
      
      if (response.ok) {
        const result = await response.json();
        console.log("Search results:", result);
        
        if (result.length > 0) {
          // If you want to implement edit functionality, you can populate the form here
          showNotification(`Found ${result.length} contact(s)`, "info");
        } else {
          showNotification("No contacts found", "info");
        }
      }
    } catch (error) {
      console.error("Error searching contacts:", error);
      showNotification("Error searching contacts", "error");
    }
  };

  return (
    <Box sx={{ p: 2, width: "100%", background: "#334155", height: "100%", minHeight: "100vh" }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", pt: 5, color: "white" }}>
        Add/Edit Contact
      </Typography>

      {/* Search Field */}
      <Box sx={{ display: "flex", mb: 3 }}>
        <TextField
          placeholder="Search Contact..."
          size="small"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          sx={{ flex: 1, maxWidth: 700, background: "#fff", borderRadius: 1 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Main Form */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        {/* Left Panel */}
        <Paper sx={{ p: 3, flex: 1 }}>
          <Stack spacing={2}>
            <Typography variant="subtitle2">Company Name *</Typography>
            <TextField
              fullWidth
              size="small"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
            />

            <Typography variant="subtitle2">Email Address *</Typography>
            <TextField
              fullWidth
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              type="email"
            />

            <Typography variant="subtitle2">Phone Number *</Typography>
            <TextField
              fullWidth
              size="small"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              type="tel"
            />

            {/* Additional Numbers Section */}
            {additionalNumbers.map((item, index) => (
              <Box key={item.id} sx={{ border: "1px solid #e0e0e0", p: 2, borderRadius: 1 }}>
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="subtitle2">Additional Number {index + 1}</Typography>
                    <IconButton 
                      size="small" 
                      onClick={() => handleRemoveNumber(item.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  
                  <TextField
                    fullWidth
                    size="small"
                    label="Name"
                    value={item.name}
                    onChange={(e) => handleAdditionalNumberChange(item.id, "name", e.target.value)}
                    placeholder="Enter name"
                  />
                  
                  <TextField
                    fullWidth
                    size="small"
                    label="Address"
                    value={item.address}
                    onChange={(e) => handleAdditionalNumberChange(item.id, "address", e.target.value)}
                    placeholder="Enter address"
                    multiline
                    rows={2}
                  />
                  
                  <TextField
                    fullWidth
                    size="small"
                    label="Phone Number"
                    value={item.phoneNumber}
                    onChange={(e) => handleAdditionalNumberChange(item.id, "phoneNumber", e.target.value)}
                    placeholder="Enter phone number"
                    type="tel"
                  />
                </Stack>
              </Box>
            ))}

            <Button 
              onClick={handleAddNumber}
              sx={{ 
                background: "blue", 
                color: "white",
                '&:hover': {
                  background: "darkblue"
                }
              }}
            >
              + Add Another Number
            </Button>
          </Stack>
        </Paper>

        {/* Right Panel */}
        <Paper sx={{ p: 3, flex: 1 }}>
          <Stack spacing={2}>
            <Typography variant="subtitle2">Department</Typography>
            <FormControl fullWidth size="small">
              <InputLabel>Select Department</InputLabel>
              <Select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                label="Select Department"
              >
                <MenuItem value="Sales">Sales</MenuItem>
                <MenuItem value="Support">Support</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
              </Select>
            </FormControl>

            <Divider sx={{ my: 3, bgcolor: "black" }} />

            <Typography variant="subtitle2">Notes</Typography>
            <TextField 
              fullWidth 
              size="small" 
              multiline 
              rows={4} 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes here..."
            />
          </Stack>
        </Paper>
      </Stack>

      {/* Save Button */}
      <Box textAlign="center" sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSave}
          sx={{
            px: 4,
            py: 1,
            fontSize: "1.1rem"
          }}
        >
          Save Contact
        </Button>
      </Box>

      {/* Success Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddEditAgent;