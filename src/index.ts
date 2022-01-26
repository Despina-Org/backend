import 'reflect-metadata';
import 'dotenv/config';
import './database';

import app from './app';

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`Online in http://localhost:${port}`));
