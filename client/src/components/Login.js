import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { Typography, CardContent } from '@material-ui/core';

const Login = ({ login, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div style={{ background: 'white', overflowX: 'hidden' }}>
      <div style={{ height: '30px' }}></div>
      <div
        style={{
          background:
            'url(https://www.logisticsbureau.com/blog/wp-content/uploads/2012/05/Blog_What-is-Inventory.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '700px'
        }}
      >
        <div>
          <div style={{ height: '10vh' }}></div>
          <div style={{ maxWidth: '700px', margin: 'auto' }}>
            <Paper
              style={{
                background:
                  'linear-gradient(rgba(255, 255, 255, 0.8),rgba(255, 255, 255, 0.8))',
                textAlign: 'center',
                marginLeft: '10px',
                marginRight: '10px',
                paddingTop: '15px',
                paddingBottom: '15px'
              }}
            >
              <Typography style={{ fontWeight: 'bold' }} variant='h2'>
                Snappy Inventory
              </Typography>
              <Typography style={{ marginTop: '25px' }} variant='h5'>
                Simple, Fast, Intuitive. It's that easy
              </Typography>
              <Link style={{ textDecoration: 'none' }} to='/register'>
                <Button
                  style={{
                    marginTop: '25px',
                    marginBottom: '15px',
                    fontSize: '25px',
                    background: 'rgb(63, 81, 181)',
                    color: 'white'
                  }}
                >
                  Register
                </Button>
              </Link>
            </Paper>
          </div>
        </div>
      </div>
      <div style={{ background: 'white', textAlign: 'center' }}>
        <div
          style={{
            marginLeft: '50px',
            marginRight: '50px',
            paddingTop: '25px'
          }}
        >
          {' '}
          <Typography style={{ fontWeight: 'bold' }} variant='h2'>
            What we do
          </Typography>
          <div style={{margin:'auto'}}>
          <Grid
            container
            justify='center'
            style={{ marginTop: '30px' }}
          >
            <Grid
              xs={12}
              md={3}
              style={{ marginLeft: '20px', marginRight: '20px' }}
              item
            >
              <Card style={{boxShadow: 'none', marginBottom: '20px'}}>
                <CardContent>
                  <img src="/images/database.png" alt="database icon" />
                  <Typography style={{marginTop: '10px'}}>
                    Save your information in our database.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              xs={12}
              md={3}
              style={{ marginLeft: '20px', marginRight: '20px' }}
              item
            >
              <Card style={{boxShadow: 'none', marginBottom: '20px'}}>
                <CardContent>
                <img src="/images/key.png" alt="key icon" />
                  <Typography>Allow you to login from anywhere</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              xs={12}
              md={3}
              style={{ marginLeft: '20px', marginRight: '20px' }}
              item
            >
              <Card style={{boxShadow: 'none', marginBottom: '20px'}}>
                <CardContent>
                  <Typography>Keep things simple and clean.</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          </div>
        </div>
      </div>
      <div
        style={{
          background: 'white',
          textAlign: 'left',
          marginLeft: '50px',
          marginRight: '50px'
        }}
      >
        <div
          style={{
            margin: 'auto',
            paddingTop: '25px',
            maxWidth: '1600px'
          }}
        >
          <Typography style={{ fontWeight: 'bold' }} variant='h2'>
            Why choose us?
          </Typography>
          <Typography
            style={{
              marginTop: '10px',
              paddingBottom: '25px'
            }}
            variant='h5'
          >
            Snappy Inventory isn't here to bog you down with too much for your
            fundraiser, charity event, or pokemon GO meetup (hey we dont judge).
            We're a small quicky (snappy if you will) inventory management
            system trying to keep things simple for your inventory tracking
            needs.
          </Typography>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(
  connect(
    mapStateToProps,
    { login }
  )(Login)
);
