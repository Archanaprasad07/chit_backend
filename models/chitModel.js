const mongoose = require('mongoose');

const chitSchema = new mongoose.Schema({
  chitId: {
    type: Number,
    required: true,
  },
  chitname: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  contribution: {
    type: Number,
    required: true,
  },
  installments: {
    type: Number,
    required: true,
  },
  members: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      paymentStatus: {
        type: Boolean,
        default: false,
      },
    },
  ],
  commission: {
    type: Number,
    required: true,
  },
});

const Chit = mongoose.model('Chit', chitSchema);

module.exports = Chit;