import React, { Fragment, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { getCurrentInventory } from '../actions/inventory';
import AddNewItem from './AddNewItem';
import Typography from '@material-ui/core/Typography';
import { inventoryUpdate } from '../actions/inventory';

const Dashboard = ({
  getCurrentInventory,
  inventoryUpdate,
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

  const onSubmit = e => {
    e.preventDefault();
    const formData = inventoryArray;
    inventoryUpdate(formData);
  };

  const onDelete = (e, index) => {
    e.preventDefault();
    console.log(index);
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
        <AddNewItem />
        {inventory !== null && loading === false ? (
          <form onSubmit={e => onSubmit(e)}>
            {inventoryArray.map(item => (
              <div style={{ maxWidth: '980px' }} key={item.index}>
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
                  <Button
                    index={item.index}
                    style={{
                      fontSize: '16px',
                      backgroundColor: 'rgb(147, 25, 37)',
                      padding: '10px',
                      color: 'white'
                    }}
                    onClick={e => onDelete(e, item.index)}
                  >
                    Remove
                  </Button>
                </Typography>
              </div>
            ))}
            <Button
              style={{
                marginTop: '25px',
                marginLeft: '25px',
                marginBottom: '5px',
                fontSize: '30px',
                backgroundColor: '#3f51b5',
                padding: '15px',
                color: 'white'
              }}
              type='submit'
            >
              Update Inventory
            </Button>
          </form>
        ) : (
          <h3>Your inventory is empty</h3>
        )}
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
  { getCurrentInventory, inventoryUpdate }
)(Dashboard);
