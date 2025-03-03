import css from './SearchBox.module.css';

const SearchBox = ({ value, onChange }) => {
  return (
    <div className={css.searchBox}>
      <label htmlFor="search" className={css.label}>
        Find contacts by name
      </label>
      <input
        type="text"
        id="search"
        value={value}
        onChange={onChange}
        className={css.input}
        placeholder="Search contacts..."
      />
    </div>
  );
};

export default SearchBox;