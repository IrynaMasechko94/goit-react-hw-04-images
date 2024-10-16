import React from 'react';
import s from '../../styles/styles.module.css';

export default function Modal({ src, alt, handleClose }) {
  return (
    <div className={s.Overlay} onClick={handleClose}>
      <div className={s.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}
