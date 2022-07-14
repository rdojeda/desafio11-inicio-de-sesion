import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import './db/database.js';
import passport from 'passport';
import './passport/local.js';
import 'dotenv/config';
import apiRoutes from './routes/apiRoutes.js';


const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_DB_SESSION = process.env.MONGO_DB_SESSION;
const PORT = process.env.PORT

const app = express()

//Middlewares 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'secretKey',
    store: MongoStore.create({
        mongoUrl:
        `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.tsqrh.mongodb.net/${MONGO_DB_SESSION}?retryWrites=true&w=majority`,
        
    }),
    cookie: { expires: 10 * 60 * 1000 } //10 minutos 
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', apiRoutes)

app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT} `)
})

