import { ChangeEvent, FormEvent, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast'; 
import { IoSearch } from "react-icons/io5";
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (searchString: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [searchString, setSearchString] = useState<string>('');

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.currentTarget.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchString.trim() === '') {
      toast.error('Please, write name for the image'); 
      return;
    }
    onSubmit(searchString);
  };

  return (
    <div className={css.container}>
      <header className={css.header}>
        <div className={css.search}>
          <form onSubmit={handleSubmit}>
            <button type="submit" className={css.searchButton}>
              <IoSearch />
            </button>
            <input
              type="text"
              autoComplete="off" 
              value={searchString}
              onChange={handleOnChange}
              autoFocus
              placeholder="Search images"
              className={css.searchInput}
            />
          </form>
        </div>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </header>
    </div>
  );
};

export default SearchBar;
