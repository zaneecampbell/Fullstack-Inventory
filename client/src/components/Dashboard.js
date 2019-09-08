import React, { Fragment, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { getCurrentInventory } from '../actions/inventory';
import AddNewItem from './AddNewItem';
import Typography from '@material-ui/core/Typography';
import { inventoryUpdate, deleteItem } from '../actions/inventory';

const Dashboard = ({
  getCurrentInventory,
  inventoryUpdate,
  deleteItem,
  isAuthenticated,
  authLoading,
  user,
  inventory: { inventory, loading },
  alerts
}) => {
  const [inventoryData, setInventoryData] = useState({
    inventoryArray: []
  });

  const { inventoryArray } = inventoryData;

  useEffect(() => {
    if (user !== null) {
      getCurrentInventory();
    }
  }, [user, getCurrentInventory]);

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
    deleteItem(index);
  };
  return loading && inventory === null ? (
    <Paper
      style={{
        textAlign: 'center',
        padding: '20px',
        margin: 'auto',
        marginTop: '20px',
        maxWidth: '750px'
      }}
    >
      <h1>Loading Your Inventory...</h1>
    </Paper>
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
        {user !== null ? (
          <Typography variant='h3' style={{ marginBottom: '20px' }}>
            {user.name}'s Inventory
          </Typography>
        ) : (
          <Typography variant='h3' style={{ marginBottom: '20px' }}>
            Your Inventory
          </Typography>
        )}
        {alerts.map((alert, idx) => (
          <Typography
            style={{ background: 'red', color: 'white', fontSize: '22px' }}
            key={idx}
          >
            {alert.msg}
          </Typography>
        ))}
        <AddNewItem />
        {inventory !== null && loading === false ? (
          <form onSubmit={e => onSubmit(e)}>
            {inventoryArray.map((item, idx) => (
              <div style={{ maxWidth: '980px' }} key={item.index}>
                <Typography variant='h5'>
                  {item.item}:
                  <input
                    style={{
                      fontSize: '22px',
                      margin: '15px',
                      marginBottom: '15px',
                      width: '25%'
                    }}
                    type='number'
                    id={`${idx}`}
                    placeholder='Enter Amount'
                    name='amount'
                    value={item.amount}
                    onChange={e => onChange(e)}
                  ></input>
                  <Button
                    style={{
                      fontSize: '16px',
                      backgroundColor: 'rgb(147, 25, 37)',
                      padding: '5px',
                      color: 'white'
                    }}
                    onClick={e => onDelete(e, item.index)}
                  >
                    X
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
          <div>
            {alerts.map((alert, idx) => (
              <Typography
                style={{ background: 'red', color: 'white', fontSize: '22px' }}
                key={idx}
              >
                {alert.msg}
              </Typography>
            ))}
            <h3>Your inventory is empty</h3>
          </div>
        )}
      </Paper>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  authLoading: state.auth.loading,
  user: state.auth.user,
  inventory: state.inventory,
  alerts: state.alert
});

export default connect(
  mapStateToProps,
  { getCurrentInventory, inventoryUpdate, deleteItem }
)(Dashboard);

// Add alert for update confirmation
