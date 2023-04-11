import express from 'express';
import jwt from 'jsonwebtoken';
import { saveStudent, getAllStudents } from '../services/students.mjs';

const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.body.token;
  
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }
  
  try {
    const decoded = jwt.verify(token, 'SecretKey');
    req.body.nick = decoded.nick;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

router.get('/', async (req, res) => {
  const results = await getAllStudents();
  res.status(200).json(results);
});

router.post('/', verifyToken, async (req, res) => {
  const student = {
    nick: req.body.nick,
    name: req.body.name,
    surname: req.body.surname,
  };
  const result = await saveStudent(student);
  res.status(201).json(result);
})

router.get('/:student', (req, res) => {
  const token = jwt.sign({ nick: req.params.student }, 'SecretKey', { expiresIn: '1h' });
  res.status(200).json(token);
})

export default router;