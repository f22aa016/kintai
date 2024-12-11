import { borderBottom, height, width } from '@mui/system';
import React from 'react';

const PopupBar = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.menu} onClick={(e) => e.stopPropagation()}>
        <div style={styles.menuArrow}></div>
        <div className="item">メニュー項目 1</div>
        <div className="item">メニュー項目 2</div>
        <div className="item">メニュー項目 3</div>
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
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)', // 枠の影
    backgroundColor: '#f7f7f7',
    color: "#090909",
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    
  },
  
};

export default PopupBar;
