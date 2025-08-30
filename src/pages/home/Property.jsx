import {
  Box,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import ScrollAnimation from "react-animate-on-scroll";
import Image from "next/image";
import ConstructionIcon from "@mui/icons-material/Construction";
import HomeIcon from "@mui/icons-material/Home";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import PaymentIcon from "@mui/icons-material/Payment";
import BuildIcon from "@mui/icons-material/Build";
import { useTranslation } from "react-i18next";

export default function Property() {
  const { t } = useTranslation();

  const features = [
    { label: t("construction_updates"), icon: "construction" },
    { label: t("ownership_updates"), icon: "home" },
    { label: t("access_card_requests"), icon: "creditCard" },
    { label: t("amenities_booking"), icon: "event" },
    { label: t("property_related_transfers"), icon: "transfer" },
    { label: t("move_in_out_requests"), icon: "move" },
    { label: t("online_payment"), icon: "payment" },
    { label: t("ecm_home_services"), icon: "build" },
  ];

  const iconMap = {
    construction: <ConstructionIcon />,
    home: <HomeIcon />,
    creditCard: <CreditCardIcon />,
    event: <EventIcon />,
    transfer: <SwapHorizIcon />,
    move: <MoveToInboxIcon />,
    payment: <PaymentIcon />,
    build: <BuildIcon />,
  };

  return (
    <Box className="main-sectionGap" sx={{ flexGrow: 1, backgroundColor: "#fff" }}>
      <Container>
        <Grid container spacing={4} alignItems="center">
          {/* Left Side */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="body2"
              className="digitalText"
              color="#9D9D9C"
              gutterBottom
              fontWeight="700"
              fontSize="12px"
            >
              {t("a_digital_experience")}
            </Typography>
            <ScrollAnimation animateIn="fadeInLeft">
              <Typography variant="h2" mt={1}>
                {t("the_one_app")} <br />
                {t("for_all_property_needs")}
              </Typography>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInUp">
              <Typography
                variant="body2"
                color="#232323"
                style={{ fontWeight: "300", fontSize: "18px" }}
                mt={3}
                sx={{ mb: 3 }}
              >
                {t("emaar_one_description")}
              </Typography>
            </ScrollAnimation>

            <Grid container spacing={1} mb={4}>
              {features.map((feature, index) => (
                <Grid item xs={6} key={index}>
                  <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                    <Box className="digitalIcon displayCenter" sx={{ mr: 1 }}>
                      {iconMap[feature.icon]}
                    </Box>
                    <Typography
                      variant="body2"
                      color="#232323"
                      className="digitalText1"
                      sx={{ fontWeight: 300, fontSize: "18px" }}
                    >
                      {feature.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <hr />

            <Box className="displayStart" gap="20px" mt={4}>
              <Box className="downloadaved displayCenter">
                <Typography variant="h2" fontSize="36px" lineHeight="38px">
                  Aved <br />
                  <span style={{ fontWeight: "300" }}>One</span>
                </Typography>
              </Box>
              <Typography variant="h2" fontSize="36px" lineHeight="38px">
                {t("download")} <br /> {t("aved_one_app")}
              </Typography>
            </Box>

            <Box className="displayStart" gap="10px" mt={4}>
              <img
                src="/images/google-play.png"
                alt="Google Play"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  window.open("https://play.google.com/store/apps/", "_blank")
                }
              />

              <img
                src="/images/apple.png"
                alt="Apple App Store"
                style={{ cursor: "pointer", marginLeft: "12px" }}
                onClick={() =>
                  window.open("https://www.apple.com/", "_blank")
                }
              />
            </Box>
          </Grid>

          {/* Right Side */}
          <Grid item xs={12} md={6} textAlign="center">
            <ScrollAnimation animateIn="fadeInRight">
              <img
                src="/images/digital-experiance.webp"
                alt="Digital"
                width="100%"
              />
            </ScrollAnimation>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
