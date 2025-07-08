const { Router } = require("express");
const zod = require("zod");
const { authMiddleware } = require("../middleware/authMiddleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");
const router = Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId }).populate('userId');
  if (!account) {
    return res.status(404).json({
      message: "Account not found",
    });
  }
  res.json({
    balance: account.balance,
    firstname: account.userId.firstName,
    lastname: account.userId.lastName,
  });
});

// Define the schema for transfer
const transferBody = zod.object({
  to: zod.string().length(24),
  amount: zod.coerce.number().positive(),
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { success } = transferBody.safeParse(req.body);
    if (!success) {
      await session.abortTransaction();
      return res.status(411).json({
        message: "Incorrect inputs",
      });
    }

    const { to, amount } = req.body;
    const fromAccount = await Account.findOne({ userId: req.userId }).session(
      session
    );
    if (!fromAccount || fromAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "Recipient account not found",
      });
    }

    // Perform the transfer
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
    res.json({
      message: "Transfer successful",
    });
  } catch (error) {
    // Rollback the transaction in case of error
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
});

module.exports = router;
