const { Router } = require("express");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const zod = require("zod");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = Router();

const signupBody = zod.object({
  username: zod.string().email("Invalid email format"),
  password: zod.string().min(6),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  console.log("Received signup request:", req.body);
  const { username, firstName, lastName, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const user = await User.create({ username, firstName, lastName, password });

  // Create new account for the user
  await Account.create({
    userId: user._id,
    balance: Math.floor(Math.random() * 10000),
  });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({
    message: "User created successfully",
    token,
  });
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(411).json({
      message: "Invalid username or password",
    });
  }
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

const updateBody = zod.object({
  password: zod.string().min(6).optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success, data } = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  await User.updateOne(
    {
      _id: req.userId,
    },
    data
  );
  res.json({ message: "User updated successfully", data });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } },
    ],
  });

  res.json({
    users: users.map((user) => ({
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    })),
  });
});

module.exports = router;
