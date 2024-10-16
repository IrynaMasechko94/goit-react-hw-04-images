import React from 'react';
import s from '../../styles/styles.module.css';

export default function ImageGalleryItem({ image, onImageClick }) {
  return (
    <li className={s.ImageGalleryItem} id={image.id} onClick={onImageClick}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        name={image.largeImageURL}
        className={s.ImageGalleryItemImage}
      />
    </li>
  );
}
