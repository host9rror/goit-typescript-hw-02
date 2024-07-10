import Modal from "react-modal";
import css from './ImageModal.module.css';

Modal.setAppElement("#root");

interface Image {
  urls: {
    regular: string;
  };
  alt_description?: string;
}

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image: Image | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onRequestClose, image }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className={css.modal}
    >
      {image && (
        <div className={css.modalContent}>
          <img
            src={image.urls.regular}
            alt={image.alt_description}
            className={css.image}
          />
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
