const router = require("express").Router();
const { body } = require('express-validator');

const User = require("../models/user");
const validateon = require("../middleweres/validation");
const userContoroller = require("../controllers/user")
const tokenHandler = require("../middleweres/tokenHandler")

// ユーザー新規登録用API
router.post("/register",
    // バリデーションチェック 
    body("username")
        .isLength({ min: 2 })
        .withMessage("ユーザ名は2文字以上である必要があります"),
    body("password")
        .isLength({ min: 5 })
        .withMessage("パスワードは5文字以上である必要があります"),
    body("confirmPassword")
        .isLength({ min: 5 })
        .withMessage("確認用パスワードは5文字以上である必要があります"),
    body("username").custom((value) => {
        return User.findOne({ username: value }).then((user) => {
            if (user) {
                return Promise.reject("このユーザーはすでに使われています")
            }
        });
    }),
    validateon.validate,
    userContoroller.register
)

//ログイン用API
router.post("/login",
    body("username")
        .isLength({ min: 2 })
        .withMessage("ユーザ名は2文字以上である必要があります"),
    body("password")
        .isLength({ min: 5 })
        .withMessage("パスワードは5文字以上である必要があります"),
    validateon.validate,
    userContoroller.login
);

//JWT認証用API
router.post("/verify-token", tokenHandler.verifyToken, (req, res) => {
    return res.status(200).json({ user: req.user });
});


module.exports = router;