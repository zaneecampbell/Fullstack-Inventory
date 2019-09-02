import React, { Fragment, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { getCurrentInventory } from '../actions/inventory';
import AddNewItem from './AddNewItem';
import Typography from '@material-ui/core/Typography';

const Dashboard = ({
  getCurrentInventory,
  isAuthenticated,
  authLoading,
  user,
  inventory: { inventory, loading }
}) => {
  const [inventoryData, setInventoryData] = useState({
    inventoryArray: []
  });

  const { inventoryArray } = inventoryData;

  useEffect(() => {
    if (user !== null) {
      getCurrentInventory();
    }
  }, [user]);

  useEffect(() => {
    if (inventory) {
      setInventoryData({ ...inventoryData, inventoryArray: inventory });
    }
  }, [inventory, inventoryArray]);

  if (!isAuthenticated && !authLoading) {
    return <Redirect to='/' />;
  }

  const onChange = e => {
    let copy = inventoryArray;
    copy[e.target.id].amount = e.target.value;
    setInventoryData({ ...inventoryData, inventoryArray: copy });
  };

  return loading && inventory === null ? (
    <h1>Loading Your Inventory...</h1>
  ) : (
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
        <Typography variant='h3' style={{ marginBottom: '20px' }}>
          {user.name}'s Inventory
        </Typography>
        {inventory !== null && loading === false ? (
          <form>
            {inventoryArray.map(item => (
              <div key={item.index}>
                <Typography variant='h5'>
                  {item.item}:
                  <input
                    style={{
                      fontSize: '22px',
                      margin: '15px',
                      marginBottom: '15px'
                    }}
                    type='number'
                    id={`${item.index}`}
                    placeholder='Enter Amount'
                    name='amount'
                    value={item.amount}
                    onChange={e => onChange(e)}
                  ></input>
                </Typography>
              </div>
            ))}
          </form>
        ) : (
          <div>Your inventory is empty</div>
        )}
        <AddNewItem />
      </Paper>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  authLoading: state.auth.loading,
  user: state.auth.user,
  inventory: state.inventory
});

export default connect(
  mapStateToProps,
  { getCurrentInventory }
)(Dashboard);
