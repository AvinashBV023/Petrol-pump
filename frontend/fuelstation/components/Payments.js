import { useState } from 'react';
import {
  Box, Grid, Typography, TextField, Button, Divider
} from '@mui/material';

export default function PaymentsTab() {
  const [payments, setPayments] = useState({
    upi: 0,
    otp: 0,
    cash: 0,
    cheque: 0,
    yesterdayPay: 0,
    creditReceive: [{ amount: 0 }],
    cardSale: 0,
    tip: 0,
    personalAccount: 0,
    refilling: 0,
    internalAmount: 0,
    otherExpenses: [{ amount: 0 }],
    lubeSales: [{ price: 0, quantity: 0 }],
    headBlueSales: [{ price: 0, quantity: 0 }],
    petrolVolume: 0,
    dieselVolume: 0,
  });

  const updateField = (field, value) => {
    setPayments(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const updateArray = (field, index, key, value) => {
    const updated = [...payments[field]];
    updated[index][key] = parseFloat(value) || 0;
    setPayments(prev => ({ ...prev, [field]: updated }));
  };

  const addToArray = (field, template) => {
    setPayments(prev => ({ ...prev, [field]: [...prev[field], template] }));
  };

  const calculateSummary = () => {
    const creditTotal = payments.creditReceive.reduce((sum, item) => sum + item.amount, 0);
    const otherExpensesTotal = payments.otherExpenses.reduce((sum, item) => sum + item.amount, 0);
    const lubeTotal = payments.lubeSales.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const headBlueTotal = payments.headBlueSales.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const income = payments.upi + payments.cardSale + payments.otp + payments.cash + payments.cheque +
                   payments.yesterdayPay + lubeTotal + headBlueTotal;

    const expenses = payments.tip + payments.personalAccount + payments.refilling +
                     payments.internalAmount + creditTotal + otherExpensesTotal;

    const netAmount = income + expenses;

    const petrolAmount = payments.petrolVolume * 102.63;
    const dieselAmount = payments.dieselVolume * 94.19;

    const expectedTotal = petrolAmount + dieselAmount;
    const errorDifference = expectedTotal - netAmount;

    return { income, expenses, netAmount, petrolAmount, dieselAmount, errorDifference };
  };

  const {
    income,
    expenses,
    netAmount,
    petrolAmount,
    dieselAmount,
    errorDifference
  } = calculateSummary();

  return (
    <Box mb={19}>
      <Typography variant="h6">Payments Entry</Typography>

      <Box mt={3}>
        <Typography variant="subtitle1">Fuel Volumes</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Petrol Volume Sold"
              fullWidth
              type="number"
              onChange={(e) => updateField("petrolVolume", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Diesel Volume Sold"
              fullWidth
              type="number"
              onChange={(e) => updateField("dieselVolume", e.target.value)}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1">Incomes</Typography>
        <Grid container spacing={2}>
          {["upi", "otp", "cash", "cheque", "yesterdayPay"].map((field) => (
            <Grid item xs={12} sm={6} md={4} key={field}>
              <TextField
                label={field.replace(/([A-Z])/g, ' $1').toUpperCase()}
                fullWidth
                type="number"
                onChange={(e) => updateField(field, e.target.value)}
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="CARD SALE"
              fullWidth
              type="number"
              onChange={(e) => updateField("cardSale", e.target.value)}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1">Lube Sales</Typography>
        {payments.lubeSales.map((item, index) => (
          <Grid container spacing={1} key={index}>
            <Grid item xs={6}>
              <TextField
                label="Price"
                fullWidth
                type="number"
                value={item.price}
                onChange={(e) => updateArray('lubeSales', index, 'price', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Quantity"
                fullWidth
                type="number"
                value={item.quantity}
                onChange={(e) => updateArray('lubeSales', index, 'quantity', e.target.value)}
              />
            </Grid>
          </Grid>
        ))}
        <Button onClick={() => addToArray('lubeSales', { price: 0, quantity: 0 })}>Add Lube Sale</Button>

        <Typography variant="subtitle1" mt={3}>Head Blue Sales</Typography>
        {payments.headBlueSales.map((item, index) => (
          <Grid container spacing={1} key={index}>
            <Grid item xs={6}>
              <TextField
                label="Price"
                fullWidth
                type="number"
                value={item.price}
                onChange={(e) => updateArray('headBlueSales', index, 'price', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Quantity"
                fullWidth
                type="number"
                value={item.quantity}
                onChange={(e) => updateArray('headBlueSales', index, 'quantity', e.target.value)}
              />
            </Grid>
          </Grid>
        ))}
        <Button onClick={() => addToArray('headBlueSales', { price: 0, quantity: 0 })}>Add Head Blue Sale</Button>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1">Credit Sales</Typography>
        {payments.creditReceive.map((item, index) => (
          <TextField
            key={index}
            fullWidth
            margin="dense"
            label={`Credit Sale ${index + 1}`}
            type="number"
            value={item.amount}
            onChange={(e) => updateArray('creditReceive', index, 'amount', e.target.value)}
          />
        ))}
        <Button onClick={() => addToArray('creditReceive', { amount: 0 })}>Add Credit Sale</Button>

        <Typography variant="subtitle1" mt={3}>Other Expenses</Typography>
        {payments.otherExpenses.map((item, index) => (
          <TextField
            key={index}
            fullWidth
            margin="dense"
            label={`Other Expense ${index + 1}`}
            type="number"
            value={item.amount}
            onChange={(e) => updateArray('otherExpenses', index, 'amount', e.target.value)}
          />
        ))}
        <Button onClick={() => addToArray('otherExpenses', { amount: 0 })}>Add Other Expense</Button>

        <Typography variant="subtitle1" mt={3}>Expenses</Typography>
        <Grid container spacing={2}>
          {["tip", "personalAccount", "refilling", "internalAmount"].map((field) => (
            <Grid item xs={12} sm={6} md={4} key={field}>
              <TextField
                label={field.replace(/([A-Z])/g, ' $1').toUpperCase()}
                fullWidth
                type="number"
                onChange={(e) => updateField(field, e.target.value)}
              />
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box mt={2} p={2} sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="h6">Summary</Typography>
          <Typography>Collected: ₹{income.toFixed(2)}</Typography>
          <Typography>Total Expenses and credit sales: ₹{expenses.toFixed(2)}</Typography>
          <Typography>Net Amount: ₹{netAmount.toFixed(2)}</Typography>
          <Typography>Petrol Amount: ₹{petrolAmount.toFixed(2)}</Typography>
          <Typography>Diesel Amount: ₹{dieselAmount.toFixed(2)}</Typography>
          <Typography sx={{ color: errorDifference > 0 ? 'red' : 'green', fontWeight: 'bold' }}>
            Error Difference: ₹{errorDifference.toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
