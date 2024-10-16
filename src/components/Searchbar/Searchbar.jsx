import React, { useState } from 'react';
import s from '../../styles/styles.module.css';

export default function Searchbar({ onSubmit }) {
  const [inputData, setInputData] = useState('');

  const onChangeInput = e => {
    setInputData(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(inputData);
    setInputData('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm}>
        <button
          type="submit"
          className={s.SearchFormButton}
          onClick={handleSubmit}
        >
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          value={inputData}
          onChange={onChangeInput}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
