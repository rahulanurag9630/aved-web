import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
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
    { icon: "construction", labelKey: "why_1_label", descKey: "why_1_desc" },
    { icon: "home", labelKey: "why_2_label", descKey: "why_2_desc" },
    { icon: "creditCard", labelKey: "why_3_label", descKey: "why_3_desc" },
    { icon: "event", labelKey: "why_4_label", descKey: "why_4_desc" },
    { icon: "transfer", labelKey: "why_5_label", descKey: "why_5_desc" },
    { icon: "move", labelKey: "why_6_label", descKey: "why_6_desc" },
  ];

  const iconMap = {
    construction: <ConstructionIcon sx={{ fontSize: 40, color: "#5c4d44" }} />,
    home: <HomeIcon sx={{ fontSize: 40, color: "#5c4d44" }} />,
    creditCard: <CreditCardIcon sx={{ fontSize: 40, color: "#5c4d44" }} />,
    event: <EventIcon sx={{ fontSize: 40, color: "#5c4d44" }} />,
    transfer: <SwapHorizIcon sx={{ fontSize: 40, color: "#5c4d44" }} />,
    move: <MoveToInboxIcon sx={{ fontSize: 40, color: "#5c4d44" }} />,
  };

  return (
    <Container className="main-sectionGap">
      <Box sx={{ flexGrow: 1, backgroundColor: "#fff" }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left Section */}
          <Grid item xs={12} md={7}>
            <ScrollAnimation animateIn="fadeInLeft">
              <Typography variant="h2" mb={4}>
                {t("why_choose_heading")}
              </Typography>
            </ScrollAnimation>

            <Grid container spacing={3}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <ScrollAnimation animateIn="fadeInUp" delay={index * 100}>
                    <Paper
                      elevation={3}
                      sx={{
                        display: "flex",
                        flexDirection: i18n.language === "ar" ? "row-reverse" : "row",
                        alignItems: "flex-start",
                        padding: 2,
                        height: "100%",
                        background: "#ffffff",
                        borderRadius: 2,
                        gap: 2,
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <Box>{iconMap[feature.icon]}</Box>
                      <Box>
                        <Typography
                          variant="h6"
                          color="#5c4d44"
                          fontWeight={600}
                          mb={0.5}
                        >
                          {t(feature.labelKey)}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="#232323"
                          sx={{ fontSize: "16px", fontWeight: 400 }}
                        >
                          {t(feature.descKey)}
                        </Typography>
                      </Box>
                    </Paper>
                  </ScrollAnimation>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Right Section: Image */}
          <Grid item xs={12} md={5} textAlign="center">
            <ScrollAnimation animateIn="fadeInRight">
              <img
                src="/images/Team/WHYchooseUS.jpg"
                alt="Why Choose Us"
                style={{
                  width: "100%",
                  height: "500px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
            </ScrollAnimation>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
