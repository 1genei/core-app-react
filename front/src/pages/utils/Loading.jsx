import { useState, useEffect } from 'react';

import { 
    Typography,
    CircularProgress,
    Grid
} from '@mui/material';


export default function Loading() {

    const [loadingText, setLoadingText] = useState('Loading');
    const [dotsCounter, setDotsCounter] = useState(0);

    const changeDots = () => {
        if (dotsCounter === 3) {
            setLoadingText('Loading');
            setDotsCounter(0);
        }
        else {
            setLoadingText(loadingText + '.');
            setDotsCounter(dotsCounter + 1);
        }
    }

    useEffect( () => {
        setTimeout(() => {changeDots()}, 900);
    }, [dotsCounter]);

    return (
        <Grid container direction='column' justifyContent='center' alignItems='center' py='20%' spacing={2} sx={{ display:'flex' }}>
            <Grid item justifyContent='center' alignItems='center' p={3} sx={{ display:'flex' }}>
                <Typography variant='h4'>{loadingText}</Typography>
            </Grid>
            <Grid item justifyContent='center' alignItems='center' p={3} sx={{ display:'flex' }}>
                <CircularProgress size={85} />
            </Grid>
        </Grid>
    )
};