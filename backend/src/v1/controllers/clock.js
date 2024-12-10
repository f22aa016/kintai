const Clock = require("../models/clock");
const moment = require('moment-timezone');

// 日本時間を取得
const clockInTokyo = moment().tz('Asia/Tokyo').toDate();

exports.clockIn = async (req, res) => {
  try {
    const clockCount = await Clock.estimatedDocumentCount();

    // Clock 作成
    const clock = await Clock.create({
      user: req.user._id,
      position: clockCount > 0 ? clockCount : 0,
      clockIn: clockInTokyo, // 現在時刻を自動設定
    });

    // 作成された Clock オブジェクトを返す
    res.status(201).json(clock);
  } catch (err) {
    console.error("作成中のエラー:", err);
    res.status(500).json({
      message: "サーバーエラーが発生しました。",
      error: err.message,
    });
  }
};

exports.clockOut = async (req, res) => {
  try {
    console.log("===== デバッグログ: clockOut メソッド開始 =====");
    
    // リクエストされたユーザー情報
    console.log("リクエストユーザーID: ", req.user?._id);

    // 検索条件のログ
    const searchCondition = { 
      user: req.user._id, 
      clockOut: { $exists: false } // clockOut が未設定のレコードを探す 
    };
    console.log("検索条件: ", searchCondition);

    // 未完了の clockIn レコードを取得
    const clock = await Clock.findOne(searchCondition);

    // 検索結果のログ
    if (!clock) {
      console.log("未完了の勤務記録が見つかりません。");
      return res.status(404).json({ message: "未完了の勤務記録が見つかりません。" });
    }
    console.log("見つかった勤務記録: ", clock);

    // clockOut を現在時刻に設定
    const now = new Date();
    console.log("現在時刻を設定: ", now);
    clock.clockOut = now;

    // 保存処理
    await clock.save();
    console.log("勤務記録を更新しました: ", clock);

    res.status(200).json(clock);
  } catch (err) {
    // エラー時のログ
    console.error("エラー発生: ", err);
    res.status(500).json({
      message: "サーバーエラーが発生しました。",
      error: err.message,
    });
  }
};





exports.getAll = async (req, res) => {
  try {
    const memos = await Clock.find({user: req.user._id}).sort("-position");
    res.status(200).json(memos);
  } catch (err){
    console.error("メモ取得中のエラー:", err); 
    res.status(500).json({ message: "サーバーエラーが発生しました。" }); 
  }
};

exports.getOne = async (req, res) => {
  const {memoId} = req.params;
  try {
    const memo = await Clock.findOne({user : req.user._id, _id: memoId});
    if(!memo) return res.status(404).json("メモが存在しません");
    res.status(200).json(memo);
  } catch (err){
    console.error("メモ取得中のエラー:", err); 
    res.status(500).json({ message: "サーバーエラーが発生しました。" }); 
  }
};

exports.update = async (req, res) => {
  const {memoId} = req.params;
  const { title, discription } = req.body;
  try {
    
    if(title === "")req.body.title = "無題";
    if(discription === "")
      req.body.title = "自由に記入してください";
    
    const memo = await Clock.findOne({user : req.user._id, _id: memoId});
    if(!memo) return res.status(404).json("メモが存在しません");

    const updatedMemo = await Clock.findByIdAndUpdate(memoId, {
      $set: req.body,
    })

    res.status(200).json(updatedMemo);
  } catch (err){
    console.error("メモ取得中のエラー:", err); 
    res.status(500).json({ message: "サーバーエラーが発生しました。" }); 
  }
};

exports.delete = async (req, res) => {
  const {memoId} = req.params;
  try {
    const memo = await Clock.findOne({user : req.user._id, _id: memoId});
    if(!memo) return res.status(404).json("メモが存在しません");

    await Clock.deleteOne({_id: memoId});
    res.status(200).json("メモを削除しました");
  } catch (err){
    console.error("メモ削除中のエラー:", err); 
    res.status(500).json({ message: "サーバーエラーが発生しました。" }); 
  }
};