import React, { useState, useEffect } from 'react';

const PopupBar = ({ isOpen, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 86400000); // 1日ごとに更新

    return () => clearInterval(timer); // コンポーネントがアンマウントされるときにタイマーをクリア
  }, []);

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.menu} onClick={(e) => e.stopPropagation()}>
        <h2>本日の勤怠</h2>
        <h4>{currentDate.toLocaleDateString()}</h4>
        <p>shimoda さん</p> {/*実際はログインしたusernameを表示*/}
        <p>出勤時間：</p>
        <p>休憩開始：</p>
        <p>休憩終了：</p>
        <p>退勤時間：</p>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  menu: {
    width: 500,
    height: 400,
    border: '2px solid #090909', // 枠線を追加
    backgroundColor: '#f7f7f7',
    color: "#090909",
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
};

export default PopupBar;
