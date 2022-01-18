import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Preloader() {
    return (
        <Box sx={{ position:"absolute", left:'50%', top:'45%' }}>
            <CircularProgress />
        </Box>
    );
}
