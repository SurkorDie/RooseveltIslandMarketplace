import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './cartHelpers';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900', textDecoration: 'none' };
  } else {
    return { color: '#ffffff', textDecoration: 'none' };
  }
};


/* Material-UI 's useStyles hook with default theme
Define styles for the component for the NavBar
*/

const useStyles = makeStyles((theme) => ({
  flexGrowOne: {
    flexGrow: 1,
  },
  brandIconButton: {
    marginRight: theme.spacing(1),
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

const MaterialAppBar = ({ history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );


  return (
    <div>
      <AppBar position='fixed' style={{ backgroundColor: '#DC2903' }}>
        <Toolbar>
          <a href='/' style={{ color: '#ffffff' }}>
            <IconButton
              className={classes.brandIconButton}
              color='inherit'
            >
              <img src="https://pbs.twimg.com/profile_images/564511585121468416/NhpnMBbA_400x400.jpeg" alt="Brand Icon" style={{ width: 30, height: 30 }} />
            </IconButton>
          </a>
          <a href='/' style={{ color: '#ffffff', textDecoration: 'none' }}>
            <Typography variant='h6' noWrap={true}>
              Roosevelt Island Marketplace
            </Typography>
          </a>
          
          {/* Add a spacing here for separating the brand part and the right navBar buttons */}
          <div className={classes.flexGrowOne}></div>

          <div className={classes.sectionDesktop}>
            <Link style={isActive(history, '/')} to='/'>
              <IconButton aria-label='Home' color='inherit'>
                <HomeIcon />
                <Typography noWrap = {true}>Home</Typography>
              </IconButton>
            </Link>

            <Link style={isActive(history, '/cart')} to='/cart'>
              <IconButton aria-label='Cart' color='inherit'>
                <Badge badgeContent={itemTotal()} color='secondary'>
                  <ShoppingCartIcon />
                </Badge>
                <Typography noWrap = {true}>Cart</Typography>
              </IconButton>
            </Link>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <Link
                style={isActive(history, '/user/dashboard')}
                to='/user/dashboard'
              >
                <IconButton aria-label='Dashboard' color='inherit'>
                  <DashboardIcon />
                  <Typography noWrap = {true}>Dashboard</Typography>
                </IconButton>
              </Link>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <Link
                style={isActive(history, '/admin/dashboard')}
                to='/admin/dashboard'
              >
                <IconButton aria-label='Dashboard' color='inherit'>
                  <DashboardIcon />
                  <Typography noWrap = {true}>Dashboard</Typography>
                </IconButton>
              </Link>
            )}

            {!isAuthenticated() && (
              <Fragment>
                <Link style={isActive(history, '/signin')} to='/signin'>
                  <IconButton aria-label='Signin' color='inherit'>
                    <AccountCircleIcon />
                    <Typography noWrap = {true}>Signin</Typography>
                  </IconButton>
                </Link>

                <Link style={isActive(history, '/signup')} to='/signup'>
                  <IconButton aria-label='Signup' color='inherit'>
                    <PersonAddIcon />
                    <Typography noWrap = {true}>Signup</Typography>
                  </IconButton>
                </Link>
              </Fragment>
            )}

            {isAuthenticated() && (
              <span
                style={{ cursor: 'pointer', color: '#ffffff' }}
                onClick={() =>
                  signout(() => {
                    history.push('/');
                  })
                }
              >
                <IconButton aria-label='Signout' color='inherit'>
                  <ExitToAppIcon />
                  <Typography noWrap = {true}>Signout</Typography>
                </IconButton>
              </span>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};

export default withRouter(MaterialAppBar);
