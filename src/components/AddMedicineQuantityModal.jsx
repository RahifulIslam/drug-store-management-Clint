import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const AddMedicineQuantityModal = ({ isModalOpen, handleCloseModal }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
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
            <TextField
              label="Add New Quantity"
              variant="outlined"
              fullWidth
              // value={newQuantity}
              // onChange={(e) => setNewQuantity(e.target.value)}
            />
            <Grid container justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                style={{ width: "50%" }}
                // onClick={handleAddQuantity}
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
