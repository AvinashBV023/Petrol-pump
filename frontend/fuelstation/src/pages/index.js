import { useState, useEffect } from 'react';
import {
  Box, Tabs, Tab, Typography, TextField, Grid, Button, Paper
} from '@mui/material';
import dayjs from 'dayjs';
import PaymentsTab from '../../components/Payments'; 

const machines = [
  {
    id: 'M2335399',
    type: 'Machine 1',
    nozzles: [
      { number: 1, fuel: 'Diesel' },
      { number: 2, fuel: 'Diesel' },
      { number: 3, fuel: 'Petrol' },
      { number: 4, fuel: 'Petrol' },
    ],
  },
  {
    id: 'M2335332',
    type: 'Machine 2',
    nozzles: [
      { number: 1, fuel: 'Diesel' },
      { number: 2, fuel: 'Diesel' },
      { number: 3, fuel: 'Petrol' },
      { number: 4, fuel: 'Petrol' },
    ],
  },
];

function TabPanel({ value, index, children }) {
  return value === index && <Box sx={{ mt: 2 }}>{children}</Box>;
}

export default function HomePage() {
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [dateTime, setDateTime] = useState('');
  const [totalPetrol, setTotalPetrol] = useState(0);
  const [totalDiesel, setTotalDiesel] = useState(0);
  const [userName, setUserName] = useState('');
useEffect(() => {
  const now = dayjs().format('YYYY-MM-DDTHH:mm');
  setDateTime(now);

  const userData = localStorage.getItem('username');
  if (userData && userData !== 'undefined') {
    setUserName(userData);
  }
}, []);

  const handleChange = (e, machineId, nozzleNum, field) => {
    setFormData((prev) => ({
      ...prev,
      [machineId]: {
        ...prev[machineId],
        [nozzleNum]: {
          ...prev[machineId]?.[nozzleNum],
          [field]: e.target.value,
        },
      },
    }));
  };

const calculateDifference = () => {
  const output = {};
  let diesel = 0;
  let petrol = 0;

  for (const machineId in formData) {
    const machine = formData[machineId];
    output[machineId] = {};

    for (const nozzleNum in machine) {
      const { start, end, test } = machine[nozzleNum] || {};
      const s = parseFloat(start) || 0;
      const e = parseFloat(end) || 0;
      const t = parseFloat(test) || 0;
      const diff = e - s - t;

      output[machineId][nozzleNum] = diff;

      const nozzleInt = parseInt(nozzleNum, 10);
      if (nozzleInt === 1 || nozzleInt === 2) {
        diesel += diff;
      } else if (nozzleInt === 3 || nozzleInt === 4) {
        petrol += diff;
      }
    }
  }

  // Set values in state
  setTotalPetrol(petrol);
  setTotalDiesel(diesel);

  console.log("Volume Sold (per nozzle):", output);
  console.log("Total Petrol Sold:", petrol.toFixed(2), "litres");
  console.log("Total Diesel Sold:", diesel.toFixed(2), "litres");

  alert("Calculated! Scroll down to see totals.");
};


  return (
    <Box display="flex" justifyContent="center">
  <Box width="80%" maxWidth="100%">
    {/* your form goes here */}


      <Tabs value={tabIndex} onChange={(e, newVal) => setTabIndex(newVal)} centered>
        <Tab label="Nozzle Entry" />
        <Tab label="Dip Calculation" />
        <Tab label="Payment" />
        <Tab label="Density Check" />
      </Tabs>
        {userName && (
  <h5 variant="subtitle1" mb={2}>
    Welcome, {userName}
  </h5>
)}

      <TabPanel value={tabIndex} index={0}>
        <Box maxWidth={300} mb={3}>
          <TextField
            fullWidth
            type="datetime-local"
            label="Date & Time"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        {machines.map((machine) => (
          <Paper key={machine.id} sx={{ p: 2, mb: 4 }}>
            <Typography variant="h6">{machine.type} ({machine.id})</Typography>

            {/* Starting Readings */}
            <Typography variant="subtitle1" mt={2} mb={1}>Starting Readings (Vtot)</Typography>
            <Grid container spacing={2}>
              {machine.nozzles.map((nozzle) => (
                <Grid item xs={12} md={3} key={nozzle.number}>
                  <TextField
                    fullWidth
                    label={`Nozzle ${nozzle.number} (${nozzle.fuel})`}
                    type="number"
                    onChange={(e) => handleChange(e, machine.id, nozzle.number, 'start')}
                    margin="dense"
                  />
                </Grid>
              ))}
            </Grid>

            {/* Ending Readings */}
            <Typography variant="subtitle1" mt={3} mb={1}>Ending Readings(Vtot)</Typography>
            <Grid container spacing={2}>
              {machine.nozzles.map((nozzle) => (
                <Grid item xs={12} md={3} key={nozzle.number}>
                  <TextField
                    fullWidth
                    label={`Nozzle ${nozzle.number} (${nozzle.fuel})`}
                    type="number"
                    onChange={(e) => handleChange(e, machine.id, nozzle.number, 'end')}
                    margin="dense"
                  />
                </Grid>
              ))}
            </Grid>

            {/* Testing Done */}
            <Typography variant="subtitle1" mt={3} mb={1}>Testing (Litres)</Typography>
            <Grid container spacing={2}>
              {machine.nozzles.map((nozzle) => (
                <Grid item xs={12} md={3} key={nozzle.number}>
                  <TextField
                    fullWidth
                    label={`Nozzle ${nozzle.number} (${nozzle.fuel})`}
                    type="number"
                    onChange={(e) => handleChange(e, machine.id, nozzle.number, 'test')}
                    margin="dense"
                  />
                </Grid>
              ))}
            </Grid>

            {/* Placeholder for Volume Total */}
            <Typography variant="body2" mt={2} fontStyle="italic">
              Volume totals will be calculated on submission.
            </Typography>
          </Paper>
        ))}

        <Button
  variant="contained"
  onClick={calculateDifference}
  sx={{ mt: 3, mb: 4 }} // Adds margin-top and margin-bottom
>
  Final Submit
</Button>

  <Box mt={4} mb={16} p={2} sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}>
    <Typography variant="h6">Total Volume Sold</Typography>
    <Typography>🟠 Petrol: <strong>{totalPetrol.toFixed(2)} L</strong></Typography>
    <Typography>🟤 Diesel: <strong>{totalDiesel.toFixed(2)} L</strong></Typography>
  </Box>

      </TabPanel>

      {/* Other Tabs Placeholder */}
      <TabPanel value={tabIndex} index={1}><Typography>Dip Calculation form here</Typography></TabPanel>
      <TabPanel value={tabIndex} index={2}><PaymentsTab /></TabPanel>
      <TabPanel value={tabIndex} index={3}><Typography>Density Check form here</Typography></TabPanel>
        </Box>
</Box>
  );
}
