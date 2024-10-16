import React from 'react';
import s from '../../styles/styles.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={s.ImageGallery}>
      {images.map((image, index) => (
        <ImageGalleryItem
          key={index}
          image={image}
          onImageClick={onImageClick}
        />
      ))}
    </ul>
  );
}
