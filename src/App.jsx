import { useState, useEffect } from 'react';
import { fetchImages } from 'shared/services/API';
import { Oval } from 'react-loader-spinner';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Modal from 'components/Modal';

// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
const App = () => {
  const [modal, setModal] = useState({ showModal: false, modalData: {} });
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    images: [],
    loading: false,
    totalPages: null,
  });

  useEffect(() => {
    if (q === '') {
      return;
    }
    setData(prevState => {
      return {
        ...prevState,
        loading: true,
      };
    });
    const data = async (q, page) => {
      try {
        const data = await fetchImages(q, page);
        setData(prevState => {
          return {
            images: [...prevState.images, ...data.hits],
            loading: false,
            totalPages: data.total,
          };
        });
      } catch (error) {
        setData(prevState => {
          return {
            ...prevState,
            loading: false,
          };
        });
      }
    };
    data(q, page);
  }, [q, page]);

  const onSearch = q => {
    setQ(q);
    setPage(1);
    setData(prevState => {
      return {
        ...prevState,
        images: [],
      };
    });
  };

  const onLoadMore = () => {
    setPage(page + 1);
  };

  const toggleModal = modalData => {
    setModal({
      showModal: true,
      modalData,
    });
  };

  const closeModal = () => {
    setModal(prevState => {
      return {
        ...prevState,
        showModal: false,
      };
    });
  };

  const { images, loading, totalPages } = data;
  const { showModal, modalData } = modal;
  return (
    <>
      <Searchbar onSearch={onSearch} />
      <ImageGallery images={images} openModal={toggleModal} />
      {!!images.length && images.length < totalPages && (
        <Button onClick={onLoadMore} />
      )}
      {loading && <Oval width={200} />}
      {showModal && <Modal data={modalData} closeModalWindow={closeModal} />}
    </>
  );
};

export default App;

// !!images.length
// totalPages: Math.ceil(data.totalHits / 12),
// totalPages: data.hits.length,
