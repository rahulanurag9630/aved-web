import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  Stack,
  Grid,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";

export default function PropertyTabs({ data }) {
  const { t } = useTranslation();

  // Tabs: 0 = Floor Plan, 1 = Bedrooms, 2 = Bathrooms
  const [activeMainTab, setActiveMainTab] = useState(0);

  // Floor Plan state
  const floorPlans = data?.floor_plan || [];
  const [activeFloorTab, setActiveFloorTab] = useState(0);
  const [previewFloorImage, setPreviewFloorImage] = useState(null);
  const [openFloorModal, setOpenFloorModal] = useState(false);

  // Bedrooms state
  const bedrooms = data?.bedrooms || [];
  const [activeBedroomTab, setActiveBedroomTab] = useState(0);
  const [previewBedroomImage, setPreviewBedroomImage] = useState(null);
  const [openBedroomModal, setOpenBedroomModal] = useState(false);

  // Bathrooms state
  const bathrooms = data?.bathrooms || [];
  const [activeBathroomTab, setActiveBathroomTab] = useState(0);
  const [previewBathroomImage, setPreviewBathroomImage] = useState(null);
  const [openBathroomModal, setOpenBathroomModal] = useState(false);

  useEffect(() => {
    setPreviewFloorImage(floorPlans[activeFloorTab]?.photo || null);
  }, [activeFloorTab, floorPlans]);

  useEffect(() => {
    setPreviewBedroomImage(bedrooms[activeBedroomTab]?.photo || null);
  }, [activeBedroomTab, bedrooms]);

  useEffect(() => {
    setPreviewBathroomImage(bathrooms[activeBathroomTab]?.photo || null);
  }, [activeBathroomTab, bathrooms]);

  // ✅ Floor Plan Helper
  const getFloorLabel = (index) => {
    if (index === 0) return t("groundFloor");

    const special = {
      1: t("firstFloor"),
      2: t("secondFloor"),
      3: t("thirdFloor"),
    };

    if (special[index]) return special[index];

    const j = index % 10,
      k = index % 100;
    let suffix = "th";
    if (j === 1 && k !== 11) suffix = "st";
    if (j === 2 && k !== 12) suffix = "nd";
    if (j === 3 && k !== 13) suffix = "rd";

    return `${index}${suffix} ${t("floor")}`;
  };

  // ✅ Common style for child tabs
  // ✅ Child tab style (grey + smaller)
  const childTabStyle = (active) => ({
    borderRadius: "4px",
    textTransform: "none",
    fontWeight: 500,
    fontSize: "14px",
    px: 2,
    py: 0.5,
    border: "1px solid #c7c7c7",
    backgroundColor: active ? "#9e9e9e" : "#f0f0f0",
    color: active ? "#fff" : "#333",
    "&:hover": {
      backgroundColor: active ? "#757575" : "#e0e0e0",
    },
  });


  return (
    <Box mt={6}>
      {/* ================= MAIN TABS ================= */}
      <Tabs
        value={activeMainTab}
        onChange={(e, val) => setActiveMainTab(val)}
        sx={{
          mb: 2,
          "& .MuiTab-root": {
            color: "#000",
            fontWeight: "bold",
            fontSize: "16px",
          },
          "& .Mui-selected": {
            color: "#fff !important",
            backgroundColor: "#5c4d44",
            borderRadius: "8px 8px 0 0",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#5c4d44",
            height: "4px",
          },
        }}
      >
        {floorPlans?.length > 0 && <Tab label={t("floorPlan")} />}
        {bedrooms?.length > 0 && <Tab label={t("bedrooms")} />}
        {bathrooms?.length > 0 && <Tab label={t("bathrooms")} />}
      </Tabs>

      {/* =================== FLOOR PLANS =================== */}
      {activeMainTab === 0 && floorPlans.length > 0 && (
        <>
          {/* CHILD TABS (Floor selection) */}
          <Stack direction="row" spacing={2} mb={3} flexWrap="wrap">
            {floorPlans.map((plan, index) => (
              <Button
                key={index}
                onClick={() => setActiveFloorTab(index)}
                sx={childTabStyle(activeFloorTab === index)}
              >
                {getFloorLabel(index)}
              </Button>
            ))}
          </Stack>

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
                  src={previewFloorImage}
                  alt={`Floor ${activeFloorTab}`}
                  sx={{
                    width: "100%",
                    borderRadius: 1,
                    objectFit: "contain",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenFloorModal(true)}
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
                  {floorPlans[activeFloorTab]?.images?.map((img, idx) => (
                    <Box
                      key={idx}
                      component="img"
                      src={img}
                      alt={`Additional ${idx + 1}`}
                      onClick={() => setPreviewFloorImage(img)}
                      sx={{
                        width: "100%",
                        borderRadius: 1,
                        marginBottom: "16px",
                        breakInside: "avoid",
                        cursor: "pointer",
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

          {/* Floor Modal */}
          <Modal open={openFloorModal} onClose={() => setOpenFloorModal(false)}>
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
                onClick={() => setOpenFloorModal(false)}
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
                src={previewFloorImage}
                alt="Enlarged preview"
                sx={{
                  width: "100%",
                  borderRadius: 1,
                  objectFit: "contain",
                }}
              />
            </Box>
          </Modal>
        </>
      )}

      {/* =================== BEDROOMS =================== */}
      {activeMainTab === 1 && bedrooms.length > 0 && (
        <>
          {/* CHILD TABS (Bedroom selection) */}
          <Stack direction="row" spacing={2} mb={3} flexWrap="wrap">
            {bedrooms.map((room, index) => (
              <Button
                key={index}
                onClick={() => setActiveBedroomTab(index)}
                sx={childTabStyle(activeBedroomTab === index)}
              >
                {`${t("bedroom")} ${index + 1}`}
              </Button>
            ))}
          </Stack>

          <Box
            sx={{
              p: 3,
              borderRadius: "8px",
              backgroundColor: "#f5f7fa",
            }}
          >
            <Grid container spacing={2}>
              {/* Main Bedroom Image */}
              <Grid item xs={12} md={5}>
                <Box
                  component="img"
                  src={previewBedroomImage}
                  alt={`Bedroom ${activeBedroomTab + 1}`}
                  sx={{
                    width: "100%",
                    borderRadius: 1,
                    objectFit: "contain",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenBedroomModal(true)}
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
                  {bedrooms[activeBedroomTab]?.images?.map((img, idx) => (
                    <Box
                      key={idx}
                      component="img"
                      src={img}
                      alt={`Bedroom extra ${idx + 1}`}
                      onClick={() => setPreviewBedroomImage(img)}
                      sx={{
                        width: "100%",
                        borderRadius: 1,
                        marginBottom: "16px",
                        breakInside: "avoid",
                        cursor: "pointer",
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

          {/* Bedroom Modal */}
          <Modal
            open={openBedroomModal}
            onClose={() => setOpenBedroomModal(false)}
          >
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
                onClick={() => setOpenBedroomModal(false)}
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
                src={previewBedroomImage}
                alt="Enlarged bedroom"
                sx={{
                  width: "100%",
                  borderRadius: 1,
                  objectFit: "contain",
                }}
              />
            </Box>
          </Modal>
        </>
      )}

      {/* =================== BATHROOMS =================== */}
      {activeMainTab === 2 && bathrooms.length > 0 && (
        <>
          {/* CHILD TABS (Bathroom selection) */}
          <Stack direction="row" spacing={2} mb={3} flexWrap="wrap">
            {bathrooms.map((room, index) => (
              <Button
                key={index}
                onClick={() => setActiveBathroomTab(index)}
                sx={childTabStyle(activeBathroomTab === index)}
              >
                {`${t("bathroom")} ${index + 1}`}
              </Button>
            ))}
          </Stack>

          <Box
            sx={{
              p: 3,
              borderRadius: "8px",
              backgroundColor: "#f5f7fa",
            }}
          >
            <Grid container spacing={2}>
              {/* Main Bathroom Image */}
              <Grid item xs={12} md={5}>
                <Box
                  component="img"
                  src={previewBathroomImage}
                  alt={`Bathroom ${activeBathroomTab + 1}`}
                  sx={{
                    width: "100%",
                    borderRadius: 1,
                    objectFit: "contain",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenBathroomModal(true)}
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
                  {bathrooms[activeBathroomTab]?.images?.map((img, idx) => (
                    <Box
                      key={idx}
                      component="img"
                      src={img}
                      alt={`Bathroom extra ${idx + 1}`}
                      onClick={() => setPreviewBathroomImage(img)}
                      sx={{
                        width: "100%",
                        borderRadius: 1,
                        marginBottom: "16px",
                        breakInside: "avoid",
                        cursor: "pointer",
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

          {/* Bathroom Modal */}
          <Modal
            open={openBathroomModal}
            onClose={() => setOpenBathroomModal(false)}
          >
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
                onClick={() => setOpenBathroomModal(false)}
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
                src={previewBathroomImage}
                alt="Enlarged bathroom"
                sx={{
                  width: "100%",
                  borderRadius: 1,
                  objectFit: "contain",
                }}
              />
            </Box>
          </Modal>
        </>
      )}
    </Box>
  );
}
