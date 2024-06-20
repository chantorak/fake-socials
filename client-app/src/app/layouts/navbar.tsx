import * as React from 'react';
import {
    AppBar,
    Button,
    Divider,
    Toolbar,
    Typography,
} from '@mui/material';

interface Props {
    openForm: () => void;
}

const navItems = ['Create Activtiy'];

export default function NavBar({ openForm }: Props) {
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const [mobileOpen, setMobileOpen] = React.useState(false);

    return (
        <AppBar component="nav" position="sticky" sx={{ bgcolor: 'info.main' }}>
            <Toolbar sx={{
                gap: '20px',
            }}>
                <Typography>FAKE SOCIALS</Typography>
                <Divider orientation="vertical" flexItem />
                {navItems.map((item) => (
                    <Button disableRipple onClick={openForm} disableElevation={true} variant="contained" key={item} sx={{ color: '#fff' }}>
                        {item}
                    </Button>
                ))}
            </Toolbar>
        </AppBar>
    );
}