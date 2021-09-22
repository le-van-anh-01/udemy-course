import { AppBar, Badge, Button, Toolbar, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormatPaintIcon from '@material-ui/icons/FormatPaint';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Register from '../../features/Auth/components/Register';
import Login from 'features/Auth/components/Login';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { logout } from 'features/Auth/userSlice';
import { ShoppingBasket } from '@material-ui/icons';
import { cartItemsCountSelector } from 'features/Cart/selectors';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    link: {
        color: 'white',
        textDecoration: 'none'
    }
}))

const MODE = {
    LOGIN: 'login',
    REGISTER: 'register'
}

const Header = () => {
    const dispatch = useDispatch()
    const loggedInUser = useSelector((state) => state.user.current);
    const [anchorEl, setAnchorEl] = useState(null);
    const isLoggedIn = !!loggedInUser?.id;
    console.log(loggedInUser);
    const classes = useStyles();
    const [mode, setMode] = useState(MODE.LOGIN);
    const [open, setOpen] = useState(false);
    const cartItemsCount = useSelector(cartItemsCountSelector);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleUserClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        const action = logout();
        dispatch(action);
        setAnchorEl(null);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <FormatPaintIcon className={classes.menuButton} />
                    <Typography variant="h6" className={classes.title}>
                        <Link to='/' className={classes.link}>
                            MORIEN.S
                        </Link>
                    </Typography>
                    <NavLink to='/todos' className={classes.link}>
                        <Button color="inherit">TODO</Button>
                    </NavLink>
                    <NavLink to='/album' className={classes.link}>
                        <Button color="inherit">ALbum</Button>
                    </NavLink>
                    {!isLoggedIn && (<Button color="inherit" onClick={handleClickOpen}>Login</Button>)}
                    <IconButton aria-label="show 11 new notifications" color="inherit">
                        <Badge badgeContent={cartItemsCount} color="secondary">
                            <ShoppingBasket />
                        </Badge>
                    </IconButton>
                    {isLoggedIn && (<IconButton color="inherit" onClick={handleUserClick} ><AccountCircleIcon /></IconButton>)}
                </Toolbar>
            </AppBar>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                getContentAnchorEl={null}
            >
                <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>

            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogContent>
                    {mode === MODE.REGISTER && (<>
                        <Register />
                        <Box textAlign='center'>
                            <Button color='primary' onClick={() => setMode(MODE.LOGIN)}>
                                Already have account. Login here
                            </Button>
                        </Box>
                    </>)}
                    {mode === MODE.LOGIN && (<>
                        <Login closeDialog={handleClose} />
                        <Box textAlign='center'>
                            <Button color='primary' onClick={() => setMode(MODE.REGISTER)}>
                                Don't have account. Register here.
                            </Button>
                        </Box>
                    </>)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default Header
