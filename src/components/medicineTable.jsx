import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddMedicineQuantityModal from "./AddMedicineQuantityModal";
import UpdateMedicineModal from "./UpdateMedicineModal";


import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import axios from "axios";

const columns = [
  { id: "name", label: "Name" },
  { id: "type", label: "Type" },
  { id: "description", label: "Description" },
  { id: "quantity", label: "Quantity" },
  { id: "actual_price", label: "Actual Price" },
  { id: "selling_price", label: "Selling Price" },
  { id: "generics", label: "Disease" },
  { id: "company", label: "Company" },
  { id: "action", label: "Action" },
];

const MedicineTable = ({addValue}) => {
  const [medicines, setMedicines] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // add update quantity in the medicine table
  const [addUpdateQuantity, setAddUpdateQuantity] = useState({});
  console.log("Updated quantity is:", addUpdateQuantity)
  // add update data in the medicine table
  const [addUpdateData, setAddUpdateData] = useState({});
  // console.log("Updated data is:", addUpdateData)

  // State to track the anchor element for the menu
  const [anchorEl, setAnchorEl] = useState(null);

  // Function to handle opening the menu
  const handleMenuOpen = (event, medicine, index) => {
    setAnchorEl({state: event.currentTarget,medicineData: medicine, index: index});
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(()=>{
    setMedicines([...medicines, addValue])
  },[addValue])

  useEffect(()=>{
    setMedicines([...medicines, addUpdateQuantity])
  }, [addUpdateQuantity])

  useEffect(()=>{
    setMedicines([...medicines, addUpdateData])
  }, [addUpdateData])

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token", token);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "http://localhost:4000/api/medicine/getallmedicine",
          config
        );
        setMedicines(response.data);
      } catch (error) {
        console.error("Error fetching medicine data:", error);
      }
    };

    fetchMedicines();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedicineId, setSelectedMedicineId] = useState({});

  const handleAddQuantityClick = (medicineData) => {
    console.log("Medicine data are:", medicineData)
    setSelectedMedicineId(medicineData);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [isOpenForUpdate, setIsOpenForUpdate] = useState(false);
  const [selectedMedicineData, setSelectedMedicineData] = useState({});

  const handleUpdateClick = (medicineData) => {
    setSelectedMedicineData(medicineData);
    setIsOpenForUpdate(true);
  };
  const handleCloseUpdate = () => {
    setIsOpenForUpdate(false);
  };

  return (
    <div className="medicine-table">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            { medicines?.length>0 && (<TableBody>
              {medicines
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((medicine, index) => (
                  <TableRow key={medicine._id}>
                    {columns.map((column) => {
                      if (column.id === "action") {
                        return (
                          <TableCell key={column.id}>
                            <IconButton onClick={(event)=>handleMenuOpen(event, medicine, index)}>
                              <MoreVertIcon />
                            </IconButton>
    
                            <Menu
                              anchorEl={anchorEl?.state}
                              open={Boolean(anchorEl?.state)}
                              onClose={handleMenuClose}
                            >
                              <MenuItem
                                onClick={() =>{
                                  handleAddQuantityClick(anchorEl);
                                  handleMenuClose();
                                }}
                              >
                                Add Medicine Quantity 
                              </MenuItem>

                              <MenuItem onClick={()=>{
                                handleUpdateClick(anchorEl?.medicineData);
                                handleMenuClose();
                              }}
                              >
                                Update the Medicine
                              </MenuItem>
                            </Menu>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={column.id}>
                          {medicine[column.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>)} 
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={medicines.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <AddMedicineQuantityModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        selectedMedicineId={selectedMedicineId}
        setAddUpdateQuantity={setAddUpdateQuantity}
        setMedicines={setMedicines}
        medicines={medicines}
      />
      <UpdateMedicineModal
        isOpenForUpdate={isOpenForUpdate}
        handleCloseUpdate={handleCloseUpdate}
        selectedMedicineData={selectedMedicineData}
        setAddUpdateData={setAddUpdateData}
      />
    </div>
  );
};

export default MedicineTable;
