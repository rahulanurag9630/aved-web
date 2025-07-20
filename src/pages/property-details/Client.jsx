"use client";
import { Box, Button, Container, styled, Typography } from "@mui/material";
import React from "react";
import Marquee from "react-fast-marquee";
import ScrollAnimation from "react-animate-on-scroll";
import { useTranslation } from "react-i18next";

const MarquemainBox = styled("Box")(({ theme }) => ({
    position: "relative",
    zIndex: "999",
}));



export default function Client({ clientData, brochure }) {
    const { t } = useTranslation();

    return (
        <MarquemainBox>
            <Box
                className="main-sectionGap"
                style={{ background: "#F8F9FB", padding: "50px 0" }}
            >
                <Container>
                    <Box align="center" className="subSection1">
                        <ScrollAnimation animateIn="zoomIn">
                            <Typography variant="h2" style={{ textTransform: "uppercase" }}>
                                {t("our_partners")}
                            </Typography>
                        </ScrollAnimation>
                    </Box>

                    <Box className="marquenbanner">
                        <Marquee direction="left">
                            <Box
                                className="displaySpacebetween"
                                style={{ gap: "100px" }}
                                mt={4}
                            >
                                {clientData.map((data, i) => (
                                    <img
                                        key={i}
                                        onDragStart={(e) => e.preventDefault()}
                                        onContextMenu={(e) => e.preventDefault()}
                                        src={data}
                                        alt="images"
                                        className="clienticon"
                                    />
                                ))}
                            </Box>
                        </Marquee>
                    </Box>
                </Container>
                {/* 🔹 View Brochure Section */}
                {brochure && (
                    <Box align="center" mt={6}>
                        <Typography variant="h5" gutterBottom fontWeight={600}>
                            {t("brochure_title") || " Brochure"}
                        </Typography>
                        <Button
                            variant="contained"
                            href={brochure}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                // backgroundColor: "#2D2E83",
                                // color: "#fff",
                                fontWeight: 600,
                                px: 4,
                                py: 1.2,
                                borderRadius: "30px",
                                fontSize: "15px",
                                textTransform: "none",
                                boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                                "&:hover": {
                                    backgroundColor: "#1e1f66",
                                },
                            }}
                        >
                            📄 {t("view_brochure") || "View Brochure"}
                        </Button>
                    </Box>
                )}
            </Box>
        </MarquemainBox>
    );
}
