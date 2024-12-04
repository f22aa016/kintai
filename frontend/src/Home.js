import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './app_style.css';
import LogoutIcon from '@mui/icons-material/Logout';

function Home() {
  const [isHovered, setIsHovered] = useState(false); // ホバー状態を管理
  const [hoverDuration, setHoverDuration] = useState(0); // ホバー時間を管理
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleMouseEnter = () => setIsHovered(true); // ホバー時
  const handleMouseLeave = () => setIsHovered(false); // ホバー解除時

  useEffect(() => {
    // 2秒後にロード画面を非表示にする
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    // クリーンアップ
    return () => clearTimeout(timer);
  }, []);

  const [currentTime, setCurrentTime] = useState({
    year: 0,
    month: '00',
    date: '00',
    day: '00',
    hour: '00',
    min: '00',
    sec: '00',
  });

  const [analogClock, setAnalogClock] = useState({
    hourDeg: 0,
    minuteDeg: 0,
    secondDeg: 0,
  });

  const goToLogin = () => {
    navigate('/Login');
  };

  // デジタル時計の更新
  useEffect(() => {
    const updateDigitalClock = () => {
      const time = new Date();
      const year = time.getFullYear();
      let month = time.getMonth() + 1;
      let date = time.getDate();
      const dayNum = time.getDay();
      const weekday = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
      const day = weekday[dayNum];

      const hour = time.getHours();
      const minute = time.getMinutes();
      const second = time.getSeconds();

      month = month < 10 ? "0" + month : month;
      date = date < 10 ? "0" + date : date;
      const hourStr = hour < 10 ? "0" + hour : hour;
      const minStr = minute < 10 ? "0" + minute : minute;
      const secStr = second < 10 ? "0" + second : second;

      setCurrentTime({
        year,
        month,
        date,
        day,
        hour: hourStr,
        min: minStr,
        sec: secStr,
      });
    };

    updateDigitalClock();
    const interval = setInterval(updateDigitalClock, 1000);

    return () => clearInterval(interval);
  }, []);

  // アナログ時計の更新
  useEffect(() => {
    const updateAnalogClock = () => {
      const time = new Date();
      const second = time.getSeconds();
      const minute = time.getMinutes();
      const hour = time.getHours();

      const secondDeg = (second * 360 / 60) + 90;
      const minuteDeg = (minute * 360 / 60) + ((second * 360 / 60) / 60) + 90;
      const hourDeg = (hour * 360 / 12) + ((minute * 360 / 60) / 12) + ((second * 360 / 60) / 720) + 90;

      setAnalogClock({
        hourDeg,
        minuteDeg,
        secondDeg,
      });
    };

    updateAnalogClock();
    const interval = setInterval(updateAnalogClock, 1000);

    return () => clearInterval(interval);
  }, []);

  // ホバー時間で自動的にログアウト
  useEffect(() => {
    if (hoverDuration >= 1) {
      goToLogin();
    }
  }, [hoverDuration]);

  // ホバー中のタイマー処理
  useEffect(() => {
    let timer;
    if (isHovered) {
      timer = setInterval(() => {
        setHoverDuration(prev => prev + 1);
      }, 1000); // 1秒ごとにホバー時間をカウント
    } else {
      setHoverDuration(0); // ホバー解除時にリセット
      if (timer) clearInterval(timer);
    }
    return () => {
      if (timer) clearInterval(timer); // クリーンアップ
    };
  }, [isHovered]);

  return (
    <div className="container">
      {loading ? (
        <div className="mikepad-loading">
          <div className="binding"></div>
          <div className="pad">
            <div className="line line1"></div>
            <div className="line line2"></div>
            <div className="line line3"></div>
          </div>
          <div className="text">
            mikepad is loading...
          </div>
        </div>
      ) : (
        <>
          <header className="header">
            <nav className="nav">
              <h1 className="header_title">
                <strong>Time Stamp</strong>
              </h1>
              <div className={`person-icon ${isHovered ? 'hovered' : ''}`}></div>
              <div className="csrcl-icon"></div>
              <div
                className="logout-door"
                onMouseEnter={handleMouseEnter} // ボタンにカーソルが乗ったとき
                onMouseLeave={handleMouseLeave} // ボタンからカーソルが離れたとき
              >
                <LogoutIcon sx={{ fontSize: 40 }} />
                <span style={{ position: 'absolute', bottom: '-30px', color: '#000' }}></span>
              </div>
            </nav>
          </header>
          <div className="clock-container">
            <div className="clock">
              <p className="clock-date">
                {currentTime.year}年{currentTime.month}月{currentTime.date}日 {currentTime.day}
              </p>
              <p className="clock-time">
                {currentTime.hour}:{currentTime.min}:{currentTime.sec}
              </p>
            </div>
            <div id="clock2" className="analog-clock">
              <div
                id="hour-hand2"
                className="hand hour-hand"
                style={{ transform: `rotate(${analogClock.hourDeg}deg)` }}
              ></div>
              <div
                id="minute-hand2"
                className="hand minute-hand"
                style={{ transform: `rotate(${analogClock.minuteDeg}deg)` }}
              ></div>
              <div
                id="second-hand2"
                className="hand second-hand"
                style={{ transform: `rotate(${analogClock.secondDeg}deg)` }}
              ></div>
              <div className="clock-label" style={{ top: '0%', left: '50%' }}>12</div>
              <div className="clock-label" style={{ top: '50%', left: '100%' }}>3</div>
              <div className="clock-label" style={{ top: '100%', left: '50%' }}>6</div>
              <div className="clock-label" style={{ top: '50%', left: '0%' }}>9</div>
              <div className="clock-dash" style={{ top: '15%', right: '10%', transform: 'translate(-50%, -50%) rotate(135deg)' }}>ー</div>
              <div className="clock-dash" style={{ top: '85%', right: '10%', transform: 'translate(-50%, -50%) rotate(45deg)' }}>ー</div>
              <div className="clock-dash" style={{ top: '85%', left: '15%', transform: 'translate(-50%, -50%) rotate(135deg)' }}>ー</div>
              <div className="clock-dash" style={{ top: '15%', left: '15%', transform: 'translate(-50%, -50%) rotate(45deg)' }}>ー</div>
            </div>
          </div>
          <WorkButtons id={123} name="山田太郎" />
        </>
      )}
    </div>
  );
}

const WorkButtons = ({ id, name }) => {
  return (
    <div>
      <button className="button_mainscreen checkin" type="button" id="act_in" name="but">
        出勤
      </button>
      <button className="button_mainscreen checkout" type="button" id="act_out" name="but">
        退勤
      </button>
      <button className="button_mainscreen breakstart" type="button" id="break_start" name="but">
        休憩
      </button>
      <button className="button_mainscreen breakend" type="button" id="break_end" name="but">
        戻り
      </button>
    </div>
  );
};

export default Home;
