const JWT = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const User = require("../models/user");

// ユーザー登録
exports.register = async (req, res) => {
    //パスワードの受け取り
    const password = req.body.password;
    try {
        //パスワードの暗号化
        req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
        const user = await User.create(req.body);
        //JWT
        const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
            expiresIn: '24h',
        });
        return res.status(200).json({ user, token });
    } catch (err) {
        return res.status(500).json({ message: "登録に失敗しました。" });
    }
}

//ユーザーログイン用API
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(401).json({
                errors: [
                    {
                        param: "username",
                        msg: "ユーザー名が無効です"
                    }
                ]
            });
        }
        // パスワードを複合
        const descryptedPassward = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_KEY,
        ).toString(CryptoJS.enc.Utf8);
        if (descryptedPassward !== password) {
            return res.status(401).json({
                errors: [
                    {
                        param: "password",
                        msg: "パスワードが無効です"
                    }
                ]
            });
        }

        //JWT発行
        const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
            expiresIn: '24h',
        });

        return res.status(201).json({ user, token })
    } catch (err) {
        return res.status(500).json({ message: "ログインに失敗しました" });
    }
}


