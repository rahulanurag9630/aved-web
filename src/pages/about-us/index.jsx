import React, { useState, useEffect } from "react";
import HomeLayout from "@/layout/HomeLayout";
import { Container, Typography, Box, styled } from "@mui/material";
import { apiRouterCall } from "@/api-services/service";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import Description from "./Description";
import Client from "../home/Client";
import VisionMissionSection from "./VisionMissionSection";
import Team from "./Team";
import WhychooseUs from "./WhychooseUs";

const AboutUSBox = styled("Box")(({ theme }) => ({
  "& .aboutBannerImage": {
    zIndex: 1,
    position: "relative",
    backgroundSize: "cover",
    backgroundImage: "url(/images/About/about-bg.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
  },
  "& .headingBox": {
    paddingBottom: "150px",
    paddingTop: "150px",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "47px",
      paddingTop: "113px",
    },
  },
  "& .TopSection": {
    background: "#fff",
    color: "#000",
    boxShadow:
      "rgba(0, 0, 0, 0.15) 0px 5px 15px, rgba(0, 0, 0, 0.15) 0px -5px 15px, rgba(0, 0, 0, 0.15) -5px 0px 15px, rgba(0, 0, 0, 0.15) 5px 0px 15px",
  },
}));

export default function AboutUS() {
  const [data, setData] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();

  const fetchAboutUs = async () => {
    try {
      setLoading(true);
      const res = await apiRouterCall({
        method: "GET",
        endPoint: `viewStaticContent`,
        token: user?.userInfo?.token,
        id: "AboutUs",
      });
      if (res?.data?.responseCode === 200) {
        setData(res?.data?.result || {});
      }
    } catch (error) {
      console.error("Error while getting About Us data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutUs();
  }, []);

  return (
    <AboutUSBox>
      <Box className="aboutBannerImage">
        <Container style={{ position: "relative", zIndex: "999" }}>
          <Box className="headingBox">
            <Typography variant="h1" color="#fff">
              {t("about_heading")}
            </Typography>
          </Box>

          <Box
            className="displaySpacebetween"
            style={{ alignItems: "end", flexWrap: "wrap" }}
            pb={5}
          >
            <Box className="displayStart" gap="15px">
              <Typography
                variant="h6"
                color="#FFFFFF99"
                sx={{ cursor: "pointer", fontWeight: "600" }}
                onClick={() => router.push("/")}
              >
                {t("breadcrumb_home")}
              </Typography>

              <Typography
                variant="h6"
                color="#FFFFFF99"
                sx={{ cursor: "pointer", fontWeight: "600" }}
                onClick={() => router.push("/about")}
              >
                {t("breadcrumb_about")}
              </Typography>
            </Box>

            <Typography
              variant="h3"
              color="#FFFFFF99"
              style={{ maxWidth: "400px" }}
            >
              {t("about_banner_description")}
            </Typography>
          </Box>
        </Container>
      </Box>

      <Description />
      <VisionMissionSection />
      <Team />
      <WhychooseUs />
      <Client />
    </AboutUSBox>
  );
}

AboutUS.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
