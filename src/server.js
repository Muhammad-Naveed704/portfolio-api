import express from 'express';
import http from 'http';
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
import authRouter from './routes/auth.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 4000;
const corsOrigin = process.env.CORS_ORIGIN || '*';

app.use(helmet());
app.use(compression());
app.use(cors({ origin: corsOrigin }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('tiny'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/projects', projectsRouter);
app.use('/api/auth', authRouter);

const contactLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/contact', contactLimiter, contactRouter);
app.use('/api/experience', experienceRouter);

// Socket.IO setup
import { Server as IOServer } from 'socket.io';
const io = new IOServer(server, {
  cors: { origin: corsOrigin, methods: ['GET', 'POST'] },
});

io.on('connection', (socket) => {
  socket.on('chat:message', (payload) => {
    const safe = {
      name: String(payload?.name || 'Guest').slice(0, 60),
      message: String(payload?.message || '').slice(0, 2000),
      at: Date.now(),
    };
    io.emit('chat:message', safe);
  });
});

app.use(notFound);
app.use(errorHandler);

if (process.env.MONGO_URI) {
  connectDb()
    .then(() => {
      server.listen(port, () => console.log(`API + Socket.IO on ${port}`));
    })
    .catch((err) => {
      console.error('DB connection failed', err);
      server.listen(port, () => console.log(`API (no DB) + Socket.IO on ${port}`));
    });
} else {
  console.warn('MONGO_URI not set; running without DB.');
  server.listen(port, () => console.log(`API + Socket.IO on ${port}`));
}


