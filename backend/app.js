const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('./generated/prisma');
const app = express();

// CONFIGS
require('dotenv').config()
const allowedOrigin = process.env.FRONTEND_URL; 
app.use(cors({
  origin: allowedOrigin,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
  optionsSuccessStatus: 204
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', 1)
app.use(
  expressSession({
    cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000, // ms
     sameSite: 'none',
     secure: process.env.NODE_ENV != "development",
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    ),
  })
);

// ROUTES
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

module.exports = app
