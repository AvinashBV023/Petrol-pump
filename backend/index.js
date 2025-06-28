const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

dotenv.config();
const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;

// Register user

app.post('/api/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { name, email, password: hashed, role }
    });
    res.status(201).json({ message: "Registration successful", user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (e) {
    res.status(400).json({ error: "Email already exists" });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

// Auth middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.sendStatus(403);
  }
};

// Credit sale
app.post('/api/credit-sale', auth, async (req, res) => {
  const { customer, amount, note } = req.body;
  const sale = await prisma.creditSale.create({
    data: {
      customer,
      amount,
      note,
      createdById: req.user.id
    }
  });
  res.json(sale);
});

app.listen(4000, () => console.log("Backend running on http://localhost:4000"));
