import * as React from "react";
import styled from "@emotion/styled";
import { Power } from "react-feather";
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogoutAPI } from '../../services/AuthServices';
import { logout } from '../../store/reducers/Auth';

import {
    Tooltip,
    Menu,
    MenuItem,
    IconButton as MuiIconButton,
} from "@mui/material";

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

function NavbarUserDropdown() {
    const [anchorMenu, setAnchorMenu] = React.useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const toggleMenu = (event) => {
        setAnchorMenu(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorMenu(null);
    };

    const handleProfile = () => {
        navigate('/profile', { from: location, replace: false });
    };

    const handleLogout = async () => {
        try {
            await LogoutAPI();
            dispatch(logout());
        }
        catch (err) { }
    }

    return (
        <React.Fragment>
            <Tooltip title="Compte">
                <IconButton
                    aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={toggleMenu}
                    color="inherit"
                    size="large"
                >
                    <Power />
                </IconButton>
            </Tooltip>
            <Menu
                id="menu-appbar"
                anchorEl={anchorMenu}
                open={Boolean(anchorMenu)}
                onClose={closeMenu}
            >
                <MenuItem onClick={handleProfile}>Profil</MenuItem>
                <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
            </Menu>
        </React.Fragment>
    );
}

export default NavbarUserDropdown;
