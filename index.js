import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';
import logger from './service/logger.js';

import dbConnection from './connection.js';
import URL from './models/url.js';
import { checkForAuthentication, restrictTo } from './middlewares/authMiddleware.js';

/*Routes*/

import urlRoute from './routes/urlRoute.js';
import staticRoute from './routes/staticRouter.js';
import userRoute from './routes/userRoute.js';

dotenv.config();

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

dbConnection(process.env.MONGO_URL)
    .then(() => logger.info("MongoDB Connected"))
    .catch((err) => logger.error("MongoDB Connection Error", err));

// ... (middleware and routes)

app.set("view engine", "ejs");
app.set('views', path.resolve(__dirname, "./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rate Limiting: 100 requests per 15 minutes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use(limiter);

// Request Logger
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use(cookieParser());
app.use(checkForAuthentication);

// Middleware to expose user to views
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

/*
app.get('/test', async (req,res)=>{
    const allUrls=await URL.find({});
    return res.render('home',{
        urls: allUrls,
    })
})
*/

// Routes
app.use("/url", urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);


app.listen(PORT, () => logger.info(`Server started at PORT http://localhost:${PORT}/`));


/*
Project flow 
1. Initialize project (npm init) and dependencies (express, mongoose)
2. Create Schema and model for database in models/url.js
3. Create routes 
4. Create functionalities for routes in Controllers/url.js
cookies are domain specific
*/