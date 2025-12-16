const shortid =require('shortid');
const URL=require('../models/url');

const generateNewShortURL= async(req,res)=>{
    const body=req.body;
    if(!body.url) return res.status(404).json({error: "url error"});

    let entry=await URL.findOne({redirectURL:body.url});
    if (entry){
        const allUrls=await URL.find();
        return res.render('home', {id: entry.shortId, urls: allUrls})
    }
    const shortID=shortid();
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[],
        createdBy:req.user._id,
    });
    const allUrls=await URL.find();
    return res.render("home", {
        id:shortID,
        urls: allUrls,
    })
};

const handleRedirectURL=async(req,res)=>{
    const shortId=req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        { 
            $push : {
                visitHistory: {
                    timestamp:Date.now(),
                }
            }
        }
    );
    res.redirect(entry.redirectURL);
};

const handledeleteURL=async(req,res)=>{
    const deleted=await URL.findByIdAndDelete(req.params.id);
    if(!deleted) return res.status(404).json({message:"User not found"});
    return res.status(200).json({message:"deleted", URL:deleted})
}

const handleGetAnalytics=async(req,res)=>{
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory,
    })
}

module.exports={
    generateNewShortURL,
    handledeleteURL,
    handleRedirectURL,
    handleGetAnalytics,
};