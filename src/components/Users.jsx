import Sidebar from "./SideBarPage"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Users = () => {
  return (
    <Box sx={{ display: 'flex' }}>
    <Sidebar/>
    <Typography>Employees</Typography> 
    </Box>
  )
}

export default Users