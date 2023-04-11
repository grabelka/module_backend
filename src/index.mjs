import express from 'express';
import bodyParser from 'body-parser';
import studentRouter from './controller/students.mjs';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/students', studentRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})