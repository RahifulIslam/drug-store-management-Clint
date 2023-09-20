import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import axios from "axios";
// import Textarea from '@mui/joy/Textarea';

const UpdateMedicineModal = ({
  isOpenForUpdate,
  handleCloseUpdate,
  selectedMedicineData,
}) => {
  const initialUpdateMedicineData = {
    name: "",
    type: "",
    description: "",
    quantity: "",
    actual_price: "",
    selling_price: "",
    generics: "",
    company: "",
  };
  const [updateMedicineData, setUpdateMedicineData] = useState(
    initialUpdateMedicineData
  );

  const [errors, setErrors] = useState({});

  useEffect(()=>{
    if(selectedMedicineData != undefined){
      setUpdateMedicineData(selectedMedicineData)
    }
  },[selectedMedicineData])

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const contentStyle = {
    margin: "20px",
    maxHeight: "400px", // Adjust the maximum height as needed
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateMedicineData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateFields = () => {
    const newErrors = {};

    if (!updateMedicineData.name) {
      newErrors.name = "Name is required";
    }
    if (!updateMedicineData.type) {
      newErrors.type = "Type is required";
    }

    if (!updateMedicineData.description) {
      newErrors.description = "Description is required";
    }

    if (!updateMedicineData.quantity) {
      newErrors.quantity = "Quantity is required";
    } else if (!/^\d+$/.test(updateMedicineData.quantity)) {
      newErrors.quantity = "Quantity must be a number";
    }

    if (!updateMedicineData.actual_price) {
      newErrors.actual_price = "Actual Price is required";
    } else if (!/^\d+(\.\d{1,2})?$/.test(updateMedicineData.actual_price)) {
      newErrors.actual_price = "Invalid Actual Price";
    }

    if (!updateMedicineData.selling_price) {
      newErrors.selling_price = "Selling Price is required";
    } else if (!/^\d+(\.\d{1,2})?$/.test(updateMedicineData.selling_price)) {
      newErrors.selling_price = "Invalid Selling Price";
    }

    if (!updateMedicineData.generics) {
      newErrors.generics = "generics is required";
    }

    if (!updateMedicineData.company) {
      newErrors.company = "Company is required";
    }

    setErrors(newErrors);

    // Check if there are any errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    // Validate the form fields
    const isFormValid = validateFields();

    // Check if any validation errors exist
    if (!isFormValid) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `http://localhost:4000/api/medicine/updateMedicine/${selectedMedicineData._id}`,
        updateMedicineData,
        config
      );
      if (response.status === 200) {
        console.log("Medicine updated successfully");
        handleCloseUpdate();
        // Reset the form
        setUpdateMedicineData(initialUpdateMedicineData);
        setErrors({});
      } else {
        console.error("Failed to update medicine");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <Modal
        open={isOpenForUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginLeft: "20px" }}
          >
            Update Medicine Information
          </Typography>
          <div style={contentStyle}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={updateMedicineData?.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Type"
              variant="outlined"
              fullWidth
              name="type"
              value={updateMedicineData?.type}
              onChange={handleInputChange}
              error={!!errors.type}
              helperText={errors.type}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              name="description"
              value={updateMedicineData.description}
              onChange={handleInputChange}
              error={!!errors.description}
              helperText={errors.description}
            />
            <TextField
              label="Quantity"
              variant="outlined"
              fullWidth
              name="quantity"
              value={updateMedicineData.quantity}
              onChange={handleInputChange}
              error={!!errors.quantity}
              helperText={errors.quantity}
            />
            <TextField
              label="Actual Price"
              variant="outlined"
              fullWidth
              name="actual_price"
              value={updateMedicineData.actual_price}
              onChange={handleInputChange}
              error={!!errors.actual_price}
              helperText={errors.actual_price}
            />

            <TextField
              label="Selling Price"
              variant="outlined"
              fullWidth
              name="selling_price"
              value={updateMedicineData.selling_price}
              onChange={handleInputChange}
              error={!!errors.selling_price}
              helperText={errors.selling_price}
            />
            <TextField
              label="generics"
              variant="outlined"
              fullWidth
              name="generics"
              value={updateMedicineData.generics}
              onChange={handleInputChange}
              error={!!errors.generics}
              helperText={errors.generics}
            />
            <TextField
              label="Company"
              variant="outlined"
              fullWidth
              name="company"
              value={updateMedicineData.company}
              onChange={handleInputChange}
              error={!!errors.company}
              helperText={errors.company}
            />
            <Grid container justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                style={{ width: "50%" }}
                onClick={handleSubmit}
              >
                Update
              </Button>
            </Grid>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateMedicineModal;
