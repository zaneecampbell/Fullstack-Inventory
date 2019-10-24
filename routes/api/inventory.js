const express = require('express');
const config = require('config');
const router = express.Router();
const auth = require('../../authMiddleware/auth');
const { check, validationResult } = require('express-validator/check');

const Inventory = require('../../models/Inventory');
const User = require('../../models/User');

// @route POST api/inventory
// @desc Create or Update inventory
// @access Private
router.post('/', [
  auth,
  [
    check('item', 'Item is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { item, amount, index } = req.body;

    const user = {};
    user.user = req.user.id;

    const inventoryFields = {};
    inventoryFields.item = item;
    inventoryFields.amount = amount;
    inventoryFields.index = index;

    console.log(inventoryFields);

    try {
      let inventory = await Inventory.findOne({ user: req.user.id });

      if (inventory) {
        // Update Inventory by adding new item
        inventory = await Inventory.findOneAndUpdate(
          { user: req.user.id },
          { $push: { items: inventoryFields } },
          { upsert: true }
        );

        return res.json(inventory);
      }

      // Create
      inventory = new Inventory({ items: inventoryFields, user: user.user });

      await inventory.save();
      res.json(inventory);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
]);

// @route Patch /api/inventory
// @desc update all inventory amounts at once
// @access Private
router.patch('/', auth, async (req, res) => {
  try {
    const updatedInventory = await Inventory.findOneAndUpdate(
      { user: req.user.id },
      { $set: { items: req.body } },
      { upsert: true },
      () => console.log('success')
    );

    res.json(updatedInventory);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Item not found' });
    }
    console.log(err);
  }
});

// @route Delete api/inventory
// @desc Remove inventory item
// @access Private
router.delete('/:index', auth, async (req, res) => {
  const number = parseInt(req.params.index);
  const remover = { index: number };
  try {
    const updatedInventory = await Inventory.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { items: remover } },
      { upsert: true }
    );
    res.json(updatedInventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/inventory
// @desc Get current users inventory
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const inventory = await Inventory.findOne({ user: req.user.id })
      .select('-user')
      .select('-_id')
      .select('-__v');

    if (!inventory) {
      return res
        .status(400)
        .json({ msg: 'You currently have no items in your inventory' });
    }

    res.json(inventory.items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

// Reference
// Original patch route may be useful in the future
// @route Patch /api/inventory
// @desc update inventory amount
// @access Private
// router.patch('/', auth, async (req, res) => {
//   try {
//     const { amount, index } = req.body;

//     // Have to create a string variable in dot notation to pass to update db
//     const update = 'items.' + index + '.amount';

//     const updatedInventory = await Inventory.findOneAndUpdate(
//       { user: req.user.id },
//       { $set: { [update]: amount } },
//       { upsert: true },
//       () => console.log('success')
//     );

//     res.json(updatedInventory);
//   } catch (err) {
//     if (err.kind === 'ObjectId') {
//       return res.status(404).json({ msg: 'Item not found' });
//     }
//     console.log(err);
//   }
// });
