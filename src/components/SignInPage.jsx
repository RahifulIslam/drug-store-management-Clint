import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

const SignInPage = () => {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // State to hold the error message
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/signin",
        signInData
      );
      console.log(response.data); // Handle successful response
      navigate("/home");
    } catch (error) {
      console.error(error); // Handle error
      setErrorMessage(error.response.data);
    }
    setSignInData({ email: "", password: "" }); // Reset the form after submission
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <Card sx={{ width: "50%", backgroundColor: "#f5f5f5" }}>
        <CardContent>
          <Typography variant="h5" sx={{ marginBottom: 4 }}>
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={signInData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={signInData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign In
            </Button>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Display the error message */}
            <Button variant="text" color="primary" fullWidth>
              <Link to="/signup">Create a new account</Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignInPage;
