import express from 'express';
import {
  createQuestion,
  getQuestionById,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
} from '../controllers/questionController.js';
import { verifyRole } from '../middlewares/verifyRole.js';

const router = express.Router();

router.post('/new', verifyRole('maintainer'), createQuestion);
router.get('/', verifyRole(['user', 'maintainer']), getAllQuestions);
router.get('/:id', verifyRole(['user', 'maintainer']), getQuestionById);
router.patch('/:id', verifyRole('maintainer'), updateQuestion);
router.delete('/:id', verifyRole('maintainer'), deleteQuestion);

export default router;
