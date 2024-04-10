const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  bidAmount: {
    type: Number,
    required: true
  }
});

const chitSchema = new mongoose.Schema({
  chitId: {
    type: Number,
    required: true
  },
  chitname: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  contribution: {
    type: Number,
    required: true
  },
  installments: {
    type: Number,
    required: true
  },
  people: {
    type: Number,
    required: true
  },
  commission: {
    type: Number,
    required: true
  },

  bids: [bidSchema]
});

const Chit = mongoose.model('Chit', chitSchema);

module.exports = Chit;