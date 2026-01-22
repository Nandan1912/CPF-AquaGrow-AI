const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const rand = (min, max, d = 1) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(d));

const calculateHealth = (m) => {
  let score = 100;
  if (m.ph < 7.5 || m.ph > 8.2) score -= 10;
  if (m.oxygen < 5) score -= 25;
  if (m.temperature < 26 || m.temperature > 30) score -= 10;
  if (m.ammonia > 0.3) score -= 25;
  if (score < 0) score = 0;

  const status = score >= 75 ? 'Healthy' : score >= 45 ? 'Warning' : 'Critical';
  return { score, status };
};

const generateMetrics = () => ({
  ph: rand(7.0, 8.5),
  oxygen: rand(3.5, 7.5),
  temperature: rand(25, 32),
  ammonia: rand(0.1, 0.7, 2),
  updatedAt: new Date().toISOString(),
});

let ponds = [];

// API ROUTES
app.get('/api/ponds', (req, res) => res.json(ponds));

app.post('/api/ponds', (req, res) => {
  const { name, breed, location } = req.body;
  const pond = {
    id: Date.now().toString(),
    name, breed, location,
    isHighPriority: false,
    device: { paired: false },
    metrics: null,
    healthScore: null,
    healthStatus: null,
  };
  ponds.unshift(pond);
  res.json(ponds);
});

// FIXED: Generates metrics immediately on pair
app.post('/api/ponds/:id/pair', (req, res) => {
  ponds = ponds.map((p) => {
    if (p.id === req.params.id) {
      const metrics = generateMetrics();
      const { score, status } = calculateHealth(metrics);
      return { 
        ...p, 
        device: { paired: true }, 
        metrics, 
        healthScore: score, 
        healthStatus: status 
      };
    }
    return p;
  });
  res.json({ success: true });
});

app.post('/api/device/hello', (req, res) => res.json({ status: 'ok' }));

app.patch('/api/ponds/:id/priority', (req, res) => {
  ponds = ponds.map((p) => p.id === req.params.id ? { ...p, isHighPriority: !p.isHighPriority } : p);
  res.json(ponds);
});

app.listen(PORT, '0.0.0.0', () => console.log(`Backend running on port ${PORT}`));