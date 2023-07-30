import { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const MedicineModal = ({ isOpen, onClose }) => {

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        minWidth: 300,
        maxWidth: 400,
      }}>
       <Box>
        <Button>Add medicine quantity</Button>
      </Box>
      <Box>
        <Button>Update other data</Button>
      </Box>
      </Box>
    </Modal>
  );
};

export default MedicineModal;
