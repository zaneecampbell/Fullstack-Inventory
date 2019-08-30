import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentInventory } from '../actions/inventory';
import AddNewItem from './AddNewItem';

const Dashboard = ({
  getCurrentInventory,
  isAuthenticated,
  authLoading,
  inventory: { inventory, loading }
}) => {
  useEffect(() => {
    getCurrentInventory();
  }, [getCurrentInventory]);

  if (!isAuthenticated && !authLoading) {
    return <Redirect to='/' />;
  }

  return loading && inventory === null ? (
    <h1>Loading Your Inventory...</h1>
  ) : (
    <div>
      <h1>Your Inventory</h1>
      {inventory !== false ? (
        inventory.map(item => (
          <div key={item.index}>
            {item.item}: {item.amount}
          </div>
        ))
      ) : (
        <div>Your inventory is empty</div>
      )}
      <AddNewItem />
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  authLoading: state.auth.loading,
  inventory: state.inventory
});

export default connect(
  mapStateToProps,
  { getCurrentInventory }
)(Dashboard);
