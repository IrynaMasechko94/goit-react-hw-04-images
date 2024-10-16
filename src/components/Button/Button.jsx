import React from 'react';
import s from '../../styles/styles.module.css';

export default function Button({ onClick }) {
  return (
    <>
      <button type="button" className={s.Button} onClick={onClick}>
        Load More
      </button>
    </>
  );
}


