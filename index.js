const express=require('express');
const dbConnection=require('./connection')
const urlRoute=require('./routes/url');
// const { handleRedirectURL } = require('./controllers/url');

const app=express();
const PORT=3001;

dbConnection('mongodb://localhost:27017/url_shortener')
    .then(console.log("MongoDB Connected"));

app.use(express.json());

// Routes
app.use('/url', urlRoute);



app.listen(PORT, console.log(`Server started at PORT ${PORT}`));