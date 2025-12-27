import shortid from 'shortid';
import URL from '../models/url.js';
import { z } from 'zod';
import { asyncHandler } from '../utils/asyncHandler.js';

export const generateNewShortURL = asyncHandler(async (req, res) => {
    const body = req.body;

    // Zod Validation schema
    const schema = z.object({
        url: z.string().url({ message: "Invalid URL format" })
    });

    const result = schema.safeParse(body);

    if (!result.success) {
        return res.status(400).json({ error: result.error.errors[0].message });
    }

    let entry = await URL.findOne({ redirectURL: body.url });
    if (entry) {
        const allUrls = await URL.find();
        return res.render('home', { id: entry.shortId, urls: allUrls })
    }
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    const allUrls = await URL.find();
    return res.render("home", {
        id: shortID,
        urls: allUrls,
    })
});

export const handleRedirectURL = asyncHandler(async (req, res) => {
    const shortId = req.params.shortId;

    // Input Sanitation: Ensure shortId only contains alphanumeric characters, _ and -
    if (!/^[a-zA-Z0-9_-]+$/.test(shortId)) {
        return res.status(400).render('home', { error: "Invalid short link format" });
    }

    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            }
        }
    );
    if (!entry) {
        return res.status(404).render('home', { error: "Link not found or expired" });
    }
    res.redirect(entry.redirectURL);
});

export const handledeleteURL = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const url = await URL.findById(id);

    if (!url) {
        return res.status(404).json({ message: "URL not found" });
    }

    // IDOR Check: user must be creator or admin
    if (url.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'ADMIN') {
        return res.status(401).json({ error: "Unauthorized" });
    }

    await URL.findByIdAndDelete(id);
    return res.status(200).json({ message: "deleted", URL: url })
});

export const handleGetAnalytics = asyncHandler(async (req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    if (!result) return res.status(404).json({ error: "Not found" });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
});