import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment style={{ margin: '0px' }}>
      <div
        style={{
          background:
            'url(https://1bx8sf2g6npiljdzd499kxph-wpengine.netdna-ssl.com/wp-content/uploads/2017/05/Blog_What-is-Inventory-400x234.jpg)',
          backgroundSize: 'cover',
          margin: '0px'
        }}
      >
        test
      </div>
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
