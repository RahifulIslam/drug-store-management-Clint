import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ProductForm from './ProductForm'; // Assuming this is the file where you defined the ProductForm component

const AddMedicineModal = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" sx={{ position: "fixed", top: 50, right: 120, zIndex: 2000 }} color="primary">
        Open Modal
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: isSmallScreen ? 2 : 4, // Adjust padding for small screens
            minWidth: isSmallScreen ? '90%' : 400, // Adjust minWidth for small screens
            maxWidth: '90%', // Add a maximum width to limit size on large screens
            [theme.breakpoints.down('sm')]: {
              minWidth: '90%', // Additional styling for screens smaller than "sm" breakpoint
            },
          }}
        >
          <Typography variant="h6" component="h2"  style={{color: 'black'}}>
            Add New Product
          </Typography>
          <ProductForm  handleClose={handleClose}/>
        </Box>
      </Modal>
    </div>
  );
};

export default AddMedicineModal;


