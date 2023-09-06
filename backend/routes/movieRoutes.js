import express from 'express';
import { getmovies, getmoviesbyid, postmovies } from '../controllers/movieControllers.js';

const movieRouter = express.Router();

movieRouter.get('/',getmovies);
movieRouter.get('/:id',getmoviesbyid);
movieRouter.post('/',postmovies);

export default movieRouter;