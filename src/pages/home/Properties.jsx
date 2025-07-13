import React, { useContext, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import AppContext from "@/context/AppContext";
import ScrollAnimation from "react-animate-on-scroll";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const RulesComponent = styled(Box)(({ theme, color = "#f0f0f0" }) => ({
  "& .botmainBox": {
    marginTop: "70px",
  },
  "& .botheadingText": {
    fontSize: "42px",
    maxWidth: "200px",
    lineHeight: "50px",
    padding: "20px 0",
  },
}));

const data = [
  {
    title: "our_projects",
    description: "explore_portfolio_projects",
    images: "/images/Properties/pro_1.jpg",
    className1: "straIcon1",
    navigation: "/project",
  },
  {
    title: "discover_blogs",
    description: "blog_tips_description",
    images: "/images/Properties/pro_2.jpg",
    className1: "straIcon1",
    navigation: "/blogs",
  },
];

export default function Properties() {
  const auth = useContext(AppContext);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (auth?.topHeading) {
      auth?.setTopHeading("About");
    }
  }, []);

  return (
    <RulesComponent>
      <Box className="botmainBox main-sectionGap">
        <Container>
          <Box align="center" className="subSection">
            <ScrollAnimation animateIn="zoomIn">
              <Typography variant="h2" style={{ textTransform: "uppercase" }}>
                {t("real_estate_projects")}
              </Typography>
            </ScrollAnimation>
          </Box>

          <Grid container spacing={3} style={{ position: "relative" }}>
            {data.map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <ScrollAnimation
                  animateIn="slideInLeft"
                  delay={index * 300}
                  animateOnce={true}
                >
                  <Box className="project-post-thumbnail">
                    <img
                      src={item.images}
                      alt="Project"
                      className="scroll-animate"
                    />
                  </Box>

                  <Box className="textContainer" align="center">
                    <ScrollAnimation animateIn="slideInUp">
                      <Tooltip title={t(item.title)} placement="top" arrow>
                        <Typography
                          variant="h3"
                          color="#000"
                          style={{
                            textTransform: "uppercase",
                            fontWeight: "400",
                          }}
                        >
                          {t(item.title)}
                        </Typography>
                      </Tooltip>
                    </ScrollAnimation>

                    <Tooltip title={t(item.description)} placement="top" arrow>
                      <Typography variant="body2" color="#000">
                        {t(item.description)}
                      </Typography>
                    </Tooltip>

                    <Box mt={2}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => router.push(item.navigation)}
                      >
                        {t("read_more")}
                      </Button>
                    </Box>
                  </Box>
                </ScrollAnimation>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </RulesComponent>
  );
}
