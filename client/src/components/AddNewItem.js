import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { createInventory } from '../actions/inventory';

const AddNewItem = ({ createInventory, inventory }) => {
  const [newItemData, setNewItemData] = useState({
    item: '',
    amount: 0
  });

  const { item, amount } = newItemData;

  // This will be the index/id of the new item for selecting/removing purposes
  let index;

  if (inventory) {
    if (inventory[0] !== undefined) {
      index = inventory[inventory.length - 1].index + 1;
    } else {
      index = 0;
    }
  } else {
    index = 0;
  }

  const onChange = e => {
    setNewItemData({ ...newItemData, [e.target.name]: e.target.value });
  };

  // Sends a request to add a new item to the inventory list
  const onSubmit = async e => {
    e.preventDefault();
    const formData = { item, amount, index };
    createInventory(formData);
    setNewItemData({ ...newItemData, item: '', amount: 0 });
  };

  return (
    <div
      style={{
        marginBottom: '15px'
      }}
    >
      <form
        style={{
          width: '75%',
          margin: 'auto',
          borderStyle: 'solid',
          borderWidth: '1px',
          borderRadius: '10px'
        }}
        onSubmit={e => onSubmit(e)}
        id='newItemForm'
      >
        <div>
          <input
            style={{
              fontSize: '22px',
              margin: '15px',
              marginBottom: '15px',
              maxWidth: '275px',
              width: '50%'
            }}
            type='text'
            id={`${item.index}`}
            placeholder='New Item'
            name='item'
            value={item}
            onChange={e => onChange(e)}
          ></input>
          <input
            style={{
              fontSize: '22px',
              margin: '15px',
              marginBottom: '15px',
              maxWidth: '275px',
              width: '50%'
            }}
            type='number'
            id={`${item.index}`}
            placeholder='Enter Amount'
            name='amount'
            value={amount}
            onChange={e => onChange(e)}
          ></input>
          <div style={{ marginBottom: '15px' }}>
            <Button
              style={{
                fontSize: '16px',
                backgroundColor: '#3f51b5',
                padding: '10px',
                color: 'white'
              }}
              type='submit'
            >
              Add New Item
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  inventory: state.inventory.inventory
});

export default connect(
  mapStateToProps,
  { createInventory }
)(AddNewItem);
