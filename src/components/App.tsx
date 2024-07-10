import React, { useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchPhotosWithQuery } from './images-api';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ImageModal from './ImageModal/ImageModal';
import ErrorMessage from './ErrorMessage/ErrorMessage';

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string
  };
  alt_description?: string;
}

interface FetchPhotosResponse {
  images: Image[];
  hasMore: boolean;
}

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userSearched, setUserSearched] = useState<boolean>(false);
  const [hasMoreImages, setHasMoreImages] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const handleSearch = async (keyword: string) => {
    try {
      setLoading(true);
      setUserSearched(true);
      setSearchQuery(keyword);
      const { images: fetchedImages, hasMore }: FetchPhotosResponse = await fetchPhotosWithQuery(keyword);
      setImages(fetchedImages);
      setHasMoreImages(hasMore);
      setPage(1);
    } catch (error) {
      console.error('Error searching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const { images: moreImages, hasMore }: FetchPhotosResponse = await fetchPhotosWithQuery(searchQuery, page + 1);
      setImages(prevImages => [...prevImages, ...moreImages]);
      setHasMoreImages(hasMore);
      setPage(page + 1);
    } catch (error) {
      console.error('Error loading more images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  }

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {images.length === 0 && userSearched && <ErrorMessage />}
      <ImageGallery images={images} userSearched={userSearched} onImageClick={handleImageClick} />
      {hasMoreImages && <LoadMoreBtn onClick={handleLoadMore} />}
      {selectedImage && (
        <ImageModal isOpen={isModalOpen} onRequestClose={closeModal} image={selectedImage} />
      )}
    </div>
  );
}

export default App;
