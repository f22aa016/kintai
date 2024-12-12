import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import clockApi from "../api/memoApi";

const PopupBar = ({ isOpen, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [maxPositionKintai, setMaxPositionKintai] = useState(null);
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    const fetchKintaiData = async () => {
      try {
        const res = await clockApi.getAllKintai({}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // ローカルストレージから JWT トークンを取得
            "Content-Type": "application/json",
          },
        });
        const kintaiData = res;
        const maxKintai = kintaiData.reduce(
          (max, current) => (current.position > max.position ? current : max),
          kintaiData[0]
        );

        setMaxPositionKintai(maxKintai);
      } catch (error) {
        console.error("Clock In エラー: ", error.response?.data || error.message);
      }
    };

    fetchKintaiData();
  }, []); 

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.menu} onClick={(e) => e.stopPropagation()}>
        <h2>本日の勤怠</h2>
        <h4>{currentDate.toLocaleDateString()}</h4>
        <Typography variant="body2" fontWeight="700">
          {user?.username || "ユーザー名"}
        </Typography>
        <p>出勤時間：{maxPositionKintai?.clockIn ? new Date(maxPositionKintai.clockIn).toLocaleTimeString() : "取得中..."}</p>
        <p>休憩開始：{maxPositionKintai?.breakStart ? new Date(maxPositionKintai.breakStart).toLocaleTimeString() : "取得中..."}</p>
        <p>休憩終了：{maxPositionKintai?.breakEnd ? new Date(maxPositionKintai.breakEnd).toLocaleTimeString() : "取得中..."}</p>
        <p>退勤時間：{maxPositionKintai?.clockOut ? new Date(maxPositionKintai.clockOut).toLocaleTimeString() : "取得中..."}</p>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  menu: {
    width: 500,
    height: 400,
    border: "2px solid #090909",
    backgroundColor: "#f7f7f7",
    color: "#090909",
    padding: "1rem",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
};

export default PopupBar;
