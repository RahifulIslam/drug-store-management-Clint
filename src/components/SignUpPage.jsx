import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";

const SignUpPage = () => {
  const [responseMessage, setResponseMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .max(100, "Name must be at most 100 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(5, "Password must be at least 5 characters")
        .max(100, "Password must be at most 100 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/user/signup",
          values
        );
        console.log(response.data); // Handle successful response
        setResponseMessage(response.data.message); // Set the response message
        resetForm(); // Reset form fields
      } catch (error) {
        console.error(error); // Handle error
      }
    },
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Card sx={{ width: "50%", backgroundColor: "#f5f5f5" }}>
        <CardContent>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Sign Up
          </Typography>
          {responseMessage && (
            <Typography
              variant="body1"
              color="primary"
              sx={{ marginBottom: 2 }}
            >
              {responseMessage}
            </Typography>
          )}
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
            <Button
              component={Link}
              to="/"
              variant="text"
              color="primary"
              fullWidth
            >
              Log In Now
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUpPage;
