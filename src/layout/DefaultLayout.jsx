import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './../styles/drawer.css';
import { LogoutTwoTone } from '@mui/icons-material';
import SwitchMode from '../components/common/SwitchMode';
import SwitchLanguage from '../components/common/SwitchLanguage';
import { useAuth } from '../utils/auth';
import CustomMenu from '../components/common/CustomMenu';
import { Outlet, useLocation } from 'react-router-dom';
import logo from './../assets/images/logo.png'

const drawerWidth = 270;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});


const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 0, // Initially 0 on the smallest screen

  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`, // Small screens (sm)
  },

  [theme.breakpoints.up('md')]: {
    width: `calc(${theme.spacing(7)} + 1px)`, // Medium screens (md)
  },

  [theme.breakpoints.up('lg')]: {
    width: `calc(${theme.spacing(7)} + 1px)`, // Large screens (lg)
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({

  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: 'var(--background-color)',
  color: 'var(--text-color)',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);





export default function MiniDrawer({ darkMode, toggleDarkMode }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [directionVal, setDirection] = React.useState(localStorage.getItem('lang') === 'en' ? 'ltr' : 'rtl');
  const { logoutLocal } = useAuth()
  const location = useLocation();


  const handleDirection = (direction) => {
    setDirection(() => direction);
  };

  const handleDrawerOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <Box sx={{ display: 'flex', direction: directionVal }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={directionVal === 'rtl' ? { marginRight: open ? drawerWidth : 0 } : { marginLeft: open ? 0 : drawerWidth }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              // Default margin for all screen sizes
              marginRight: directionVal === 'rtl' ? (open ? 0 : 1) : (open ? 1 : 0),
              marginLeft: directionVal === 'rtl' ? (open ? 1 : 0) : (open ? 0 : 1),
              // Responsive adjustments using breakpoints
              [theme.breakpoints.up('sm')]: {
                marginRight: directionVal === 'rtl' ? (open ? 0 : 6) : (open ? 6 : 0),
                marginLeft: directionVal === 'rtl' ? (open ? 6 : 0) : (open ? 0 : 6),
              },
              [theme.breakpoints.up('md')]: {
                marginRight: directionVal === 'rtl' ? (open ? 0 : 6) : (open ? 6 : 0),
                marginLeft: directionVal === 'rtl' ? (open ? 6 : 0) : (open ? 0 : 6),
              },
              [theme.breakpoints.up('lg')]: {
                marginRight: directionVal === 'rtl' ? (open ? 0 : 6) : (open ? 6 : 0),
                marginLeft: directionVal === 'rtl' ? (open ? 6 : 0) : (open ? 0 : 6),
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <SwitchLanguage handleDirection={handleDirection} />
            <div style={{ width: '1px', height: '25px', backgroundColor: 'var(--text-color)' }}></div>
            <SwitchMode darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <div style={{ width: '1px', height: '25px', backgroundColor: 'var(--text-color)' }}></div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" ModalProps={{
        keepMounted: true,
      }} anchor={directionVal === 'rtl' ? 'right' : 'left'} open={open}>
        <DrawerHeader style={{
          backgroundColor: 'var(--background-color-dark)',
          color: 'white',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          justifyContent: 'center',

        }}>
          {open ? <h1 style={{ fontSize: '20px' }}>FUTEC-SOFT</h1> : <img src={logo} alt="logo" style={{ width: '42px', height: '42px' }} />}
        </DrawerHeader>
        <ul className='menu' style={{ direction: directionVal }}>
          <CustomMenu open={open} directionVal={directionVal} handleDrawerOpen={handleDrawerOpen} selected={location.pathname} />
        </ul>
        <DrawerHeader style={{
          backgroundColor: 'var(--background-color-dark)',
          color: 'white',
          justifyContent: 'flex-end',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)'
        }}>
          <IconButton color='inherit' sx={{ "&:hover": { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }} onClick={() =>
            logoutLocal()
          } >
            {directionVal === 'rtl' ? <LogoutTwoTone style={{ transform: 'rotate(180deg)' }} /> : <LogoutTwoTone />}
          </IconButton>
        </DrawerHeader>
      </Drawer>
      <Box component="main" sx={{ overflow: 'auto', flexGrow: 1, p: 1, minHeight: '100vh', backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
