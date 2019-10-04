import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import { logout, login } from '../actions/auth';

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

const NavBar = ({ isAuthenticated, logout, login, alerts, history }) => {
  const classes = useStyles();
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [open, setOpen] = useState(false);

  const { email, password } = loginData;

  const onChange = e => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!email || !password) {
      return alert('Please include email and password');
    }
    login(email, password);
    setLoginData({ ...loginData, password: '' });
  };

  const onClick = async e => {
    e.preventDefault();
    delete axios.defaults.headers.common['x-auth-token'];
    logout();
    handleClose();
    return history.push(`/`);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return isAuthenticated === true ? (
    <div style={{ backgroundColor: '#3f51b5' }} className={classes.root}>
      <AppBar
        style={{ maxWidth: '1100px', margin: 'auto', boxShadow: 'none' }}
        position='static'
      >
        <Toolbar>
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
    <div style={{ backgroundColor: '#3f51b5' }} className={classes.root}>
      <AppBar
        style={{ maxWidth: '1100px', margin: 'auto', boxShadow: 'none' }}
        position='static'
      >
        <div>
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              Full Stack Inventory App
            </Typography>
            <Button color='inherit' onClick={handleOpen}>
              Login
            </Button>
            <Modal
              aria-labelledby='simple-modal-title'
              aria-describedby='simple-modal-description'
              open={open}
              onClose={handleClose}
            >
              <Paper
                style={{
                  maxWidth: '750px',
                  margin: 'auto',
                  marginTop: '50px',
                  padding: '10px',
                  paddingBottom: '30px',
                  textAlign: 'center'
                }}
              >
                <form
                  style={{ marginTop: '50px', marginBottom: '50px' }}
                  onSubmit={e => onSubmit(e)}
                >
                  <Input
                    style={{
                      fontSize: '50px',
                      margin: '15px',
                      marginBottom: '50px'
                    }}
                    type='email'
                    placeholder='Email Address'
                    name='email'
                    value={email}
                    onChange={e => onChange(e)}
                    required
                  />
                  <Input
                    style={{
                      fontSize: '50px',
                      margin: '15px',
                      marginBottom: '50px'
                    }}
                    type='password'
                    value={password}
                    name='password'
                    onChange={e => onChange(e)}
                    placeholder='Password'
                    autoComplete='off'
                  />
                  <div>
                    {alerts.map((alert, idx) => (
                      <Typography
                        style={{
                          background: 'red',
                          color: 'white',
                          fontSize: '22px'
                        }}
                        key={idx}
                      >
                        {alert.msg}
                      </Typography>
                    ))}
                    <Button
                      style={{
                        marginTop: '25px',
                        fontSize: '30px',
                        backgroundColor: '#3f51b5',
                        padding: '15px',
                        color: 'white'
                      }}
                      type='submit'
                    >
                      Login
                    </Button>
                    <Link
                      style={{ textDecoration: 'none' }}
                      onClick={handleClose}
                      to='/register'
                    >
                      <Button
                        style={{
                          marginTop: '25px',
                          marginLeft: '25px',
                          fontSize: '30px',
                          backgroundColor: '#3f51b5',
                          padding: '15px',
                          color: 'white'
                        }}
                      >
                        or Register here
                      </Button>
                    </Link>
                  </div>
                </form>
              </Paper>
            </Modal>
          </Toolbar>
        </div>
      </AppBar>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  alerts: state.alert
});

export default withRouter(
  connect(
    mapStateToProps,
    { logout, login }
  )(NavBar)
);

// clear form on login
