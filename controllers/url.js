import shortid from 'shortid';
import URL from '../models/url.js';

export const generateNewShortURL = async (req, res) => {
    const body = req.body;
    if (!body.url) return res.status(404).json({ error: "url error" });

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
};

export const handleRedirectURL = async (req, res) => {
    const shortId = req.params.shortId;
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
    res.redirect(entry.redirectURL);
};

export const handledeleteURL = async (req, res) => {
    const { id } = req.params;
    const url = await URL.findById(id);

    if (!url) {
        return res.status(404).json({ message: "URL not found" });
    }

    // IDOR Check: user must be creator or admin
    if (url.createdBy.toString() !== req.user._id && req.user.role !== 'ADMIN') {
        return res.status(401).json({ error: "Unauthorized" });
    }

    await URL.findByIdAndDelete(id);
    return res.status(200).json({ message: "deleted", URL: url })
}

export const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
}