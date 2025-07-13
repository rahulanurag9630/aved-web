import React, { useState } from "react";
import { Box, Button, Typography, Stack, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Landmarks({ data }) {
    const [activeTab, setActiveTab] = useState(0);
    const { t } = useTranslation()

    const landmarks = data?.landmarks || [];

    return (
        <Box mt={6}>
            <Typography variant="h3" mb={3}>
                {t("landmarks")}
            </Typography>

            {/* Tab Buttons */}
            <Stack direction="row" spacing={2} mb={3} flexWrap="wrap">
                {landmarks.map((plan, index) => (
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
                        {`${t("landmark")} ${index + 1}`}
                    </Button>
                ))}
            </Stack>

            {/* Tab Content */}
            {landmarks.length > 0 && (
                <Box
                    sx={{
                        p: 3,
                        borderRadius: "8px",
                        backgroundColor: "#f5f7fa",
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item lg={5} md={5} sm={12}>
                            <Box
                                component="img"
                                src={landmarks[activeTab].photo}
                                alt={`Floor ${activeTab + 1}`}
                                sx={{
                                    width: "auto",
                                    maxWidth: "100%",
                                }}
                            />
                        </Grid>
                        {/* <Grid item lg={7} md={7} sm={12}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ flex: 1 }}
                                dangerouslySetInnerHTML={{
                                    __html: landmarks[activeTab].description,
                                }}
                            />
                        </Grid> */}
                    </Grid>
                </Box>
            )}
        </Box>
    );
}
