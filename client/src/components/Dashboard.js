import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentInventory } from '../actions/inventory';

const Dashboard = ({
  getCurrentInventory,
  isAuthenticated,
  inventory: { inventory, loading }
}) => {
  useEffect(() => {
    getCurrentInventory();
  }, [getCurrentInventory]);

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }

  return loading && inventory === null ? (
    <h1>Loading Your Inventory</h1>
  ) : (
    <div>
      <h1>Your Inventory</h1>
      {inventory !== false ? (
        inventory.map(item => (
          <div>
            {item.item}: {item.amount}
          </div>
        ))
      ) : (
        <div>Your inventory is empty</div>
      )}
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
