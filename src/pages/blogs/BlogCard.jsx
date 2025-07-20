import { Box, Typography, Button, Stack } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function BlogCard({ image, title, date, description, slug, id }) {
  const { t } = useTranslation()
  function getTextSnippetFromHTML(html, limit = 65) {
    if (!html) return "";

    // Create a temporary DOM element to extract plain text
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const plainText = tempDiv.textContent || tempDiv.innerText || "";

    // Trim and limit to `limit` characters
    return plainText.length > limit
      ? plainText.substring(0, limit).trim() + "..."
      : plainText.trim();
  }

  const router = useRouter();
  return (
    <Box
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#fff",
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 200,
          overflow: "hidden", // ensures image doesn't spill on scale
          "& .blog-image": {
            transition: "transform 0.4s ease",
          },
          "&:hover .blog-image": {
            transform: "scale(1.05)",
          },
        }}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="blog-image"
          style={{ objectFit: "cover", cursor: "pointer" }}
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </Box>

      {/* Content Section */}
      <Box sx={{ p: 2, flexGrow: 1 }}>
        <Typography variant="caption" color="text.secondary">
          {date}
        </Typography>

        <Typography variant="h6" fontWeight={600} gutterBottom>
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
          lineHeight="25px"
          dangerouslySetInnerHTML={{
            __html:
              getTextSnippetFromHTML(description, 100)
          }}
        />


        <Button
          variant="contained"
          color="secondary"
          size="small"
          style={{ padding: "8px 18px", fontSize: "10px" }}
          onClick={() => router.push({ pathname: `/bogs-details`, query: { id } })} // Correct placement of onClick
        >
          {t("read_more")}
        </Button>
      </Box>
    </Box>
  );
}
