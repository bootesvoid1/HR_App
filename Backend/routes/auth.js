const router = require("express").Router();
const User = require('../models/admin');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { checkLogin } = require("./userMiddleware");

router.post("/register", async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            password: CryptoJS.AES.encrypt(
                req.body.password,
                process.env.CRYPTOJS_KEY
            ).toString(),
            isAdmin : req.body.isAdmin
        });



        const savedUser = await newUser.save();
        console.log(savedUser)
        const { password, ...others } = savedUser._doc;
        res.status(200).json(others);
    } catch (err) {

        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json({ error: "Invalid username" });
        }

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.CRYPTOJS_KEY
        );
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== req.body.password) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
                username: user.username,
            },
            process.env.JWT_SECRET,
            { expiresIn: "200d" }
        );

        const { password, ...others } = user._doc;

        res.status(200).json({ ...others, accessToken });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/check", checkLogin, async (req, res) => {
    res.status(201).json(req.user);
});
router.get("/loggedinUser", checkLogin, (req, res) => {
    res.status(200).json(req.user);
});

module.exports = router;
