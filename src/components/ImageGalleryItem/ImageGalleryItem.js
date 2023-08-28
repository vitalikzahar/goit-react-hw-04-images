import { useState } from 'react';
import { Img, Items } from './ImageGalleryItem.styled';
import { Modals } from 'components/Modals/Modals';

export const ImageGalleryItem = ({ webImg, largeImg }) => {
  const [isModalOpen, setIsmodalOpen] = useState(false);
  const togleModal = () => setIsmodalOpen(!isModalOpen);

  return (
    <Items>
      <Img onClick={togleModal} src={webImg} alt="smalImg" />
      <Modals
        isOpen={isModalOpen}
        openModal={togleModal}
        closeModal={togleModal}
        largeImg={largeImg}
      />
    </Items>
  );
};
