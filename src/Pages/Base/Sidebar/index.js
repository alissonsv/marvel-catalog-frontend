import { Link, NavLink } from 'react-router-dom';
import {
  Divider, Drawer, Hidden, List, ListItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  navLink: {
    width: '100%',
    color: 'white',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: '15rem',
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: '15rem',
    backgroundColor: '#151515',
  },
  img: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.light,
    [theme.breakpoints.up('xs')]: {
      height: '64px',
    },
    [theme.breakpoints.down('xs')]: {
      maxHeight: '56px',
    },
  },
  selected: {
    backgroundColor: '#333333',
  },
}));

export default function Sidebar({ open, close }) {
  const classes = useStyles();

  const navLink = (
    <List component="nav" className={classes.navLink}>
      <ListItem button component={NavLink} onClick={close} to="/favorites" activeClassName={classes.selected}>Favorites</ListItem>
      <ListItem button component={NavLink} onClick={close} to="/characters" activeClassName={classes.selected}>Characters</ListItem>
      <ListItem button component={NavLink} onClick={close} to="/comics" activeClassName={classes.selected}>Comics</ListItem>
    </List>
  );

  return (
    <nav className={classes.drawer}>
      {/* mobile */}
      <Hidden smUp>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="temporary"
          open={open}
          onClose={close}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <div className={classes.logo}>
            <img src="/logo.png" alt="" className={classes.img} />
          </div>

          <Divider />
          {navLink}
        </Drawer>
      </Hidden>

      <Hidden xsDown>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
        >
          <Link to="/">
            <div className={classes.logo}>
              <img className={classes.img} src="/logo.png" alt="" />
            </div>
          </Link>

          <Divider />
          {navLink}
        </Drawer>
      </Hidden>
    </nav>
  );
}
