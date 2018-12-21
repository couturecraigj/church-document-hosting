import { Router } from 'express';

const app = Router();

app.post('/', (req, res) => {
  console.log(req.body);
  res.json({ status: 'GOOOOOOOOOOD!!' });
});
app.delete('/', (req, res) => {});

export default app;
