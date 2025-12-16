const express=require('express');
const path=require('path');
const dbConnection=require('./connection')
const cookieParser=require('cookie-parser')
const URL=require('./models/url')
const {restrictToLoggedinuserOnly, checkAuth}=require('./middlewares/authMiddleware');

/*Routes*/

const urlRoute=require('./routes/urlRoute');
const staticRoute=require('./routes/staticRouter');
const userRoute=require('./routes/userRoute');

const app=express();
const PORT=3001;

dbConnection('mongodb://127.0.0.1:27017/url_shortener')
    .then(console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set('views',path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

/*
app.get('/test', async (req,res)=>{
    const allUrls=await URL.find({});
    return res.render('home',{
        urls: allUrls,
    })
})
*/

// Routes
app.use("/url", restrictToLoggedinuserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/",checkAuth, staticRoute);


app.listen(PORT, console.log(`Server started at PORT http://localhost:${PORT}/`));


/*
Project flow 
1. Initialize project (npm init) and dependencies (express, mongoose)
2. Create Schema and model for database in models/url.js
3. Create routes 
4. Create functionalities for routes in Controllers/url.js
*/