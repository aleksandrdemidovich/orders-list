import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {useLocation, useNavigate} from "react-router-dom";
import {PATH} from "./AppRoutes";
import {Badge} from "@mui/material";
import {useSelector} from "react-redux";
import {AppStateType} from "../redux/store";
import {ItemType} from "../redux/cart-reducer";

const pages = [{pageName: 'Products', pageUrl: PATH.PRODUCTS},
    {pageName: 'Cart', pageUrl: PATH.CART}];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {

    const cartItems = useSelector<AppStateType, Array<ItemType>>(state => state.cart.items)
    const totalCartPrice = useSelector<AppStateType, number>(state => state.cart.totalCartPrice)


    const navigate = useNavigate();
    const location = useLocation();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
                    >
                        iMarket
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.pageName} onClick={() => navigate(page.pageUrl)}>
                                    <Typography textAlign="center">{page.pageName}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page.pageName}
                                onClick={() => navigate(page.pageUrl)}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {page.pageName}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{flexGrow: 0}} display={"flex"} alignItems={"center"} flexDirection={"row"}>
                        {location.pathname === PATH.PRODUCTS && totalCartPrice !== 0 && cartItems.length >= 1 &&
                        <Typography variant={"subtitle2"} style={{marginRight: '15px'}}>
                            Total price: {totalCartPrice}$
                            </Typography>}
                        <Tooltip title="Open cart">
                            <IconButton sx={{p: 0, marginRight: '10px'}} onClick={() => navigate(PATH.CART)}>
                                <Badge badgeContent={cartItems.length} color="secondary">
                                    <ShoppingCartOutlinedIcon fontSize={"large"}/>
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
