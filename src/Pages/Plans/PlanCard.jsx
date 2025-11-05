import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const PlanCard = ({ plan, handleEdit, handleDelete }) => {
  return (
    <Card
      sx={{
        background: "linear-gradient(135deg, #1e88e5, #42a5f5)",
        color: "#fff",
        borderRadius: "16px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
        },
        overflow: "hidden",
        width: "300px",
        margin: "15px",
      }}
    >
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              borderBottom: "2px solid rgba(255,255,255,0.3)",
              display: "inline-block",
              pb: 0.5,
            }}
          >
            {plan.name}
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          <strong>Price:</strong> ₹{plan.price}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          <strong>Duration:</strong> {plan.duration} days
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          <strong>Description:</strong> {plan.description}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: "center",
          mt: -1,
          mb: 1,
        }}
      >
        <Button
          startIcon={<EditIcon />}
          onClick={() => handleEdit(plan)}
          sx={{
            color: "#fff",
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: 5,
            px: 3,
            "&:hover": { backgroundColor: "rgba(255,255,255,0.4)" },
          }}
        >
          Edit
        </Button>

        <Button
          startIcon={<DeleteIcon />}
          onClick={() => handleDelete(plan._id)}
          sx={{
            color: "#fff",
            backgroundColor: "rgba(255, 0, 0, 0.4)",
            borderRadius: 5,
            px: 3,
            "&:hover": { backgroundColor: "rgba(255,0,0,0.6)" },
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlanCard;
