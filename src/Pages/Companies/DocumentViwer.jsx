
import { Box, Typography, Stack, Button } from "@mui/material";
import React from "react";

const DocumentViewer = ({ documents }) => {
  // console.log("Documents to display:", documents);
  return (
    <Box sx={{ mt: 2,  }}>
      <Typography variant="subtitle2" sx={{ mb: 1 , fontWeight:"bold",}}>
        Pdf And Image Documents:
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        {documents?.map((url, index) => {
          const isPdf = url.toLowerCase().endsWith(".pdf");

          return (
            <Box key={index} sx={{ width: 200 }}>
              {isPdf ? (
                <Box
                  component="iframe"
                  // src={url}
                  // title={`document-${index}`}
                  title={`Adhar pdf`}
                    sx={{
                    width: "100%",
                    height: 120,
                    objectFit: "cover",
                    border: "1px solid #ccc",
                    borderRadius: 1,
                    boxShadow:"0px 2px 4px",
                  }}

                />
              ) : (
                // 🖼️ Display image directly
                <Box
                  component="img"
                  src={url}
                  alt={`document-${index}`}
                  sx={{
                    width: "100%",
                    height: 120,
                    objectFit: "cover",
                    border: "1px solid #ccc",
                    borderRadius: 1,
                  }}
                />
              )}
              <Button
                href={url}
                target="_blank"
                variant="contained"
                fullWidth
                sx={{ mt: 1 }}
              >
                View Full
              </Button>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default DocumentViewer;


