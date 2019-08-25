import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Dashboard = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }

  return <div>test</div>;
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Dashboard);
