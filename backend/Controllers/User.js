const User = require("../Models/User")
const bcrypt = require("bcrypt");
module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const emailexists = await User.findOne({ email });
        if (emailexists)
            return res.json({ msg: "The email already exists", status: false })

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email, username, password: hashedPassword
        });
        return res.json({ status: true, user })
    } catch (err) {
        next(err)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
            return res.json({ msg: "Incorrect email or password", status: false })
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.json({ msg: "Incorrect email or password", status: false })
        delete user.password;

        return res.json({ status: true, user })
    } catch (err) {
        next(err);
    }
}

module.exports.getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.json({ msg: "Couldn't get the user", status: false })
        } else {
            return res.json({ status: true, user })
        }
    } catch (err) {
        next(err);
    }
}

