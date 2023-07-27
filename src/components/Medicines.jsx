import AddMedicineModal from './addMedicineModal';
import MedicineTable from './medicineTable';
// import BasicModal from './addMedicineModal'
console.log("AddMedicineModal")
const Medicines = () => {
  return (
    <>
    <AddMedicineModal/>
       {/* <BasicModal/> */}
       <h1>Medicine List</h1>
      <MedicineTable />
    </>
  )
}

export default Medicines