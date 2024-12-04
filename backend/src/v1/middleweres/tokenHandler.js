const JWT = require("jsonwebtoken");
const User = require("../models/user")
// クライアントから渡されたJWTが正常か検証
const tokenDecode = (req) => {
    const authorizationHeader = req.headers["authorization"];
    if (authorizationHeader) {
        const bearer = authorizationHeader.split(" ")[1];
        try {
            const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
            return decodedToken;
        } catch (error) {
            console.error("JWT verification failed:", error); 
            return false;
        }
    } else {
        return false;
    }
};

//JWT認証をするためのミドルウェア
exports.verifyToken = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);
    if (tokenDecoded) {
        try {
            const user = await User.findById(tokenDecoded.id);
            if (!user) {
                return res.status(401).json("JWTと一致するユーザーが見つかりません");
            }
            req.user = user;
            next();
        } catch (error) {
            return res.status(500).json("ユーザー情報の取得に失敗しました");
        }
    } else {
        return res.status(401).json("トークンのデコードに失敗しました");
    }
};
