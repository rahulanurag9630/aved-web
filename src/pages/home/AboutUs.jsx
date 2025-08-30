import React from "react";
import { Container, Typography, Box, Grid, Button } from "@mui/material";
import ScrollAnimation from "react-animate-on-scroll";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function AboutUs() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Box className="landing-about">
      <Box align="center" className="subSection">
        <ScrollAnimation animateIn="zoomIn">
          <Typography variant="h2" style={{ textTransform: "uppercase" }}>
            {t("about_aved_properties")}
          </Typography>
        </ScrollAnimation>
      </Box>

      <Container>
        <Box>
          <img
            src="/images/About/aboutlanding.webp"
            alt="Image"
            style={{ width: "100%" }}
          />
        </Box>

        <Grid container spacing={2} alignItems="center" position="relative">
          <Grid item xs={12} md={5} sm={12}>
            <Box mt={2} mb={2} className="aboutusbanner">
              <ScrollAnimation animateIn="slideInUp">
                <Typography variant="h4" style={{ textTransform: "uppercase" }}>
                  {t("aved_description")}
                </Typography>
              </ScrollAnimation>

              <Typography
                variant="body2"
                color="#9D9D9C"
                style={{ textTransform: "uppercase" }}
              >
                {t("aved_markets")}
              </Typography>

              <Box mt={4}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => router.push("/about-us")}
                >
                  {t("learn_more")}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
