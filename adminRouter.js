const express = require('express');
const Chit = require('./chitModel');
const Payment = require('./paymentModel');
const router = express.Router();
const User = require('./userModel');



router.post('/chit/setup', async (req, res) => {
  try {
    // Extract chit details from request body
    const { chitId, chitname, totalAmount, contribution, installments, people, commission } = req.body;

    // Create a new chit document
    const newChit = new Chit({
      chitId,
      chitname,
      totalAmount,
      contribution,
      installments,
      people,
      commission,
      bids: [] // Initialize bids array
    });

    // Save the new chit to the database
    await newChit.save();

    res.status(201).json({ message: 'Chit setup successful' });
  } catch (error) {
    console.error('Error setting up chit:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/chit/view', async (req, res) => {
  try {
    // Find all chit documents
    const allChits = await Chit.find();

    if (!allChits || allChits.length === 0) {
      return res.status(404).json({ error: 'No chits found' });
    }

    res.status(200).json(allChits);
  } catch (error) {
    console.error('Error viewing chits:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.get('/user/view', async (req, res) => {
  try {
    // Find all user documents
    const allUsers = await User.find();

    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    res.status(200).json(allUsers);
  } catch (error) {
    console.error('Error viewing users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




router.post('/user/delete', async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Find the user by userId
    const user = await User.findOne({ userid: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user
    await user.remove();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






  // Define a route to fetch all bids for all users
router.get('/admin/bids', async (req, res) => {
    try {
      const chits = await Chit.find();
      let allBids = [];
      for (const chit of chits) {
        for (const bid of chit.bids) {
          const user = await User.findById(bid.userId);
          const bidInfo = {
            username: user.username,
            email: user.email,
            bidAmount: bid.bidAmount,
            month: chit.month
          };
          allBids.push(bidInfo);
        }
      }
      allBids.sort((a, b) => a.bidAmount - b.bidAmount);
      res.status(200).json(allBids);
    } catch (error) {
      console.error('Error fetching bids:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  router.get('/paymentsAll', async (req, res) => {
    try {
      // Find all users
      const users = await User.find();
  
      // For each user, find their payment history
      const userPayments = await Promise.all(users.map(async (user) => {
        const payments = await Payment.find({ userId: user._id });
        return { user, payments };
      }));
  
      res.status(200).json({ userPayments });
    } catch (error) {
      console.error('Error fetching payment status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;