const { getUser } = require("../utility/user");

async function restrictToLoginUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;
    if (!userUid) {
        return res.redirect("/user/login")
        //return res.status(401).json({ err: "Please log in from /login" });
    }

    const user = getUser(userUid);
    if (!user) {
        return res.status(401).json({ err: "Invalid session. Please log in again." });
    }

    req.user = user;
    next();
}

module.exports = { restrictToLoginUserOnly };
