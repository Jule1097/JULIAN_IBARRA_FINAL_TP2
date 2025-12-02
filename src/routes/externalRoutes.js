import { Router } from 'express';
import { externalController } from '../controllers/external.controller.js';

export const externalRouter = Router();

externalRouter.get('/albums/csv', externalController.getExternalCSV);