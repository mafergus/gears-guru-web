import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';

export default function GGSelect({ children, style, className, selected, handleChange, id }) {

  return (
    <Select
      value={selected}
      onChange={handleChange}
      disableUnderline
      inputProps={{
        name: id,
        id,
      }}
      style={{ ...style }}
    >
      {children}
    </Select>
  );
}

GGSelect.propTypes = {
  selected: PropTypes.string,
  handleChange: PropTypes.func,
  id: PropTypes.string,
  style: PropTypes.object,
};

GGSelect.defaultProps = {
  selected: '',
  handleChange: () => {},
  id: '',
  style: {},
};