import express from 'express';
import URL from '../models/url.js';
import { restrictTo } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/admin/urls', restrictTo(['ADMIN']), async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('admin', {
        urls: allUrls,
    })
})

router.get('/', async (req, res) => {
    let allUrls = [];
    if (req.user) {
        allUrls = await URL.find({ createdBy: req.user._id });
    }
    return res.render('home', {
        urls: allUrls,
    })
})

router.get('/signup', (req, res) => {
    return res.render('signup');
})
router.get('/login', (req, res) => {
    return res.render('login');
})

export default router;