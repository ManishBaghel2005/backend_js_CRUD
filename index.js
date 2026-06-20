import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js';
import router from './routes/contacts.routes.js';

dotenv.config();

const app = express();
db();

app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'))

app.use('/', router)


app.listen(process.env.PORT,()=>{
    console.log(`This is Running on port ${process.env.PORT}`);
})