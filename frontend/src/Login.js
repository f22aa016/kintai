import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';


function Login() {
  // 画面遷移の為
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const handleLogin = () => {
    // 実際の認証処理はここに追加
    navigate('/home'); // ログイン成功後にHomeページへ遷移
  };

  const togglePasswordVisibility = () => {
    setPasswordType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div className="body_loginscreen">
      <div className="gradation">
        <div id="loading" className="hidden">
          <img 
            src="https://images.pexels.com/photos/1699574/pexels-photo-1699574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="loading" 
            width="860" 
            height="820" 
            style={{ filter: 'brightness(65%)' }} 
          />
        </div>
      </div>
      <div className="form-container">
        <h1 className="h1_loginscreen">Time Stamp</h1>
        <p className="subtitle">勤怠管理システム</p>
        <form method="post" action={process.env.REACT_APP_DEPLOY_URL}>
          
          <div className="input_data">
            <label htmlFor="id" className="form_label">社員 ID</label>
              <input 
                type="text" 
                className="form-control" 
                name="id" 
                placeholder="社員 ID" 
                required 
              />
              <label htmlFor="pw" className="form_label">Password</label>
            <div className="password-field">
              <input 
                type={passwordType} 
                className="form-control" 
                name="pw" 
                placeholder="パスワード" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordType === "password" ? (
                <VisibilityOffIcon onClick={togglePasswordVisibility} className="password-toggle-icon" />
              ) : (
                <VisibilityIcon onClick={togglePasswordVisibility} className="password-toggle-icon" />
              )}
            </div>  
          </div>
        </form>
        <Button class="login-bt" variant="contained" onClick={handleLogin}> ログイン </Button>
      </div>
      
    </div>
  );
}

export default Login;