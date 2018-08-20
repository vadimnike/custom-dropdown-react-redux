import React from 'react';
import PropTypes from 'prop-types';

const DropdownItem = ({text, value, isSelected, onClick}) => {
  return (
    <li value={value}
        className={isSelected}
        onClick={onClick}>
          {text}
    </li>
  )
};


DropdownItem.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isSelected: PropTypes.string,
  onClick: PropTypes.func
}


export default DropdownItem;