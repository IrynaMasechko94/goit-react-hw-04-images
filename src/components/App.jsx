import React, { useEffect, useState } from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Notiflix from 'notiflix';
import { fetchImages } from './api/fetchImages';
import s from '../styles/styles.module.css';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

export function App() {
  let pageNr = 1;

  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [inputData, setInputData] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  const handleSubmit = async inputData => {
    pageNr = 1;
    if (inputData.trim() === '') {
      Notiflix.Notify.info('You cannot search by empty field, try again.');
      return;
    } else {
      try {
        setStatus('pending');
        const { totalHits, hits } = await fetchImages(inputData, pageNr);

        if (hits.length < 1) {
          setStatus('idle');
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          setImages(hits);
          setInputData(inputData);
          setTotalHits(totalHits);
          setStatus('resolved');
        }
      } catch (error) {
        setStatus('rejected');
      }
    }
  };

  const handleClickMore = async () => {
    setStatus('pending');

    try {
      const { hits } = await fetchImages(inputData, (pageNr += 1));
      setImages([...images, ...hits]);
      setStatus('resolved');
    } catch (error) {
      setStatus('rejected');
    }
  };

  const handleImageClick = e => {
    setModalOpen(true);
    setModalAlt(e.target.alt);
    setModalImg(e.target.name);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalAlt('');
    setModalImg('');
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        handleModalClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
  }, []);

  if (status === 'idle') {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={handleSubmit} />
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery images={images} onImageClick={handleImageClick} />
        <Loader />
        {totalHits > 12 && totalHits > images.length && (
          <Button onClick={handleClickMore} />
        )}
        {modalOpen ? (
          <Modal src={modalImg} alt={modalAlt} handleClose={handleModalClose} />
        ) : null}
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={handleSubmit} />
        <p>Something wrong, try later</p>
      </div>
    );
  }

  if (status === 'resolved') {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery images={images} onImageClick={handleImageClick} />
        {totalHits > 12 && totalHits > images.length && (
          <Button onClick={handleClickMore} />
        )}
        {modalOpen ? (
          <Modal src={modalImg} alt={modalAlt} handleClose={handleModalClose} />
        ) : null}
      </div>
    );
  }
}
