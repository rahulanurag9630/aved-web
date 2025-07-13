import { Box, Container, Grid, Typography } from "@mui/material";
import ScrollAnimation from "react-animate-on-scroll";
import ConstructionIcon from "@mui/icons-material/Construction";
import HomeIcon from "@mui/icons-material/Home";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

export default function WhychooseUs() {
  const { t } = useTranslation();

  const features = [
    {
      icon: "construction",
      labelKey: "why_1_label",
      descKey: "why_1_desc",
    },
    {
      icon: "home",
      labelKey: "why_2_label",
      descKey: "why_2_desc",
    },
    {
      icon: "creditCard",
      labelKey: "why_3_label",
      descKey: "why_3_desc",
    },
    {
      icon: "event",
      labelKey: "why_4_label",
      descKey: "why_4_desc",
    },
    {
      icon: "transfer",
      labelKey: "why_5_label",
      descKey: "why_5_desc",
    },
    {
      icon: "move",
      labelKey: "why_6_label",
      descKey: "why_6_desc",
    },
  ];

  const iconMap = {
    construction: <ConstructionIcon />,
    home: <HomeIcon />,
    creditCard: <CreditCardIcon />,
    event: <EventIcon />,
    transfer: <SwapHorizIcon />,
    move: <MoveToInboxIcon />,
  };

  return (
    <Container className="main-sectionGap">
      <Box sx={{ flexGrow: 1, backgroundColor: "#fff" }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left Side */}
          <Grid item xs={12} md={7}>
            <ScrollAnimation animateIn="fadeInLeft">
              <Typography variant="h2" mb={3}>
                {t("why_choose_heading")}
              </Typography>
            </ScrollAnimation>

            <Grid container spacing={1} mb={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box display="flex" alignItems="flex-start" sx={{ mb: 1 }}>
                    <Box className="digitalIcon1 displayCenter" sx={{ mr: 1, ml: i18n.language === "en" ? null : 2 }}>
                      {iconMap[feature.icon]}
                    </Box>
                    <Box style={{ marginTop: "-10px" }}>
                      <Typography
                        variant="h6"
                        color="#5c4d44"
                        sx={{ fontWeight: 400, fontSize: "18px" }}
                      >
                        {t(feature.labelKey)}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="#232323"
                        sx={{ fontWeight: 300, fontSize: "18px" }}
                      >
                        {t(feature.descKey)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Right Side: Image */}
          <Grid item xs={12} md={5} textAlign="center">
            <ScrollAnimation animateIn="fadeInRight">
              <img
                src="/images/Team/WHYchooseUS.jpg"
                alt="Why Choose Us"
                style={{
                  width: "100%",
                  height: "500px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            </ScrollAnimation>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
