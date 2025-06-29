import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Layout({ children }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));



  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    router.push('/login');
  };

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Enter Credit Sale', path: '/credit-sale' },
    { label: 'All Credits', path: '/all-credits' },
    { label: 'Logout', action: handleLogout },
  ];

  const handleNav = (item) => {
    handleMenuClose();
    if (item.path) router.push(item.path);
    if (item.action) item.action();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Petrol Pump App
          </Typography>

          {!isMobile && (
            <>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  onClick={() => item.path ? router.push(item.path) : item.action()}
                >
                  {item.label}
                </Button>
              ))}
            </>
          )}

          {isMobile && (
            <>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {menuItems.map((item) => (
                  <MenuItem key={item.label} onClick={() => handleNav(item)}>
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
}
