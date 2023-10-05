import Typography from '@mui/material/Typography';
import Sidebar from './SideBarPage';
import Box from '@mui/material/Box';
const Home = () => {
  return (
    <>
    <Box sx={{ display: 'flex' }}>
    <Sidebar/>
    <Typography>Hi, This is the homepage</Typography> 
    </Box>
      
    </>
  )
}

export default Home