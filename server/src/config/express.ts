import express, { Express } from 'express';
import cors from 'cors';
const { corsConfig } = require('./corsConfig');

const corsOptions: cors.CorsOptions = corsConfig;

module.exports = (app: Express) => {
  app.use(cors(corsOptions));
  app.use(express.json());
};
