const Url = require("../model/url");



async function handelAllUrls(req,res) {
    try{

        const allUrls=await Url.find({});
        res.render('home',{allUrls});
    }
    catch{
        res.render('home',{data:"data failed to load"});
    }
    
}


function randomUrl(length) {
    const digit = "abcdefghijklmnopqrstuvwxyz0123456789";
    let url = "";
    for (let i = 0; i < length; i++) {
        url += digit.charAt(Math.floor(Math.random() * digit.length));
    }
    return url;
}

async function handelInputUrl(req, res) {
    try {
        const { originUrl } = req.body;
        if (!originUrl) {
            return res.status(400).json({ msg: "Origin URL is required" });
        }

        const shortID = randomUrl(6);
        const newUrl = await Url.create({
            shortID,
            originUrl,
            visitHistory: []
        });

        res.status(201).json(newUrl);
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
}


async function handleRedirectUrl(req, res) {
    try {
        const shortID = req.params.id;

        // Find the URL document first
        const entry = await Url.findOne({ shortID });

        if (!entry) {
            return res.status(404).json({ msg: "URL not found" });
        }

        // Append new visit history (push instead of overwrite)
        entry.visitHistory.push({ time: Date.now() });
        await entry.save();

        // Redirect to the original URL
        res.redirect(entry.originUrl);
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
}



module.exports = { handelInputUrl,handleRedirectUrl,handelAllUrls };
