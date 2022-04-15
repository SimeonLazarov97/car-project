import express, { Express } from 'express';
import cors from 'cors';
const { corsConfig } = require('./corsConfig');

const middlewareSetup = (app: Express) => {
  app.use(cors(corsConfig));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};

export { middlewareSetup };
