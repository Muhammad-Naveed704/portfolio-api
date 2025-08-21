import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import rateLimit from 'express-rate-limit';
import projectsRouter from './routes/projects.js';
import contactRouter from './routes/contact.js';
import experienceRouter from './routes/experience.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const corsOrigin = process.env.CORS_ORIGIN || '*';

app.use(helmet());
app.use(compression());
app.use(cors({ origin: corsOrigin }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('tiny'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/projects', projectsRouter);

const contactLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/contact', contactLimiter, contactRouter);
app.use('/api/experience', experienceRouter);

app.use(notFound);
app.use(errorHandler);

if (process.env.MONGO_URI) {
  connectDb()
    .then(() => {
      app.listen(port, () => console.log(`API listening on port ${port}`));
    })
    .catch((err) => {
      console.error('DB connection failed', err);
      app.listen(port, () => console.log(`API (no DB) listening on port ${port}`));
    });
} else {
  console.warn('MONGO_URI not set; running without DB.');
  app.listen(port, () => console.log(`API listening on port ${port}`));
}


