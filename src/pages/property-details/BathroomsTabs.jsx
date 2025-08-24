import React, { useState, useEffect } from "react";
import { Box, Button, Modal, Typography, Stack, Grid, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";

export default function BathroomTabs({ data }) {
    const [activeTab, setActiveTab] = useState(0);
    const { t } = useTranslation();
    const bathrooms = data?.bathrooms || [];
    const [previewImage, setPreviewImage] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        setPreviewImage(bathrooms[activeTab]?.photo || null);
    }, [activeTab, bathrooms]);

    if (bathrooms.length === 0) return null; // ✅ Hide if no bathrooms

    return (
        <Box mt={6}>
            <Typography variant="h3" mb={3}>
                {t("bathrooms")}
            </Typography>

            {/* Tab Buttons */}
            <Stack direction="row" spacing={2} mb={3} flexWrap="wrap">
                {bathrooms.map((room, index) => (
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
                        {`${t("bathroom")} ${index + 1}`}
                    </Button>
                ))}
            </Stack>

            {/* Content */}
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
                            src={previewImage}
                            alt={`Bathroom ${activeTab + 1}`}
                            sx={{
                                width: "100%",
                                borderRadius: 1,
                                objectFit: "contain",
                                cursor: "pointer",
                            }}
                            onClick={() => setOpenModal(true)}
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
                            {bathrooms[activeTab]?.images?.map((img, idx) => (
                                <Box
                                    key={idx}
                                    component="img"
                                    src={img}
                                    alt={`Bathroom extra ${idx + 1}`}
                                    onClick={() => setPreviewImage(img)}
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

            {/* Modal */}
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
                        alt="Enlarged bathroom"
                        sx={{
                            width: "100%",
                            borderRadius: 1,
                            objectFit: "contain",
                        }}
                    />
                </Box>
            </Modal>
        </Box>
    );
}
