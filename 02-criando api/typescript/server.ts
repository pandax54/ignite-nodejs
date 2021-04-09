import express from 'express';
import { createCourse } from './src/routes';

const app = express()

app.get("/", createCourse)

app.listen(3000)