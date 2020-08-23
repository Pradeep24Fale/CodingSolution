import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Face';
import { MenuItem } from '@material-ui/core';
import Box from "@material-ui/core/Box";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    width: '100%',
    marginLeft: drawerWidth,
  },
}));

function TopMenu() {
  const classes = useStyles();

  return (
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <Box textAlign="center">
          <Typography variant='h5'>
            Log In
          </Typography>
          </Box>
        </Toolbar>
      </AppBar>
  );
}

export default TopMenu;
