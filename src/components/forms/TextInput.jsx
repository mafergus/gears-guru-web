import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

export default function TextInput({ type, name, placeholder, style, value, onChange, error }) {

  return (
    <input
      placeholder={placeholder}
      className={error ? "input-error" : "input"}
      type={type}
      name={name}
      style={style}
      onChange={onChange}
      value={value}
    />
  );
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

TextInput.defaultProps = {
  placeholder: '',
  style: {},
};