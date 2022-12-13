import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import BookModel from '../models/User';
import bookController from '../controllers/BookController';

const validateBookId = async (req: Request, res: Response, next: NextFunction) => {
  const user = await BookModel.findByPk(req.params.bookId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  next();
}

router.get('/books', bookController.index);

router.post('/books', bookController.create);

router.get('/books/:bookId', validateBookId, bookController.show);

router.put('/books/:bookId', validateBookId, bookController.update);

router.delete('/books/:bookId', validateBookId, bookController.delete);

export default router;
