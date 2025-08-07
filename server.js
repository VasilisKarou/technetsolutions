const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Αρχείο όπου αποθηκεύονται οι αιτήσεις
const DATA_FILE = path.join(__dirname, 'requests.json');

// POST endpoint για αποθήκευση αίτησης
app.post('/api/request', (req, res) => {
  const newRequest = req.body;

  let requests = [];
  if (fs.existsSync(DATA_FILE)) {
    try {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      requests = JSON.parse(data);
    } catch (error) {
      console.error('Σφάλμα στην ανάγνωση του αρχείου:', error);
      return res.status(500).json({ message: 'Σφάλμα στο διακομιστή' });
    }
  }

  requests.push(newRequest);

  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(requests, null, 2), 'utf-8');
  } catch (error) {
    console.error('Σφάλμα στην αποθήκευση:', error);
    return res.status(500).json({ message: 'Σφάλμα στο διακομιστή' });
  }

  res.status(201).json({ message: 'Αίτηση καταχωρήθηκε επιτυχώς' });
});

// Εκκίνηση διακομιστή
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
