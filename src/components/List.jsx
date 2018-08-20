import React from 'react'
import Dropdown from './Dropdown';
import shortid from 'shortid';

const List = (props) => {
  return (
    <div className="dropdown-container row">
      {
        props.selects.map(el => {
            return(
            <Dropdown
              key={shortid.generate()}
              id={el.id}
              selectedCountryId={el.selectedCountryId}
              onSelectedValueChanged={props.onSelectedValueChanged }
              title={el.title}
            />
            )
          }
        )
      }
    </div>
  )
}

export default List