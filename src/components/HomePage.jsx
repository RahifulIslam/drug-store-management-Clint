// import NavigationBar from './NavigationBar'; // Assuming the code you provided is in the NavigationBar.js file
// import NavigationBar from './NavigationBar';
import Sidebar from './SideBarPage';
import { Typography } from '@mui/material';

const HomePage = () => {
  // Add any other content or features you want to include on the homepage

  return (
    <>
        <Sidebar/>
        <Typography>Home page</Typography>
      {/* <NavigationBar /> */}
      {/* Add other content here */}
    </>
  );
};

export default HomePage;
