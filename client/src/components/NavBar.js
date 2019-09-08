import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { logout } from '../actions/auth';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const NavBar = ({ isAuthenticated, logout, history }) => {
  const classes = useStyles();

  const onClick = async e => {
    e.preventDefault();
    delete axios.defaults.headers.common['x-auth-token'];
    logout();
    return history.push(`/`);
  };

  return isAuthenticated === true ? (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          ></IconButton>
          <Typography variant='h6' className={classes.title}>
            Full Stack Inventory App
          </Typography>
          <Button color='inherit' onClick={(e, history) => onClick(e, history)}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  ) : (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          ></IconButton>
          <Typography variant='h6' className={classes.title}>
            Full Stack Inventory App
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(NavBar)
);
