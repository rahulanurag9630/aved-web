import React, { useState } from "react";
import { Box, Button, Typography, Stack, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function FloorPlanTabs({ data }) {
  const [activeTab, setActiveTab] = useState(0);
  const { t } = useTranslation()
  const floorPlans = data?.floor_plan || [];

  return (
    <Box mt={6}>
      <Typography variant="h3" mb={3}>
        {t("floorPlan")}
      </Typography>

      {/* Tab Buttons */}
      <Stack direction="row" spacing={2} mb={3} flexWrap="wrap">
        {floorPlans.map((plan, index) => (
          <Button
            key={index}
            variant={activeTab === index ? "contained" : "outlined"}
            onClick={() => setActiveTab(index)}
            sx={{
              borderRadius: "2px",
              textTransform: "none",
              fontWeight: "bold",
              px: 3,
              backgroundColor: activeTab === index ? "#5c4d44" : "#fff",
              color: activeTab === index ? "#fff" : "#1A1F36",
              borderColor: "#C0C0C0",
              "&:hover": {
                backgroundColor: activeTab === index ? "#1A1F36" : "#f5f5f5",
              },
            }}
          >
            {`${t("floor")} ${index + 1}`}
          </Button>
        ))}
      </Stack>

      {/* Tab Content */}
      {floorPlans.length > 0 && (
        <Box
          sx={{
            p: 3,
            borderRadius: "8px",
            backgroundColor: "#f5f7fa",
          }}
        >
          <Grid container spacing={2}>
            {/* Main Floor Image */}
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src={floorPlans[activeTab]?.photo}
                alt={`Floor ${activeTab + 1}`}
                sx={{
                  width: "100%",
                  borderRadius: 1,
                  objectFit: "contain",
                }}
              />
            </Grid>

            {/* Additional Images */}
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  columnCount: { xs: 1, sm: 2 },
                  columnGap: "16px",
                }}
              >
                {floorPlans[activeTab]?.images?.map((img, idx) => (
                  <Box
                    key={idx}
                    component="img"
                    src={img}
                    alt={`Additional ${idx + 1}`}
                    sx={{
                      width: "100%",
                      borderRadius: 1,
                      marginBottom: "16px",
                      breakInside: "avoid",
                    }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}
