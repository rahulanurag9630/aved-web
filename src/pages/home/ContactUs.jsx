"use client";
import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  TextField,
} from "@mui/material";
import ScrollAnimation from "react-animate-on-scroll";
import { useFormik } from "formik";
import * as Yup from "yup";
import { apiRouterCall } from "@/api-services/service";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function ContactUs() {
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, formikHelpers) => {
    setIsSubmitting(true);
    try {
      setLoading(true);
      const bodyData = {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        message: values.message,
      };

      const res = await apiRouterCall({
        method: "POST",
        endPoint: "createContactUs",
        bodyData,
      });

      if (res?.data?.responseCode === 200) {
        toast.success(t("form_success_message"));
        formikHelpers.resetForm();
      } else {
        toast.error(res?.data?.responseMessage || t("form_error_generic"));
      }
    } catch (err) {
      console.error("Form submission error:", err);
      toast.error(t("form_error_server"));
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(60, t("name_length_validation"))
        .required(t("name_required")),
      email: Yup.string()
        .email(t("email_invalid"))
        .required(t("email_required")),
      phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, t("phone_format_validation"))
        .required(t("phone_required")),
      message: Yup.string().required(t("message_required")),
    }),
    onSubmit: (values, formikHelpers) => handleSubmit(values, formikHelpers),
  });

  return (
    <Box
      sx={{
        minHeight: "80vh",
        backgroundImage: 'url("/images/Contact/contact_bg.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundRepeat: "no-repeat",
        px: 2,
        position: "relative",
      }}
      className="main-sectionGap contactsection"
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: 6,
          p: 4,
          width: "100%",
          maxWidth: "1000px",
          textAlign: "center",
          position: "relative",
          backgroundColor: "white",
          zIndex: "999",
        }}
      >
        <Box align="center" className="subSection">
          <ScrollAnimation animateIn="zoomIn">
            <Typography
              variant="h2"
              color="#000"
              className="getText"
              style={{ textTransform: "uppercase" }}
            >
              {t("contactus_heading")}
            </Typography>
          </ScrollAnimation>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder={t("placeholder_name")}
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                inputProps={{ maxLength: 60 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder={t("placeholder_email")}
                variant="outlined"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder={t("placeholder_phone")}
                variant="outlined"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder={t("placeholder_message")}
                variant="outlined"
                multiline
                rows={2}
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.message && Boolean(formik.errors.message)
                }
                helperText={formik.touched.message && formik.errors.message}
              />
            </Grid>
          </Grid>

          <Typography variant="body2" color="#808080" mt={2} mb={2}>
            {t("contactus_description")}
          </Typography>

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={isSubmitting || loading}
          >
            {loading ? t("button_submitting") : t("button_submit")}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
