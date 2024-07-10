import React from 'react';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

interface Image {
  id: string;
  urls: {
    regular: string;
  };
  alt_description?: string;
}

interface GalleryListProps {
  images: Image[]; 
  onImageClick: (image: Image) => void;
}

const GalleryList: React.FC<GalleryListProps> = ({ images, onImageClick }) => {

    return (
      <div className={css.galleryListContainer}>
        <ul className={css.galleryList}>
          {images.map(image => (
            <li key={image.id}>
              <ImageCard image={image} onClick={() => onImageClick(image)} />
            </li>
          ))}
        </ul>
      </div>
    );
};

export default GalleryList;
