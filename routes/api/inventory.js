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

    const { item, amount } = req.body;

    const user = {};
    user.user = req.user.id;

    const inventoryFields = {};
    if (item) inventoryFields.item = item;
    if (amount) inventoryFields.amount = amount;

    try {
      let inventory = await Inventory.findOne({ user: req.user.id });

      console.log(inventoryFields);
      if (inventory) {
        // Update
        inventory = await Inventory.findOneAndUpdate(
          { user: req.user.id },
          { $push: { items: inventoryFields } },
          () => console.log('success'),
          { new: true }
        );

        return res.json(inventory);
      }

      // Create4
      inventory = new Inventory({ items: inventoryFields, user: user.user });

      await inventory.save();
      res.json(inventory);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
]);

module.exports = router;
