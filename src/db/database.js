import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_DB_PASSPORT = process.env.MONGO_DB_PASSPORT;

mongoose
  .connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.tsqrh.mongodb.net/${MONGO_DB_PASSPORT}?retryWrites=true&w=majority`
  )
  .then((response) => console.log("conectado a la base de datos"))
  .catch((err) => console.log(err));
