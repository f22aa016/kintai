const router = require("express").Router();
const clockController = require("../controllers/clock")
const tokenHandler = require("../middleweres/tokenHandler")

// 勤怠記録を開始 (clockIn)
router.post("/clock-in", tokenHandler.verifyToken, clockController.clockIn);

// 勤怠記録を終了 (clockOut)
router.patch("/clock-out", tokenHandler.verifyToken, clockController.clockOut);

// ログインしているユーザーが投稿したメモを全て取得

// router.get("/", tokenHandler.verifyToken, memoContoroller.getAll);

// ログインしているユーザーが投稿したメモを一つ取得
// router.get("/:memoId", tokenHandler.verifyToken, memoContoroller.getOne);

// ログインしているユーザーが投稿したメモを一つ更新
// router.put("/:memoId", tokenHandler.verifyToken, memoContoroller.update);

// ログインしているユーザーが投稿したメモを一つ削除
// router.delete("/:memoId", tokenHandler.verifyToken, memoContoroller.delete);

module.exports = router;