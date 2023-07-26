import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, FormControl, InputLabel, InputAdornment, OutlinedInput, Button, Grid  } from '@mui/material';
import axios from 'axios'; // Import Axios

const ProductForm = () => {
  const initialValues = {
    name: '',
    type: '',
    description: '',
    quantity: 0,
    actual_price: 0,
    selling_price: 0,
    generics: '',
    company: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    type: Yup.string().required('Type is required'),
    description: Yup.string().required('Description is required'),
    quantity: Yup.number()
      .typeError('Quantity must be a number')
      .positive('Quantity must be a positive number')
      .required('Quantity is required'),
    actual_price: Yup.number()
      .typeError('Actual Price must be a number')
      .positive('Actual Price must be a positive number')
      .required('Actual Price is required'),
    selling_price: Yup.number()
      .typeError('Selling Price must be a number')
      .positive('Selling Price must be a positive number')
      .required('Selling Price is required'),
    generics: Yup.string().required('Generics is required'),
    company: Yup.string().required('Company is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem("token");
      // Include the token in the request headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post('http://localhost:4000/api/medicine/addmedicine', values, config);
      console.log('Response:', response.data);
      // You can handle the response here or perform any other actions after successful submission
      resetForm(); // Reset form fields
      // handleClose();
    } catch (error) {
      console.error('Error:', error);
      // Handle the error if the API request fails
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <Form>
          <Grid container spacing={2}>
            {/* Name */}
            <Grid item xs={6}>
              <Field
                as={TextField}
                label="Name"
                name="name"
                fullWidth
                required
                variant="outlined"
                margin="normal"
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
            </Grid>

            {/* Type */}
            <Grid item xs={6}>
              <Field
                as={TextField}
                label="Type"
                name="type"
                fullWidth
                required
                variant="outlined"
                margin="normal"
                error={touched.type && !!errors.type}
                helperText={touched.type && errors.type}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={6}>
              <Field
                as={TextField}
                label="Description"
                name="description"
                fullWidth
                required
                variant="outlined"
                margin="normal"
                error={touched.description && !!errors.description}
                helperText={touched.description && errors.description}
              />
            </Grid>

            {/* Repeat the same pattern for other fields */}
            {/* Quantity */}
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined" margin="normal" required>
                <InputLabel htmlFor="quantity">Quantity</InputLabel>
                <Field
                  as={OutlinedInput}
                  id="quantity"
                  label="Quantity"
                  name="quantity"
                  type="number"
                  startAdornment={<InputAdornment position="start">Qty</InputAdornment>}
                  error={touched.quantity && !!errors.quantity}
                  inputProps={{ inputMode: 'numeric' }}
                />
                {touched.quantity && errors.quantity && <span style={{ color: 'red' }}>{errors.quantity}</span>}
              </FormControl>
            </Grid>

            {/* Actual Price */}
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined" margin="normal" required>
                <InputLabel htmlFor="actual_price">Actual Price</InputLabel>
                <Field
                  as={OutlinedInput}
                  id="actual_price"
                  label="Actual Price"
                  name="actual_price"
                  type="number"
                  startAdornment={<InputAdornment position="start">Tk</InputAdornment>}
                  error={touched.actual_price && !!errors.actual_price}
                  inputProps={{ inputMode: 'numeric' }}
                />
                {touched.actual_price && errors.actual_price && <span style={{ color: 'red' }}>{errors.actual_price}</span>}
              </FormControl>
            </Grid>

            {/* Selling Price */}
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined" margin="normal" required>
                <InputLabel htmlFor="selling_price">Selling Price</InputLabel>
                <Field
                  as={OutlinedInput}
                  id="selling_price"
                  label="Selling Price"
                  name="selling_price"
                  type="number"
                  startAdornment={<InputAdornment position="start">Tk</InputAdornment>}
                  error={touched.selling_price && !!errors.selling_price}
                  inputProps={{ inputMode: 'numeric' }}
                />
                {touched.selling_price && errors.selling_price && <span style={{ color: 'red' }}>{errors.selling_price}</span>}
              </FormControl>
            </Grid>

            {/* Generics */}
            <Grid item xs={6}>
              <Field
                as={TextField}
                label="Generics"
                name="generics"
                fullWidth
                required
                variant="outlined"
                margin="normal"
                error={touched.generics && !!errors.generics}
                helperText={touched.generics && errors.generics}
              />
            </Grid>

            {/* Company Name */}
            <Grid item xs={6}>
              <Field
                as={TextField}
                label="Company"
                name="company"
                fullWidth
                required
                variant="outlined"
                margin="normal"
                error={touched.company && !!errors.company}
                helperText={touched.company && errors.company}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
