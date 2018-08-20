import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DropdownItem from './DropdownItem';
import onOutsideClick from 'react-onclickoutside'
import {SELECT_DATA} from 'constants/selectData'
import shortid from 'shortid';
import classNames from 'classnames';

class Dropdown extends Component{
  constructor(props){
    super(props);
    this.state={
      isOpened: false
    }
  }

  toggleIsOpened = ()=>{
    this.setState({
      isOpened: !this.state.isOpened
    })
  }


  handleClickOutside = () => {
    this.setState({
      isOpened: false
    })
  }

  handleSelectValue = (e)=>{
    const title = e.target.innerHTML;
    const value = e.target.value;
    this.props.onSelectedValueChanged(this.props.id, title, value)
  }

  render(){
    const {
      id,
      title,
      selectedCountryId} = this.props;
    return (
      <div id={id}
           className={classNames('dropdown col-4', {'dropdown-is-opened': this.state.isOpened})}>
        <div className="dropdown--box">
          <input type="text"
                 className="selected--value"
                 defaultValue={title}
                 placeholder="Select country"
                 readOnly="true"
                 disabled
          />
          <i className="toggle--dropdown ic ic-drop-arrow" onClick={this.toggleIsOpened}></i>
        </div>
        <ul className="dropdown--list">
          {
            SELECT_DATA.countries.map(el => {
                return (
                  <DropdownItem
                    onClick={this.handleSelectValue}
                    key={shortid.generate()}
                    value={el.id}
                    text={el.name}
                    isSelected={classNames('dropdown--item ', {'dropdown--item-is-selected': +el.id === +selectedCountryId})}
                  />
                )
              }
            )
          }
        </ul>
      </div>
    )
  }
}



Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  selectedCountryId: PropTypes.number.isRequired,
  onSelectedValueChanged: PropTypes.func.isRequired
}


export default onOutsideClick(Dropdown);