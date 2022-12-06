const User = require("../Models/User")
const bcrypt = require("bcrypt");
module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const emailexists = await User.findOne({ email });
        const usernameExists = await User.findOne({ username })
        if (emailexists)
            return res.json({ msg: "The email already exists", status: false })
        if (usernameExists)
            return res.json({ msg: "The username already exists", status: false })
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email, username, password: hashedPassword
        });
        sendToken(user, 200, res);
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

        sendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
}

module.exports.getUser = async (req, res, next) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.json({ msg: "Couldn't get the user", status: false })
        } else {
            return res.json({ status: true, user })
        }
    } catch (err) {
        next(err);
    }
}

module.exports.updateUserAvatar = async (req, res, next) => {
    try {
        const { avatar, userId } = req.body;

        User.findOneAndUpdate(
            { _id: userId },
            { avatarImage: avatar },
            function (error, success) {
                if (error) {
                    return res.json({ status: false, error })
                } else {
                    console.log(success);
                    return res.json({ status: true })

                }
            });
    } catch (err) {
        next(err);
    }
}

module.exports.setUserDescription = async (req, res, next) => {
    try {

        User.findOneAndUpdate(
            { _id: req.body.userId },
            { description: req.body.description },
            function (error, success) {
                if (error) {
                    return res.json({ status: false, error })
                } else {
                    return res.json({ status: true })
                }
            });
    } catch (err) {
        next(err);
    }
}

module.exports.updateSocialMedia = async (req, res, next) => {
    try {
        const { facebook, instagram, reddit } = req.body;
        if (facebook) {
            User.findByIdAndUpdate(req.body.userId, { $set: { 'socialMedia.facebook': facebook } }, function (err, doc) {
                if (err) {
                    return res.json({ status: false, err })
                } else {
                    return res.json({ status: true })
                }
            });
        }
        if (instagram) {
            User.findByIdAndUpdate(req.body.userId, { $set: { 'socialMedia.instagram': instagram } }, function (err, doc) {
                if (err) {
                    return res.json({ status: false, err })
                } else {
                    return res.json({ status: true })
                }
            });
        }
        if (reddit) {
            User.findByIdAndUpdate(req.body.userId, { $set: { 'socialMedia.reddit': reddit } }, function (err, doc) {
                if (err) {
                    return res.json({ status: false, err })
                } else {
                    return res.json({ status: true })
                }
            });
        }
    } catch (err) {
        next(err);
    }
}
const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({
        status: true,
        user,
        token,
    });
};