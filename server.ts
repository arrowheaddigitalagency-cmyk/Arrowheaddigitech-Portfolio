import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import contactHandler from './api/contact';

const app = express();
app.use(cors());
app.use(express.json());

// Mock Vercel request/response behavior for local Express server
app.post('/api/contact', async (req, res) => {
  try {
    // Basic req/res mapping for Vercel handler
    await contactHandler(req as any, res as any);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Local API server running on http://localhost:${PORT}`);
});
