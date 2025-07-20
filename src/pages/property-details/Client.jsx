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

            </Box>
        </MarquemainBox>
    );
}
