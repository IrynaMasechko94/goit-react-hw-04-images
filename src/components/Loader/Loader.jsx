import React from 'react';
import { DNA } from 'react-loader-spinner';
import s from '../../styles/styles.module.css';

export default function Loader() {
  return (
    <div className={s.Loader}>
      <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
}
