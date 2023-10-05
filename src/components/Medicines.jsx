import { useState } from 'react';
import AddMedicineModal from './addMedicineModal';
import MedicineTable from './medicineTable';
import Sidebar from "./SideBarPage"
import Box from '@mui/material/Box';

const Medicines = () => {
  const [addValue, setAddValue] = useState([]);
  return (
    <>
     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px',  gap: '30px'}}>
     <h1>Product List</h1>
     <Box sx={{ display: 'flex'}}>
     <Sidebar/>
     
      <AddMedicineModal setAddValue={setAddValue}/>
      <MedicineTable addValue={addValue}/>
    
     </Box>
      
     </Box>
    </>
  )
}

export default Medicines