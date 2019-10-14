import React, { Fragment, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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
    <div
      style={{
        background: 'url(images/warehouse.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        height: `calc(100vh - 64px)`
      }}
    >
      <div style={{ height: '20px' }}></div>
      <Paper
        style={{
          textAlign: 'center',
          padding: '20px',
          margin: 'auto',
          maxWidth: '750px'
        }}
      >
        <h1>Loading Your Inventory...</h1>
      </Paper>
    </div>
  ) : (
    <div
      style={
        {
          // background: 'url(images/warehouse.jpg)',
          // backgroundRepeat: 'no-repeat',
          // backgroundAttachment: 'scroll',
          // backgroundSize: 'cover',
          // height: `calc(100vh - 64px)`
        }
      }
    >
      <div style={{ height: '50px' }}></div>
      <Paper
        style={{
          maxWidth: '750px',
          margin: 'auto',
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
              <Grid container justify='center' key={item.index}>
                <Typography variant='h5'>
                  <Grid style={{ textAlign: 'left' }} xs={12} item>
                    {item.item}:
                  </Grid>
                  <Grid xs={12} item>
                    <input
                      style={{
                        fontSize: '22px',
                        marginTop: '15px',
                        marginBottom: '15px',
                        marginRight: '15px',
                        maxWidth: '100px'
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
                  </Grid>
                </Typography>
              </Grid>
            ))}
            <Button
              style={{
                marginTop: '25px',
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
                style={{
                  background: 'red',
                  color: 'white',
                  fontSize: '22px'
                }}
                key={idx}
              >
                {alert.msg}
              </Typography>
            ))}
            <h3>Your inventory is empty</h3>
          </div>
        )}
      </Paper>
    </div>
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
