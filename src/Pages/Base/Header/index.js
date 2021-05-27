import {
  AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: 'calc(100% - 15rem)',
      marginLeft: '15rem',
    },
    backgroundColor: theme.palette.background.light,
  },
  menuButton: {
    marginRight: '1rem',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header({ openDrawer }) {
  const classes = useStyles();
  const auth = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  function handleUserButtonClick(e) {
    setAnchorEl(e.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  async function logout() {
    await auth.logout();
  }

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton className={classes.menuButton} onClick={openDrawer} color="inherit">
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" className={classes.title}>My Marvel Catalog</Typography>

        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleUserButtonClick}
          endIcon={<AccountCircleIcon />}
        />

        <Menu
          id="config-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem disabled>{ auth.user?.user.email }</MenuItem>
          <MenuItem onClick={logout}>Sair</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
