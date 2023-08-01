import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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

const MedicineTable = () => {
  const [medicines, setMedicines] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State to track the anchor element for the menu
  const [anchorEl, setAnchorEl] = useState(null);

  // Function to handle opening the menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle closing the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Function to handle the action when a menu item is clicked (you can implement the specific logic here)
  const handleMenuItemClick = (action) => {
    // Add your logic here based on the action parameter
    console.log("Clicked:", action);

    // Close the menu
    handleMenuClose();
  };


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

    // const interval = setInterval(fetchMedicines, 5000);
    // return () => clearInterval(interval);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
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
            <TableBody>
              {medicines
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((medicine) => (
                  <TableRow key={medicine._id}>
                    {columns.map((column) => {
                      if (column.id === "action") {
                        return (
                          <TableCell key={column.id}>
                            <IconButton onClick={handleMenuOpen}>
                              <MoreVertIcon />
                            </IconButton>
                            {/* Menu modal */}
                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              onClose={handleMenuClose}
                            >
                              {/* Menu items */}
                              <MenuItem 
                                onClick={() =>
                                  handleMenuItemClick("addQuantity")
                                }
                              >
                                Add Medicine Quantity
                              </MenuItem>
                              <MenuItem
                                onClick={() =>
                                  handleMenuItemClick("updateField")
                                }
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
            </TableBody>
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
    </div>
  );
};

export default MedicineTable;
