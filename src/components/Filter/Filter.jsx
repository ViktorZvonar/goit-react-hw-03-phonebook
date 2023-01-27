import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ filter, onChange }) => (
  <label className={css.filter}>
    Find contacts by name
    <input
      className={css.find}
      onChange={onChange}
      type="text"
      name="filter"
      filter={filter}
    />
  </label>
);

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default Filter;
