import { useState } from 'react';
import { TextField, FormControl, InputLabel, InputAdornment, OutlinedInput, Button } from '@mui/material';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    quantity: 0,
    actual_price: 0,
    selling_price: 0,
    generics: '',
    company: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform any logic with the submitted form data
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
        margin="normal"
      />

      <TextField
        label="Type"
        name="type"
        value={formData.type}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
        margin="normal"
      />

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
        margin="normal"
      />

      <FormControl fullWidth variant="outlined" margin="normal" required>
        <InputLabel htmlFor="quantity">Quantity</InputLabel>
        <OutlinedInput
          id="quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          startAdornment={<InputAdornment position="start">Qty</InputAdornment>}
          label="Quantity"
        />
      </FormControl>

      <FormControl fullWidth variant="outlined" margin="normal" required>
        <InputLabel htmlFor="actual_price">Actual Price</InputLabel>
        <OutlinedInput
          id="actual_price"
          name="actual_price"
          type="number"
          value={formData.actual_price}
          onChange={handleChange}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Actual Price"
        />
      </FormControl>

      <FormControl fullWidth variant="outlined" margin="normal" required>
        <InputLabel htmlFor="selling_price">Selling Price</InputLabel>
        <OutlinedInput
          id="selling_price"
          name="selling_price"
          type="number"
          value={formData.selling_price}
          onChange={handleChange}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Selling Price"
        />
      </FormControl>

      <TextField
        label="Generics"
        name="generics"
        value={formData.generics}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
        margin="normal"
      />

      <TextField
        label="Company"
        name="company"
        value={formData.company}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
        margin="normal"
      />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default ProductForm;
