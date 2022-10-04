import { useState } from 'react';

import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({ onSearch }) => {
  const [q, setQ] = useState('');

  const handleChange = e => {
    setQ(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(q);
    reset();
  };

  const reset = () => {
    setQ('');
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>

        <input
          onChange={handleChange}
          name="q"
          value={q}
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
