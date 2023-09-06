import express  from 'express';
import { deletebooking, getbookindbyId, postbooking } from '../controllers/bookingControllers.js';

const bookingRouter = express.Router();

bookingRouter.get('/:id',getbookindbyId);
bookingRouter.post('/',postbooking);
bookingRouter.delete('/:id',deletebooking);

export default bookingRouter;