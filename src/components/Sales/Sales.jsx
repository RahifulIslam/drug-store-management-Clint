import React, { useState, useEffect } from "react";
import "../../styles/sales/sales.css";
import { Box } from "@mui/material";
import Sidebar from "../SideBarPage";
import axios from "axios";
import Select from "react-select";

const Sales = () => {
  const [product, setProduct] = useState({
    medicine: "",
    pricePerItem: 0,
    quantity: 0,
    price: 0,
  });
  // console.log("Product are:", product)

  const [products, setProducts] = useState([]);
  console.log("Products are:", products);

  //Calculate total price from the table
  const [totalPrice, setTotalPrice] = useState(0);
  //  console.log("Total Price are:", totalPrice)

  //Calculate for the Discount price
  const [discount, setDiscount] = useState(0);
  // console.log("Discount:", discount)
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  //
  const [medicineInfo, setMedicineInfo] = useState([]);
  // console.log("Medicine Name and types are:", medicineInfo);
  // State for store selected medicine data
  const [selectedMedicineData, setSelectedMedicineData] = useState(null);
  // console.log("Selected medicine data are:", selectedMedicineData)

  // State to track selected medicine
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  useEffect(() => {
    const fetchMedicineInfo = async () => {
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
        setMedicineInfo(response.data);
      } catch (error) {
        console.error("Error fetching medicine data:", error);
      }
    };

    fetchMedicineInfo();
  }, []);

  useEffect(() => {
    if (discount > 0) {
      const discountAmount = parseFloat(discount);
      const discountPrice = (totalPrice * discountAmount) / 100;
      const totalAfterDiscount = totalPrice - discountPrice;
      setTotalAfterDiscount(totalAfterDiscount);
    } else {
      setTotalAfterDiscount(totalPrice); // No discount, so total remains the same
    }
  }, [discount, totalPrice]); // Run the effect when discount or total price changes

  const handleAddProduct = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (selectedMedicine && product.quantity > 0 && product.price > 0) {
      // Set the medicine name in the product before adding it
      const newProduct = {
        ...product,
        medicine: selectedMedicine.value, // Set the selected medicine name
      };
      // console.log("New products are:", newProduct);
      // console.log("Price of new product are:", newProduct.price)
      setProducts([...products, newProduct]);
      setProduct({
        medicine: "",
        pricePerItem: 0,
        quantity: 0,
        price: 0,
      });
      // Update the total price by adding the price of the newly added product
      setTotalPrice(totalPrice + newProduct.price);
    }
  };

  // For the searchable and scrolling
  // Define an array for options
  const medicineOptions = medicineInfo.map((medicine, index) => ({
    value: medicine.name,
    label: medicine.name,
  }));

  const handleMedicineChange = (selectedOption) => {
    // console.log("Selected Option value:", selectedOption)
    // Find the selected medicine's data from the medicineInfo array
    const selectedMedicineData = medicineInfo.find(
      (medicine) => medicine.name === selectedOption.value
    );
    console.log("Selected Medicine Data are:", selectedMedicineData);

    setSelectedMedicineData(selectedMedicineData);
    // Set the selling price in the product state
    setProduct({
      ...product,
      selectedMedicineId: selectedMedicineData._id,
      pricePerItem: selectedMedicineData.selling_price,
    });

    setSelectedMedicine(selectedOption);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "quantity" && selectedMedicineData) {
      // Calculate the total price based on the selected medicine's selling price
      const totalPrice =
        selectedMedicineData.selling_price * parseInt(value, 10);

      setProduct({
        ...product,
        [name]: value,
        price: totalPrice, // Set the calculated total price
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  const handleRemoveProduct = (index) => {
    const removedProduct = products[index];
    // console.log("Remove products are:", removedProduct)
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
    // Update the total price by subtracting the price of the removed product
    setTotalPrice(totalPrice - removedProduct.price);
  };

  const handlePaid = async () => {
    // Prepare the data to send to the API
    const saleData = {
      medicines: products, // Array of selected medicines
      total_price: totalPrice,
      discount: discount,
      total_after_discount: totalAfterDiscount,
      // Other data you may want to send, e.g., sold_by, customer, paid_price, etc.
    };
  
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      // Send a POST request to the API
      const response = await axios.post(
        "http://localhost:4000/api/sale/createSale",
        saleData,
        config
      );
  
      if (response.status === 201) {
        // Sale record saved successfully
        console.log("Sale record saved successfully.");
        // You can reset the state or perform any other action here.
      } else {
        console.error("Failed to save sale record.");
        // Handle the error, show a message, or take appropriate action.
      }
    } catch (error) {
      console.error("An error occurred while sending the POST request:", error);
      // Handle the error, show a message, or take appropriate action.
    }
  };
  
  // const calculateTotalAfterDiscount = ()=> {
  //   const total = totalPrice;
  //   const discountAmount = parseFloat(discount);
  //   const discountPrice = (total * discountAmount)/100;
  //   const totalAfterDiscount = total - discountPrice;
  //   setTotalAfterDiscount(totalAfterDiscount);
  // }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <div className="sales-container">
          <div className="sales-container__addMedicine">
            <header>Add Product</header>
            <form className="form">
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
                <label>Price per item:</label>
                <input
                  type="number"
                  name="pricePerItem"
                  value={product.pricePerItem}
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

          <div className="sales-container__dataAddedTable">
            <section className="table__header">
              <h2>Added Products</h2>
            </section>
            <section className="table__body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Medicine</th>
                    <th>Price per item</th>
                    <th>Quantity</th>
                    <th>Total price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.medicine}</td>
                      <td>{product.pricePerItem}</td>
                      <td>{product.quantity}</td>
                      <td>{product.price}</td>
                      <td>
                        <button
                          className="remove-button"
                          onClick={() => handleRemoveProduct(index)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
            <section className="price-calculate">
              <div className="total-price">
                <p className="total-price-title">Total Price:</p>
                <p className="price-value">{totalPrice}</p>
              </div>
              <div className="discount">
                <p className="discount-amount">Discount(%):</p>
                <input
                  type="number"
                  className="discount-box"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
                {/* <button onClick={calculateTotalAfterDiscount}>Apply Discount</button> */}
              </div>
              <div className="discount-price">
                <p className="discount-price-title">Total after Discount:</p>
                <p className="discount-price-value">{totalAfterDiscount}</p>
              </div>
              <button className="paid-button" onClick={handlePaid}>
                Paid
              </button>
            </section>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Sales;
