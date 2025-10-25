import React, { useState } from "react";
import {
  Button,
  Typography,
  Stack,
  Paper,
  Divider,
  Box,
} from "@mui/material";

function Pdfdata() {
  const [formData, setFormData] = useState({
    gstDoc: null,
    companyPanDoc: null,
    directorPan: null,
    directorAadhaar: null,
  });

  const [previewUrls, setPreviewUrls] = useState([]);

  // ✅ handle PDF file selection
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [field]: file }));

      // for preview
      const url = URL.createObjectURL(file);
      setPreviewUrls((prev) => [...prev, { name: file.name, url }]);
    }
  };

  // ✅ handle form submit (to send FormData to backend)
  const handleSubmit = async () => {
    const data = new FormData();
    const files = [
      formData.gstDoc,
      formData.companyPanDoc,
      formData.directorPan,
      formData.directorAadhaar,
    ];
    files.forEach((file) => {
      if (file) data.append("documents", file);
    });

    try {
      const res = await fetch(
        "https://superfone-admin-xw3b.onrender.com/api/admin/kyc/submit",
        {
          method: "POST",
          body: data,
        }
      );

      if (res.ok) {
        alert("KYC PDFs uploaded successfully!");
      } else {
        const errData = await res.json();
        console.error("Upload error:", errData);
        alert("Failed to upload KYC PDFs");
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading files");
    }
  };

  return (
    <Stack spacing={3} sx={{ p: 3 }}>
      <Paper sx={{ p: 3, borderRadius: 2 }} elevation={4}>
        <Stack spacing={2}>
          {/* GST Document */}
          <Box>
            <Typography>GST Document (PDF)</Typography>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileChange(e, "gstDoc")}
            />
          </Box>

          {/* Company PAN */}
          <Box>
            <Typography>Company PAN (PDF)</Typography>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileChange(e, "companyPanDoc")}
            />
          </Box>

          {/* Director PAN */}
          <Box>
            <Typography>Director PAN (PDF)</Typography>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileChange(e, "directorPan")}
            />
          </Box>

          {/* Director Aadhaar */}
          <Box>
            <Typography>Director Aadhaar (PDF)</Typography>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileChange(e, "directorAadhaar")}
            />
          </Box>

          <Divider />

          {/* Upload Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ alignSelf: "center", mt: 2 }}
          >
            Submit KYC PDFs
          </Button>
        </Stack>
      </Paper>

      {/* ✅ Preview / View PDFs Section */}
      {previewUrls.length > 0 && (
        <Paper sx={{ p: 3, borderRadius: 2 }} elevation={3}>
          <Typography variant="h6" gutterBottom>
            Uploaded PDF Files:
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {previewUrls.map((file, index) => (
              <Button
                key={index}
                variant="outlined"
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View {file.name}
              </Button>
            ))}
          </Stack>
        </Paper>
      )}
    </Stack>
  );
}

export default Pdfdata;
