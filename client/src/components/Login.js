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
    <div style={{ background: 'white', height: '100vh' }}>
      <div
        style={{
          background: 'url(images/login_background.webp)',
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
                Simple, Fast, Intuitive. It's that easy.
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
      <div style={{ textAlign: 'center', background: 'white' }}>
        <div
          style={{
            marginLeft: '50px',
            marginRight: '50px',
            paddingTop: '30px'
          }}
        >
          {' '}
          <Typography style={{ fontWeight: 'bold' }} variant='h2'>
            What we do?
          </Typography>
          <div style={{ margin: 'auto', maxWidth: '1600px' }}>
            <Grid container justify='center' style={{ marginTop: '30px' }}>
              <Grid
                xs={12}
                md={3}
                style={{ marginLeft: '20px', marginRight: '20px' }}
                item
              >
                <Card style={{ boxShadow: 'none', marginBottom: '20px' }}>
                  <CardContent>
                    <img src='/images/database.png' alt='database icon' />
                    <Typography style={{ marginTop: '10px' }} variant='h5'>
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
                <Card style={{ boxShadow: 'none', marginBottom: '20px' }}>
                  <CardContent>
                    <img src='/images/key.png' alt='key icon' />
                    <Typography style={{ marginTop: '10px' }} variant='h5'>
                      Allow you to login from anywhere.
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
                <Card style={{ boxShadow: 'none', marginBottom: '20px' }}>
                  <CardContent>
                    <img src='/images/snap.png' alt='snap icon' />
                    <Typography style={{ marginTop: '10px' }} variant='h5'>
                      Keep things simple and clean.
                    </Typography>
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
          textAlign: 'center',
          paddingLeft: '50px',
          paddingRight: '50px',
          paddingBottom: '30px'
        }}
      >
        <div
          style={{
            margin: 'auto',
            paddingTop: '15px',
            maxWidth: '1600px'
          }}
        >
          <Typography
            style={{ fontWeight: 'bold', marginBottom: '30px' }}
            variant='h2'
          >
            And, why choose us?
          </Typography>
          <Typography
            style={{
              marginTop: '10px',
              paddingBottom: '25px',
              fontSize: '1.4rem'
            }}
          >
            Snappy Inventory isn't here to bog you down with too much fluff for
            your fundraiser, charity event, or pokemon GO meetup. We're a small
            quick, snappy if you will, inventory management system trying to
            keep things simple for your inventory tracking needs. Our database
            is secure and hosted in the cloud for fast response times all over.
            We strive to add features and content all while maintaning the core
            intuitive simplicity.
          </Typography>
        </div>
      </div>
      <div
        style={{
          textAlign: 'center',
          background: '#e6e6e6',
          marginBottom: '0px',
          paddingBottom: '25px'
        }}
      >
        <Typography
          style={{ fontWeight: 'bold', paddingTop: '10px' }}
          variant='h2'
        >
          Contact
        </Typography>
        <div style={{ margin: 'auto', maxWidth: '1600px' }}>
          <Grid container justify='center' style={{ marginTop: '30px' }}>
            <Grid
              xs={12}
              md={3}
              style={{ marginLeft: '20px', marginRight: '20px' }}
              item
            >
              <Typography style={{ fontSize: '1.4rem' }}>
                Hours <br></br>7am-9pm PST
              </Typography>
            </Grid>
            <Grid
              xs={12}
              md={3}
              style={{ marginLeft: '20px', marginRight: '20px' }}
              item
            >
              <Typography style={{ fontSize: '1.4rem' }}>
                Phone <br></br>1-405-555-555Q
              </Typography>
            </Grid>
            <Grid
              xs={12}
              md={3}
              style={{ marginLeft: '20px', marginRight: '20px' }}
              item
            >
              <Typography style={{ fontSize: '1.4rem' }}>
                Email SnappySnap@SnappyInventory.co
              </Typography>
            </Grid>
          </Grid>
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
