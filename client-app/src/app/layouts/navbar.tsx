import {
    AppBar,
    Button,
    Divider,
    Toolbar,
    Typography,
} from '@mui/material';

export default function NavBar() {
    return (
        <AppBar component="nav" position="sticky" sx={{ bgcolor: 'info.main' }}>
            <Toolbar sx={{
                gap: '20px',
            }}>
                <Typography>FAKE SOCIALS</Typography>
                <Divider orientation="vertical" flexItem />
                <Button disableRipple href='/' disableElevation={true} variant="contained" sx={{ color: '#fff' }}>Home Page</Button>
                <Button disableRipple href='/activities' disableElevation={true} variant="contained" sx={{ color: '#fff' }}>Activities</Button>
                <Button disableRipple href='/create-activity' disableElevation={true} variant="contained" sx={{ color: '#fff' }}>Create Activity</Button>
            </Toolbar>
        </AppBar>
    );
}