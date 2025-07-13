import React from "react";
import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import { FaLowVision } from "react-icons/fa";
import { GrOptimize } from "react-icons/gr";
import { useTranslation } from "react-i18next";

const VisionMissionSection = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box className="main-sectionGap">
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          color="primary"
          mb={4}
          sx={{ textTransform: "uppercase" }}
        >
          {t("vision_mission_title")}
        </Typography>

        <Grid container spacing={4} alignItems="center">
          {/* Vision */}
          <Grid item xs={12} md={6}>
            <Box className="missionCard">
              <Box className="visionIcon displayCenter" mb={3}>
                <FaLowVision />
              </Box>
              <Typography
                variant="h3"
                sx={{ textTransform: "uppercase", mb: 2 }}
              >
                {t("our_vision")}
              </Typography>
              <Typography variant="h6" color="secondary" lineHeight="30px">
                {t("vision_text")}
              </Typography>
            </Box>
          </Grid>

          {/* Mission */}
          <Grid item xs={12} md={6}>
            <Box className="missionCard">
              <Box className="visionIcon displayCenter" mb={3}>
                <GrOptimize />
              </Box>
              <Typography
                variant="h3"
                sx={{ textTransform: "uppercase", mb: 2 }}
              >
                {t("our_mission")}
              </Typography>
              <Typography variant="h6" lineHeight="30px">
                {t("mission_text")}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default VisionMissionSection;
