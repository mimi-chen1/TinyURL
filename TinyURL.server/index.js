import express from 'express'  
import cors from "cors"
import bodyParser from "body-parser";

import LinksRouter from './routers/LinksRoter.js';
import connectDB from './database.js';
import UserRouter from './routers/UsersRouter.js';

connectDB();
const app = express()
app.use(cors());
app.use(bodyParser.json());

const port = 3000

app.get('/', (req, res) => {
  res.send('applications routes are users & links')
})

app.use('/users', UserRouter)
app.use('/links',LinksRouter)

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
