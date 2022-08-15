import {
    Typography
} from '@mui/material';
import { Demos } from '../../components/Settings';

import {
    Box
} from '@mui/material';

export default function AppSettings() {

    return (
        <Box py={4} sx={{ width: '100%', height: '100%' }}>
            <Typography variant='h1'>Paramètres de l'application</Typography>
            <Demos />
        </Box>
    )
};