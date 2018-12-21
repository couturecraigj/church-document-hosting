import { Router } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import signup from './signup';
import push from './push';
import subscription from './subscription';
import login from './login';

const preppedCors = cors({
  origin: true,
  methods: ['POST', 'GET'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Access-Control-Allow-Credentials',
    'x-xsrf-token'
  ],
  exposedHeaders: [
    'Content-Type',
    'Authorization',
    'Access-Control-Allow-Credentials',
    'Access-Control-Allow-Headers'
  ],
  // preflightContinue: true,
  credentials: true
});

const app = Router();

app.use(morgan('combined'));
// app.options("*", preppedCors);
app.use(preppedCors);
app.use(bodyParser.json());
app.use('/push', push);
app.use('/subscription', subscription);
app.use('/signup', signup);
app.use('/login', login);

export default app;
