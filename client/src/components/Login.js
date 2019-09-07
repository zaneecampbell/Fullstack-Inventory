import React, { Fragment, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { login } from '../actions/auth';

const Login = ({ login, isAuthenticated, alerts }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

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
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
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
                style={{ background: 'red', color: 'white', fontSize: '22px' }}
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
            <Link style={{ textDecoration: 'none' }} to='/register'>
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
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  alerts: state.alert
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
