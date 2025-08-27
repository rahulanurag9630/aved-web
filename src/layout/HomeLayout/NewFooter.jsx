// components/NewFooter.js
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";
import { apiRouterCall } from "@/api-services/service";
import React, { useEffect, useState } from "react";

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/realestate.aved", icon: <FacebookIcon /> },
  {
    name: "Instagram",
    href: "https://www.instagram.com/avedrealestate/?igsh=ZXN6cHc5MHRzMnRt#",
    icon: <InstagramIcon />,
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/company/avedrealestate/?viewAsMember=true",
    icon: <LinkedInIcon />,
  },
  {
    name: "Twitter",
    href: "https://x.com/avedrealestate?s=21&t=G6uZG2bWUKQ6oFJAJl8YNA",
    icon: <TwitterIcon />,
  },
];

export default function NewFooter() {
  const { t } = useTranslation();
  const [color, setColor] = useState("#5c4d44");

  const aboutLinks = [
    { key: "footer_why_choose_us", href: "/about-us" },
    { key: "footer_our_team", href: "/about-us" },
    { key: "footer_properties", href: "/project" },
    { key: "footer_partners", href: "/" },
  ];

  const projectLinks = [
    { key: "footer_news_updates", href: "/blogs" },
    { key: "footer_terms_conditions", href: "/term-condition" },
    { key: "footer_privacy_policy", href: "/privacy-policy" },
    { key: "footer_contact", href: "/contact-us" },
  ];

  useEffect(() => {
    const fetchColor = async () => {
      try {
        const res = await apiRouterCall({
          method: "GET",
          endPoint: "getColor",
        });

        setColor(res?.data?.result?.code || "#5c4d44");
      } catch (error) {
        console.error("Error fetching footer color:", error);
      }
    };
    fetchColor();
  }, []);

  return (
    <Box
      py={6}
      sx={{
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        background: color,
        margin: "20px",
      }}
      className="main-sectionGap maifootersection"
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and description */}
          <Grid item xs={12} md={4} className="footerLogodescription">
            <Box display="flex" alignItems="center" mb={2}>
              <img
                src="/images/logowhite.svg"
                alt="logo"
                className="footerLogo"
              />
            </Box>
            <Typography
              color="#ffffffdb"
              variant="body2"
              lineHeight="25px"
              style={{ maxWidth: "308px" }}
            >
              {t("footer_about_description")}
            </Typography>
          </Grid>

          {/* About & Projects */}
          <Grid item xs={12} md={4} className="centerborderfooter">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" fontWeight="600" color="#fff" mb={1}>
                  {t("footer_about_us")}
                </Typography>
                {aboutLinks.map((item) => (
                  <Typography key={item.key} color="#fff" variant="body2" mb={0.5}>
                    <NextLink href={item.href} passHref legacyBehavior>
                      <Link underline="hover" color="inherit">
                        {t(item.key)}
                      </Link>
                    </NextLink>
                  </Typography>
                ))}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" fontWeight="600" color="#fff" mb={1}>
                  {t("footer_our_projects")}
                </Typography>
                {projectLinks.map((item) => (
                  <Typography key={item.key} color="#fff" variant="body2" mb={0.5}>
                    <NextLink href={item.href} passHref legacyBehavior>
                      <Link underline="hover" color="inherit">
                        {t(item.key)}
                      </Link>
                    </NextLink>
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </Grid>

          {/* Contact & Social */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h3"
              color="#fff"
              mb={1}
              style={{ borderBottom: "1px solid #ffffff1c", width: "fit-content" }}
            >
              {t("footer_phone_number")}
            </Typography>
            <Typography
              variant="h3"
              color="#fff"
              mb={2}
              style={{ borderBottom: "1px solid #ffffff1c", width: "fit-content" }}
            >
              <Link href="mailto:info@aved-sa.com" underline="hover" color="inherit">
                {t("footer_email")}
              </Link>
            </Typography>

            {/* Social Media Icons */}
            <Box display="flex" gap={1} mt={2}>
              {socialLinks.map(({ name, href, icon }) => (
                <IconButton
                  key={name}
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "#fff", fontSize: "2rem" }} // 👈 increased size

                >
                  {React.cloneElement(icon, { sx: { fontSize: 35 } })} {/* 👈 set size here */}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          mt={6}
          pt={3}
          borderTop="1px solid #eeeeee2b"
          textAlign="center"
          className="footercopy"
        >
          <Typography variant="body2" color="#fff">
            {t("footer_copyright")}
          </Typography>
        </Box>

        {/* Scroll to top button */}
        <IconButton
          sx={{ position: "fixed", bottom: 30, right: 30, bgcolor: "#fff", boxShadow: 2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <KeyboardArrowUpIcon style={{ color: "#000" }} />
        </IconButton>
      </Container>
    </Box>
  );
}
