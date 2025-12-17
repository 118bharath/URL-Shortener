import express from 'express';
import { generateNewShortURL, handledeleteURL, handleRedirectURL, handleGetAnalytics } from '../controllers/url.js';
import { restrictTo } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public Route (Redirect)
router.get('/:shortId', handleRedirectURL);

// Protected Routes
router.post('/', restrictTo(['NORMAL', 'ADMIN']), generateNewShortURL);
router.delete('/:id', restrictTo(['NORMAL', 'ADMIN']), handledeleteURL);
router.get('/analytics/:shortId', restrictTo(['NORMAL', 'ADMIN']), handleGetAnalytics);

export default router;