
"use client"

import * as React from 'react';

import { useRouter } from 'next/navigation';



import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';


// mock
import { nav } from '../../mocks/nav'







export default function FixedBottomNavigation({children}) {
    const router = useRouter();

    const [value, setValue] = React.useState(null);
    const ref = React.useRef(null);



    return (
        <Box sx={{ pb: 7 }} ref={ref}>
            <CssBaseline />
            <List>
                {children}
            </List>
            <Paper sx={{
                position: 'fixed', bottom: 0, left: 0, right: 0,
            }} elevation={3}>
                <BottomNavigation
                    sx={{ backgroundColor: 'white', }}
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                   
                    {nav.map((item) => (

                        <BottomNavigationAction label={item.title} icon={item.icon} onClick={() => { router.push(item.path)}} />
                    ))}

                </BottomNavigation>
            </Paper>
        </Box>
    );
}

