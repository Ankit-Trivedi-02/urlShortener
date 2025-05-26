const User = require("../model/user");
const { v4: uuid } = require("uuid")
const { setUser, getUser } = require("../utility/user")


function loadSignUpPage(req, res) {
    res.render('sign-up');
}

function loadLoginPage(req, res) {
    const userId = req.cookies?.uid; 
    
    if (!userId) {
        return res.render('login');
    }

    const user = getUser(userId);

    if (!user) {
        return res.render('login');
    }

    res.redirect("/url");
}



async function createUser(req, res) {
    try {
        if (!req.body) {
            return res.status(400).json({ err: "Request body is missing" });
        }

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ err: "All fields are required" });
        }

        if (password.length < 8) {
            return res.status(400).json({ err: "Password must have at least 8 characters" });
        }

        const newUser = await User.create({ name, email, password });
        res.redirect("/user/login");
        // return res.status(201).json({ success: "User created successfully", user: { name: newUser.name, email: newUser.email } });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ err: "All fields are required" });
        }

        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials!" });
        }
        const sessionId = uuid();
        setUser(sessionId, user);
        res.cookie("uid", sessionId).redirect("/url");
        //return res.status(200).cookie("uid", sessionId).json({ success: "You are logged in" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { loadSignUpPage, loadLoginPage, createUser, loginUser };
