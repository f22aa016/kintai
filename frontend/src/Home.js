import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>ホーム</h2>
      <button onClick={goToLogin}>ログインアウト</button>
    </div>
  );
}

export default Home;