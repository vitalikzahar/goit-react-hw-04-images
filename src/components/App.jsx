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
  const [showBtn, setShowBtn] = useState('');
  const [isLoadMore, setIsLoadMore] = useState(null);

  const changeQuery = newQuery => {
    setQuery(`${Date.now()}/${newQuery}`);
    setImages([]);
    setPage(1);
  };
  // useEffect(() => {
  //   setIsLoadMore(Math.ceil(showBtn / 12));
  // }, [showBtn]);
  useEffect(() => {
    if (query === '') {
      return;
    }
    const fetchItems = async () => {
      try {
        setLoading(true);

        return getResponse(query, page).then(responce => {
          setImages(prevState => [...prevState, ...responce.hits]);
          setShowBtn(responce.totalHits);
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
    setIsLoadMore(Math.ceil(showBtn / 12));
  }, [query, page, showBtn]);
  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <AppGallary>
      <Searchbar changeQuery={changeQuery}></Searchbar>
      <ImageGallery cards={images}></ImageGallery>
      <Loader visible={loading}></Loader>
      {page < isLoadMore && <Button moreCards={handleLoadMore}></Button>}
    </AppGallary>
  );
};
