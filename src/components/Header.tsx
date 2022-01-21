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
import {Avatar, Badge} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/store";
import {ItemType} from "../redux/cart-reducer";
import {logout} from "../redux/auth-reducer";

const pages = [{pageName: 'Products', pageUrl: PATH.PRODUCTS},
    {pageName: 'Cart', pageUrl: PATH.CART},
    {pageName: 'Add new product', pageUrl: PATH.CREATE_NEW_PRODUCT},];
const settings = ['Profile', 'Settings', 'Logout'];

const ResponsiveAppBar = () => {

    const cartItems = useSelector<AppStateType, Array<ItemType>>(state => state.cart.items)
    const totalCartPrice = useSelector<AppStateType, number>(state => state.cart.totalCartPrice)
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const userPhoto = useSelector<AppStateType, string | null | undefined >(state => state.profile.profile?.photoURL)
    const userEmail = useSelector<AppStateType, string>(state => state.auth.email)


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = (itemName: string) => {
        if (itemName === 'Logout') {
            dispatch(logout())
        } else if (itemName === 'Profile') {
            navigate(PATH.PROFILE)
        } else if (itemName === 'Settings') {
            navigate(PATH.SETTINGS)
        }
        setAnchorElNav(null);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters style={{justifyContent:'space-between'}}>
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
                        {isLoggedIn && <Menu
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
                        </Menu>}
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
                    >
                        iMarket
                    </Typography>
                    {isLoggedIn ? <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page.pageName}
                                onClick={() => navigate(page.pageUrl)}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {page.pageName}
                            </Button>
                        ))}
                    </Box> : <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            <Button
                                onClick={() => navigate(PATH.PRODUCTS)}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                Products
                            </Button>

                    </Box>}

                    {isLoggedIn ? <Box sx={{flexGrow: 0}} display={"flex"} alignItems={"center"} flexDirection={"row"}>
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
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt={userEmail} src={userPhoto !== null ? userPhoto : 'I'}/>
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
                                    <MenuItem key={setting} onClick={() => handleCloseNavMenu(setting)}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        : <Box sx={{flexGrow: 0}} display={"flex"} alignItems={"center"} flexDirection={"row"}>
                            <Button variant={"text"} color={"inherit"} onClick={() => navigate(PATH.LOGIN)}>Sign
                                In</Button>
                        </Box>}

                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
