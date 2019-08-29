import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentInventory } from '../actions/inventory';

const Dashboard = ({ getCurrentInventory, isAuthenticated }) => {
  useEffect(() => {
    getCurrentInventory();
  }, [getCurrentInventory]);

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <button onClick={console.log()}></button>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  inventory: state.inventory
});

export default connect(
  mapStateToProps,
  { getCurrentInventory }
)(Dashboard);
