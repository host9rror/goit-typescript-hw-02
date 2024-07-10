import React from 'react';
import css from './ImageCard.module.css';

interface Image {
  urls: {
    small: string;
  };
  alt_description?: string;
}

interface GalleryCardProps {
  image: Image;
  onClick: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ image, onClick }) => {
  return (
    <div className={css.galleryCard}>
      <div className={css.galleryCardImageContainer}>
        <img
          src={image.urls.small}
          alt={image.alt_description}
          className={css.galleryimg}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default GalleryCard;
