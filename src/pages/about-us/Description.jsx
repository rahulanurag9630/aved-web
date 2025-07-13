import { Container, Grid, Typography, Box } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import ScrollAnimation from "react-animate-on-scroll";
import { useTranslation } from "react-i18next";

const FantasticPage = styled("Box")(({ theme }) => ({
  position: "relative",
  "& h2": {
    textTransform: "uppercase",
    lineHeight: "70px",
    fontWeight: "600",
    [theme.breakpoints.down("sm")]: {
      lineHeight: "35px",
    },
  },
  "& img": {
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      maxWidth: "100%",
      height: "auto",
    },
  },
}));

export default function Description() {
  const { t } = useTranslation();

  return (
    <FantasticPage>
      <Container maxWidth="lg" className="marginTopSection">
        <Grid container spacing={2} alignItems="center">
          <Grid item lg={5} md={6} sm={12} xs={12}>
            <ScrollAnimation animateIn="slideInLeft">
              <Typography
                variant="h2"
                color="#000"
                style={{ textTransform: "uppercase" }}
              >
                {t("description_title")}
              </Typography>
            </ScrollAnimation>
          </Grid>
          <Grid item lg={1} md={1} sm={12} xs={12}></Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <ScrollAnimation animateIn="slideInRight">
              <Typography variant="h3" color="#000" mb={2} mt={2}>
                {t("description_subtitle")}
              </Typography>

              <Typography variant="body2" color="secondary" mb={2} mt={2}>
                {t("description_paragraph")}
              </Typography>
            </ScrollAnimation>
          </Grid>
        </Grid>
      </Container>
    </FantasticPage>
  );
}
