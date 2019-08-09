const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  items: {
    type: Array
  }
});

module.exports = Inventory = mongoose.model('Inventory', InventorySchema);
