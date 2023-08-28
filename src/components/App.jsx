import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { AppGallary } from './App.styled';
import { getResponse } from './fetch';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [isLoadMore, setIsLoadMore] = useState(null);

  const changeQuery = newQuery => {
    setQuery(`${Date.now()}/${newQuery}`);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    getResponse(query, page)
      .then(responce => {
        setImages(prevState => [...prevState, ...responce.hits]);

        setIsLoadMore(page < Math.ceil(responce.totalHits / 12));
      })
      .catch()
      .finally(() => setLoading(false));
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <AppGallary>
      <Searchbar changeQuery={changeQuery}></Searchbar>
      <ImageGallery cards={images}></ImageGallery>
      <Loader visible={loading}></Loader>
      {isLoadMore && <Button moreCards={handleLoadMore} />}
    </AppGallary>
  );
};
