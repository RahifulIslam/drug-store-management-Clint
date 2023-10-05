import React, { useState, useContext } from "react";
import "../../styles/sales/sales.css";
import { Box } from "@mui/material";
import Sidebar from "../SideBarPage";
const Sales = () => {
  const [product, setProduct] = useState({
    medicine: "",
    quantity: 0,
    price: 0,
  });

  const [products, setProducts] = useState({});

  const medicines = ["Medicine A", "Medicine B", "Medicine C"];

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

  return (
    <>
    <Box sx={{display: 'flex'}}>
      <Sidebar/>
    <div className="sales-container">
      <div className="sales-container__addMedicine">
        <header>Add Product</header>
        <form action="#" className="form">
          <div className="input-box">
            <label>Medicine:</label>
            <select name="medicine" value={product.medicine}>
              <option value="">Select a medicine</option>
              {medicines.map((medicine, index) => (
                <option key={index} value={medicine}>
                  {medicine}
                </option>
              ))}
            </select>
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