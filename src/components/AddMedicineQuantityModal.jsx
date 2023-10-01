import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useState } from "react";


const AddMedicineQuantityModal = ({
  isModalOpen,
  handleCloseModal,
  selectedMedicineId,
  setAddUpdateQuantity,
  setMedicines,
  medicines
}) => {

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

  // console.log("Selected Medicine Id is:", selectedMedicineId);

  const [newQuantity, setNewQuantity] = useState("");
  const [errors, setErrors] = useState({});
  // setAddUpdateQuantity({item: selectedMedicineId});

  const validateForm = () => {
    const newErrors = {};
    if(!newQuantity){
      newErrors.add_quantities = 'Quantity number is required';
    } else if(isNaN(newQuantity)){
      newErrors.add_quantities = "Quantity must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }; 

  const handleAddQuantity = async (e) => {
    let tempMedicine = medicines;
    tempMedicine[selectedMedicineId.index].quantity = parseInt(tempMedicine[selectedMedicineId.index].quantity) + parseInt(newQuantity)
    console.log("Temp Medicine are:", tempMedicine)
    setMedicines(tempMedicine)
    e.preventDefault();

    if(validateForm()){
      try {
        const token = localStorage.getItem("token");
  
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = axios.put(
          `http://localhost:4000/api/medicine/updateQuantity/${selectedMedicineId?.medicineData._id}`,
          {
            add_quantities: parseInt(newQuantity),
          },
          config
        );
        setNewQuantity("");
        handleCloseModal();
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage(error.response.data);
      }
    }
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
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
            Add quantity
          </Typography>
          <div
            style={{
              margin: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Typography variant="h5" gutterBottom>
            Current Quantity: {selectedMedicineId?.medicineData?.quantity}
            </Typography>
            <TextField
              label="Add New Quantity"
              variant="outlined"
              fullWidth
              type="number"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
            />
            {errors.add_quantities && <span className="error">{errors.add_quantities}</span>}
            <Grid container justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                style={{ width: "50%" }}
                onClick={handleAddQuantity}
              >
                Add Quantity
              </Button>
            </Grid>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddMedicineQuantityModal;
