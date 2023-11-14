//user-service/backend/routes/attempts.js
import dotenv from 'dotenv';
import express from 'express';
import { addAttempt, getAttemptsByUser, getAttemptById } from "../db/controllers/attemptsController.js"
import { body, param, validationResult } from 'express-validator';
import { checkUserExists } from "../middlewares/userMiddleware.js";
import { checkQuestionExists } from "../middlewares/attemptsMiddleware.js";

dotenv.config();
const router = express.Router();

// Create new question attempt by a user (A user is uniquely identified by their email)
router.post('/:email', param('email').isEmail().escape(), body(['question_id', 'question_title', 'code']).notEmpty().escape(),
    checkUserExists(), checkQuestionExists(), async (req, res) => {
        try {
            const validationRes = validationResult(req);
            if (!(validationRes.isEmpty())) { // If validation fails
                return res.status(400).json(validationRes.array()); // Return all error messages
            }
            const { email } = req.params;
            const { question_id, question_title, code } = req.body;
            await addAttempt(email, question_id, question_title, code);
            res.status(200).json({message: `Attempt for question ${question_id} by ${email} created successfully`})
        } catch (error) {
            console.log(error);
            res.status(502).json({message: 'Internal Server Error'});
        }
    });

// Get all attempts by a user
router.get('/:email', param('email').notEmpty().isEmail().escape(), checkUserExists(), async (req, res) => {
    try {
        const validationRes = validationResult(req);
        if (!validationRes.isEmpty()) { // If validation fails
            return res.status(400).json(validationRes.array()); // Return all error messages
        }
        const { email } = req.params;
        console.log(`Retrieving all attempts by ${email}`);
        const result = await getAttemptsByUser(email);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(502).json({message: 'Internal Server Error'});
    }
});

// Get a single attempt
router.get('/:email/:attempt_id', param('attempt_id').notEmpty().escape(), async (req, res) => {
    try {
        const validationRes = validationResult(req);
        if (!validationRes.isEmpty()) { // If validation fails
            return res.status(400).json(validationRes.array()); // Return all error messages
        }
        const { attempt_id, email } = req.params;
        console.log(`Retrieving attempt ${attempt_id} by ${email}`);
        const result = await getAttemptById(attempt_id);
        if (result.email !== email) {
            return res.status(401);
        }
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(502).json({message: 'Internal Server Error'});
    }
});

export default router;