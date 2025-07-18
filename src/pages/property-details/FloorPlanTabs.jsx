import React, { useState, useEffect } from "react";
import { Box, Button, Modal, Typography, Stack, Grid, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";

export default function FloorPlanTabs({ data }) {
  const [activeTab, setActiveTab] = useState(0);
  const { t } = useTranslation()
  const floorPlans = data?.floor_plan || [];
  const [previewImage, setPreviewImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setPreviewImage(floorPlans[activeTab]?.photo || null);
  }, [activeTab, floorPlans]);
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
                src={previewImage}
                alt={`Floor ${activeTab + 1}`}
                sx={{
                  width: "100%",
                  borderRadius: 1,
                  objectFit: "contain",
                  cursor: "pointer",
                }}
                onClick={() => setOpenModal(true)} // Open modal on click
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
                    onClick={() => setPreviewImage(img)} // 🔁 Click to change preview
                    sx={{
                      width: "100%",
                      borderRadius: 1,
                      marginBottom: "16px",
                      breakInside: "avoid",
                      cursor: "pointer", // 👈 makes it look clickable
                      transition: "0.3s",
                      "&:hover": {
                        opacity: 0.8,
                      },
                    }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "90vw",
            maxHeight: "90vh",
            outline: "none",
          }}
        >
          <IconButton
            onClick={() => setOpenModal(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "#fff",
              zIndex: 1,
              "&:hover": {
                backgroundColor: "#eee",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={previewImage}
            alt="Enlarged preview"
            sx={{
              width: "100%",
              height: "420px",
              borderRadius: 1,
              objectFit: "contain",
            }}
          />
        </Box>
      </Modal>
    </Box>


  );
}
