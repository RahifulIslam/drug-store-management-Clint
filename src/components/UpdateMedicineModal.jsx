import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const UpdateMedicineModal = ({ isOpenForUpdate, handleCloseUpdate }) => {
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

  const contentStyle = {
    margin: "20px",
    maxHeight: "400px", // Adjust the maximum height as needed
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
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
              // value={newQuantity}
              // onChange={(e) => setNewQuantity(e.target.value)}
            />
            <TextField
              label="Type"
              variant="outlined"
              fullWidth
              // value={newQuantity}
              // onChange={(e) => setNewQuantity(e.target.value)}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              // value={newQuantity}
              // onChange={(e) => setNewQuantity(e.target.value)}
            />
             <TextField
              label="Quantity"
              variant="outlined"
              fullWidth
              // value={newQuantity}
              // onChange={(e) => setNewQuantity(e.target.value)}
            />
             <TextField
              label="Actual Price"
              variant="outlined"
              fullWidth
              // value={newQuantity}
              // onChange={(e) => setNewQuantity(e.target.value)}
            />

            <TextField
              label="Selling Price"
              variant="outlined"
              fullWidth
              // value={newQuantity}
              // onChange={(e) => setNewQuantity(e.target.value)}
            />
             <TextField
              label="Disease"
              variant="outlined"
              fullWidth
              // value={newQuantity}
              // onChange={(e) => setNewQuantity(e.target.value)}
            />
             <TextField
              label="Company"
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
                Update
              </Button>
            </Grid>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default UpdateMedicineModal