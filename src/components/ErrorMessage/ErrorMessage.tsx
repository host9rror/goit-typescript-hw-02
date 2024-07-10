import React from 'react';
import css from './ErrorMessage.module.css';

const ErrorMessage: React.FC = () => {
  return (
    <p className={css.errorMessage}>No images found</p>
  );
}

export default ErrorMessage;
