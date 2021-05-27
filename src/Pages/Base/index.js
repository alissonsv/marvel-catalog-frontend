import { useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from './Sidebar';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    [theme.breakpoints.up('xs')]: {
      height: 'calc(100% - 64px)',
    },
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100% - 56px)',
    },
    width: '100%',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    height: '100%',
    width: '100%',
  },
}));

export default function Base({
  user, setUser, children,
}) {
  const [open, setOpenDrawer] = useState(false);

  const classes = useStyles();

  const openDrawer = () => {
    setOpenDrawer(true);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header
        openDrawer={openDrawer}
        user={user}
        setUser={setUser}
      />
      <Sidebar open={open} close={() => setOpenDrawer(false)} />

      <div className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </div>
    </div>
  );
}
