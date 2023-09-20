import { useState } from 'react';
import AddMedicineModal from './addMedicineModal';
import MedicineTable from './medicineTable';

// import BasicModal from './addMedicineModal'
console.log("AddMedicineModal")
const Medicines = () => {
  const [addValue, setAddValue] = useState([]);
  return (
    <>
    <AddMedicineModal setAddValue={setAddValue}/>
       {/* <BasicModal/> */}
       <h1>Product List</h1>
      <MedicineTable addValue={addValue}/>
    </>
  )
}

export default Medicines