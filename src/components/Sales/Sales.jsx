import React, { useState, useEffect } from "react";
import "../../styles/sales/sales.css";
import { Box } from "@mui/material";
import Sidebar from "../SideBarPage";
import axios from "axios";
import Select from "react-select";

const Sales = () => {
  const [product, setProduct] = useState({
    medicine: "",
    quantity: 0,
    price: 0,
  });

  const [medicineName, setMedicineName] = useState([]);
  // console.log("Medicine Name and types are:",medicineName)

  const [products, setProducts] = useState({});

  useEffect(() => {
    const fetchMedicineName = async () => {
      try {
        const token = localStorage.getItem("token");
        // console.log("Token", token);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "http://localhost:4000/api/medicine/get-medicine-name-and-category",
          config
        );
        setMedicineName(response.data);
      } catch (error) {
        console.error("Error fetching medicine data:", error);
      }
    };

    fetchMedicineName();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleAddProduct = () => {
    if (product.medicine && product.quantity > 0 && product.price > 0) {
      setProducts([...products, product]);
      setProduct({
        medicine: "",
        quantity: 0,
        price: 0,
      });
    }
  };

  // For the searchable and scrolling
  // Define an array for options
  const medicineOptions = medicineName.map((medicine, index) => ({
    value: medicine.name,
    label: medicine.name,
  }));

  // State to track selected medicine
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const handleMedicineChange = (selectedOption) => {
    setSelectedMedicine(selectedOption);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <div className="sales-container">
          <div className="sales-container__addMedicine">
            <header>Add Product</header>
            <form action="#" className="form">
              <div className="input-box">
                <label>Medicine:</label>
                <Select
                  className="custom-select"
                  value={selectedMedicine}
                  onChange={handleMedicineChange}
                  options={medicineOptions}
                  placeholder="Select a medicine"
                />
              </div>

              <div className="input-box">
                <label>Quantity:</label>
                <input
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-box">
                <label>Total Price:</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleInputChange}
                />
              </div>
              <button onClick={handleAddProduct}>Add</button>
            </form>
          </div>

          <div className="sales-container__showMedicine">
            <h2>Added Products</h2>
            <table>
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {/* {products.map((product, index) => (
              <tr key={index}>
                <td>{product.medicine}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
              </tr>
            ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Sales;
