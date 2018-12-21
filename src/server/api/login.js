import { Router } from 'express';

const app = Router();

app.post('/', (req, res) => {
  console.log(req.body);

  res.json(req.body);
});

export default app;
