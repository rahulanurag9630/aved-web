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

  return (
    <Box mt={6}>
      {/* Main Tabs */}
      <Tabs
        value={activeMainTab}
        onChange={(e, val) => setActiveMainTab(val)}
        sx={{
          mb: 2, "& .MuiTab-root": {
            color: "#000",
          },
          "& .Mui-selected": {
            color: "#fff !important",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#fff",
          },
        }}
      >
        {floorPlans?.length > 0 && <Tab label={t("floorPlan")} />}
        {bedrooms?.length > 0 && <Tab label={t("bedrooms")} />}
        {bathrooms?.length > 0 && < Tab label={t("bathrooms")} />}
      </Tabs>

      {/* =================== FLOOR PLANS =================== */}
      {activeMainTab === 0 && floorPlans.length > 0 && (
        <>
          <Stack direction="row" spacing={2} mb={3} flexWrap="wrap">
            {floorPlans.map((plan, index) => (
              <Button
                key={index}
                variant={activeFloorTab === index ? "contained" : "outlined"}
                onClick={() => setActiveFloorTab(index)}
                sx={{
                  borderRadius: "2px",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: 3,
                  backgroundColor:
                    activeFloorTab === index ? "#5c4d44" : "#fff",
                  color: activeFloorTab === index ? "#fff" : "#1A1F36",
                  borderColor: "#C0C0C0",
                  "&:hover": {
                    backgroundColor:
                      activeFloorTab === index ? "#1A1F36" : "#f5f5f5",
                  },
                }}
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
          <Stack direction="row" spacing={2} mb={3} flexWrap="wrap">
            {bedrooms.map((room, index) => (
              <Button
                key={index}
                variant={activeBedroomTab === index ? "contained" : "outlined"}
                onClick={() => setActiveBedroomTab(index)}
                sx={{
                  borderRadius: "2px",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: 3,
                  backgroundColor:
                    activeBedroomTab === index ? "#5c4d44" : "#fff",
                  color: activeBedroomTab === index ? "#fff" : "#1A1F36",
                  borderColor: "#C0C0C0",
                  "&:hover": {
                    backgroundColor:
                      activeBedroomTab === index ? "#1A1F36" : "#f5f5f5",
                  },
                }}
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
          <Stack direction="row" spacing={2} mb={3} flexWrap="wrap">
            {bathrooms.map((room, index) => (
              <Button
                key={index}
                variant={activeBathroomTab === index ? "contained" : "outlined"}
                onClick={() => setActiveBathroomTab(index)}
                sx={{
                  borderRadius: "2px",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: 3,
                  backgroundColor:
                    activeBathroomTab === index ? "#5c4d44" : "#fff",
                  color: activeBathroomTab === index ? "#fff" : "#1A1F36",
                  borderColor: "#C0C0C0",
                  "&:hover": {
                    backgroundColor:
                      activeBathroomTab === index ? "#1A1F36" : "#f5f5f5",
                  },
                }}
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
