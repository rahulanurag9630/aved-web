"use client";
import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import ScrollAnimation from "react-animate-on-scroll";
import { useFormik } from "formik";
import * as Yup from "yup";
import { apiRouterCall } from "@/api-services/service";
import toast from "react-hot-toast";

export default function ContactUs() {
  const [formType, setFormType] = useState("quiry");
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
        toast.success("Your message has been sent successfully.");
        formikHelpers.resetForm();
      } else {
        toast.error(res?.data?.responseMessage || "Something went wrong.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      toast.error("Server error. Please try again.");
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
        .max(60, "Name must be at most 60 characters")
        .required("Please enter name."),
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter email."),
      phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Please enter phone number."),
      message: Yup.string().required("Please enter message."),
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
              Get specialist advice for residential, commercial or property
            </Typography>
          </ScrollAnimation>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Your Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                InputProps={{ disableUnderline: true }}
                inputProps={{ maxLength: 60 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Email"
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
                placeholder="Phone Number*"
                variant="outlined"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Message"
                variant="outlined"
                multiline
                rows={2}
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
              />
            </Grid>
          </Grid>

          <Typography variant="body2" color="#808080" mt={2} mb={2}>
            We're excited to connect with you! <br />
          </Typography>

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={isSubmitting || loading}
          >
            {loading ? "Submitting..." : "Get A Call Back"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
