// Main starting point of the application
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import morgan from "morgan";
import router from "./router";
import mongoose from "mongoose";
import cors from 'cors';

const app = express();
// DB Setup
mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true });

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
const port = process.env.Port || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
