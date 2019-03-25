import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import { Menu } from '@material-ui/core';

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };

  function MyMenu(props) {
    const { classes } = props;
    return (
      <div >
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" color="inherit" >
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  
  MyMenu.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default MyMenu;