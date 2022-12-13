import cors from 'cors';
import express from 'express';
const router = express.Router();
import users from './users';
import login from './login';
import states from './states';
import cities from './cities';
import books from './books';

router.use(cors());

router.use(login);
router.use(users);
router.use(states);
router.use(cities);
router.use(books);

export default router;
