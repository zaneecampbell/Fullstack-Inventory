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
    index = inventory[inventory.length - 1].index + 1;
  } else {
    index = 0;
  }

  const onChange = e => {
    setNewItemData({ ...newItemData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = { item, amount, index };
    createInventory(formData);
  };

  return (
    console.log(index),
    (
      <div style={{ borderStyle: 'solid', borderWidth: '1px' }}>
        <form onSubmit={e => onSubmit(e)}>
          <span>
            <input
              style={{
                fontSize: '22px',
                margin: '15px',
                marginBottom: '15px'
              }}
              type='text'
              id={`${item.index}`}
              placeholder='Enter item name'
              name='item'
              value={item}
              onChange={e => onChange(e)}
            ></input>
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
              value={amount}
              onChange={e => onChange(e)}
            ></input>
            <Button
              style={{
                fontSize: '16px',
                backgroundColor: '#3f51b5',
                padding: '5px',
                color: 'white'
              }}
              type='submit'
            >
              Add New Item
            </Button>
          </span>
        </form>
      </div>
    )
  );
};

const mapStateToProps = state => ({
  inventory: state.inventory.inventory
});

export default connect(
  mapStateToProps,
  { createInventory }
)(AddNewItem);
