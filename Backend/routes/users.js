const User = require("../models/admin");
const CryptoJS = require("crypto-js");
const { checkLogin } = require("./userMiddleware");
const router = require("express").Router();

const encryptPassword = (password) => {
    return CryptoJS.AES.encrypt(
        password,
        process.env.CRYPTOJS_KEY
    ).toString();
}

const omitPassword = (user) => {
    const { password, ...others } = user._doc;
    return others;
}

// UPDATE
// Middleware to verify current password
const verifyCurrentPassword = async (req, res, next) => {
    try {
      const { currentPassword } = req.body;
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const isPasswordValid = user.comparePassword(currentPassword);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid current password" });
      }
  
      req.user = user; // Attach the user object to the request for later use
      next();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  router.put("/:id", verifyCurrentPassword, async (req, res) => {
    try {
        const { password } = req.body;
        const updatedFields = {};

        if (password && password.length > 5) {
            updatedFields.password = encryptPassword(password);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updatedFields }, // Specify the fields to update
            { new: true }
        );

        res.status(200).json(omitPassword(updatedUser));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

  
// DELETE
router.delete("/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET USER
router.get("/find/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(omitPassword(user));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET ALL USER
router.get("/",checkLogin ,async (req, res) => {
    try {
        const users = await User.find().limit(5).sort({ createdAt: -1 });
        res.status(200).json(users.map(omitPassword));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});


module.exports = router;
