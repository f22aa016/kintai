const router = require("express").Router();
const memoContoroller = require("../controllers/memo")
const tokenHandler = require("../middleweres/tokenHandler")

// メモを作成
router.post("/", tokenHandler.verifyToken, memoContoroller.create);
// ログインしているユーザーが投稿したメモを全て取得

router.get("/", tokenHandler.verifyToken, memoContoroller.getAll);

// ログインしているユーザーが投稿したメモを一つ取得
router.get("/:memoId", tokenHandler.verifyToken, memoContoroller.getOne);

// ログインしているユーザーが投稿したメモを一つ更新
router.put("/:memoId", tokenHandler.verifyToken, memoContoroller.update);

// ログインしているユーザーが投稿したメモを一つ削除
router.delete("/:memoId", tokenHandler.verifyToken, memoContoroller.delete);

module.exports = router;