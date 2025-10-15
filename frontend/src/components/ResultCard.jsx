import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box, Chip } from "@mui/material";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PublicIcon from "@mui/icons-material/Public";

const ResultCard = ({ result, onLearnMore }) => {
  return (
    <Card
      sx={{
        maxWidth: 320,
        m: 1,
        borderRadius: 3,
        boxShadow: 4,
        transition: "0.3s",
        "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
        position: "relative",
      }}
    >
      {/* Predicted Aircraft Ribbon */}
      <Chip
        label={`Predicted: ${result.aircraft}`}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "linear-gradient(90deg, #2563eb, #3b82f6)",
          color: "white",
          fontWeight: "bold",
          zIndex: 2,
        }}
      />

      <CardMedia
        component="img"
        height="180"
        image={result.fileURL} // uploaded image or placeholder
        alt={result.aircraft}
      />

      <CardContent>
        {/* Aircraft Name */}
        <Box display="flex" alignItems="center" mb={1}>
          <AirplanemodeActiveIcon sx={{ color: "#2563eb", mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {result.aircraft}
          </Typography>
        </Box>

        {/* Country */}
        <Box display="flex" alignItems="center" mb={1}>
          <PublicIcon sx={{ color: "#3b82f6", mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Country: {result.country}
          </Typography>
        </Box>

        {/* Missile */}
        <Box display="flex" alignItems="center" mb={1}>
          <RocketLaunchIcon sx={{ color: "#60a5fa", mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Missile: {result.missile}
          </Typography>
        </Box>

        {/* Confidence */}
        <Typography variant="body2" sx={{ fontWeight: "bold", mt: 1 }}>
          Confidence: {result.confidence}%
        </Typography>

        {/* Learn More Button */}
        <Button
          variant="contained"
          size="small"
          fullWidth
          sx={{
            mt: 2,
            background: "linear-gradient(90deg, #2563eb, #3b82f6)",
            "&:hover": { background: "linear-gradient(90deg, #3b82f6, #2563eb)" },
          }}
          onClick={() => onLearnMore(result)}
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
