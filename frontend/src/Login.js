import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 実際の認証処理はここに追加
    navigate('/home'); // ログイン成功後にHomeページへ遷移
  };

  return (
    <div>
      <h2>Time Stamp</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;