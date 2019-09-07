import React, { Fragment, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { register } from '../actions/auth';

const Register = ({ register, isAuthenticated, alerts }) => {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = registerData;

  const onChange = e => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    register(name, email, password);
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
            type='name'
            placeholder='Your Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
            required
          />
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
            Register
          </Button>
          <Link style={{ textDecoration: 'none' }} to='/'>
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
              Return to Login
            </Button>
          </Link>
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
  { register }
)(Register);
