import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { login } from '../actions/auth';

const Login = ({ login }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = loginData;

  const onChange = e => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    localStorage.removeItem('token');
    e.preventDefault();
    login(email, password);
  };

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
        </form>
      </Paper>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
