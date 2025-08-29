"use client";
import { Box, Typography } from "@mui/material";
import { FaFacebookF } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const TeamCard = ({ name, description, image, role, facebook, instagram, linkedin }) => {
  const openLink = (url, fallback) => {
    const validUrl = url || fallback;
    window.open(validUrl, "_blank");
  };

  return (
    <div className="cardBox">
      <div className="card">
        <div className="card">
          <img src={image} alt={name} className="cardImage" />
        </div>
        <div className="cardContent">
          <Typography variant="h2" fontSize="20px" lineHeight="30px">
            {role}
          </Typography>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2">{description}</Typography>

          <Box align="center" mt={2} className="displayStart" gap="10px">
            <FaFacebookF
              style={{ cursor: "pointer", fontSize: "26px" }}
              onClick={() => openLink(facebook, "https://facebook.com")}
            />
            <FaWhatsapp
              style={{ cursor: "pointer", fontSize: "26px" }}
              onClick={() => openLink(instagram, "https://www.whatsapp.com")}
            />
            <FaLinkedinIn
              style={{ cursor: "pointer", fontSize: "26px" }}
              onClick={() => openLink(linkedin, "https://linkedin.com")}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
