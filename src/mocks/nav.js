import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';

export const nav = [
    {
        title:"Home",
        icon:<DashboardIcon/>,
        path:'/odigos/dashboard/home'
    },
    {
        title:"Analyse",
        icon:<TroubleshootOutlinedIcon/>,
        path:'/odigos/dashboard/sessions'
    },
    {
        title:"Profile",
        icon:<PersonOutlineOutlinedIcon/>,
        path:'/odigos/dashboard/profile'
    },
    

]