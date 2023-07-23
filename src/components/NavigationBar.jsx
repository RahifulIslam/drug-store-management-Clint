import { useState } from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab } from '@mui/material';

const NavigationBar = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Your App Name
        </Typography>
        <Tabs value={value} onChange={handleChange} aria-label="Navigation tabs">
          <Tab label="Users" />
          <Tab label="Medicines" />
          <Tab label="Sales Information" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
