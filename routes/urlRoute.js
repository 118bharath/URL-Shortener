const express=require('express');
const {generateNewShortURL, handledeleteURL, handleRedirectURL, handleGetAnalytics}=require('../controllers/url')

const router=express.Router();

router.post('/', generateNewShortURL);
router.delete('/:id', handledeleteURL),
router.get('/:shortId', handleRedirectURL),
router.get('/analytics/:shortId', handleGetAnalytics)

module.exports=router;