const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clockSchema = new mongoose.Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      clockIn: {
        type: Date,
        required: true,
      },
      clockOut: {
        type: Date,
        validate: {
          validator: function (value) {
            return !this.clockIn || value > this.clockIn;
          },
          message: "退勤時刻は出勤時刻より後である必要があります。",
        },
      },
      breakStart: {
        type: Date,
        validate: {
          validator: function (value) {
            return !this.clockIn || value > this.clockIn;
          },
          message: "休憩開始時刻は出勤時刻より後である必要があります。",
        },
      },
      breakEnd: {
        type: Date,
        validate: {
          validator: function (value) {
            return !this.breakStart || value > this.breakStart;
          },
          message: "休憩終了時刻は休憩開始時刻より後である必要があります。",
        },
      },
      
      position: {
        type: Number,
        default: 0,
        unique: true,
      },
      status: {
        type: String,
        enum: ["clocked-in", "clocked-out"],
        default: "clocked-in",
      },
    },
    { timestamps: true } // 自動的に `createdAt` と `updatedAt` を管理
  );
  

module.exports = mongoose.model("Clock", clockSchema);
