import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';

const Login = ({ login, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div style={{ margin: '0px' }}>
      <div
        style={{
          background:
            'url(https://www.logisticsbureau.com/blog/wp-content/uploads/2012/05/Blog_What-is-Inventory.png)',
          backgroundSize: 'cover',
          height: '50vh',
          margin: '0px'
        }}
      >
        <Grid container>
          <Grid md={8} item>
            <Typography style={{ color: 'white' }} variant='h2'>
              Inventory Management designed with speed and simplicity in mind.
              Inventory Management designed with speed and simplicity mind.
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
