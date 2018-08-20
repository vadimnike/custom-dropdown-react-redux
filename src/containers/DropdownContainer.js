import {connect} from 'react-redux';

import {selectValue} from 'actions';
import List from 'components/List';

function mapStateToProps(state){
  return {
    selects: state.select
  }
};


function mapDispatchToProps(dispatch){
  return {
    onSelectedValueChanged: (id, title, value)=> dispatch(selectValue(id, title, value))
  }
};


const DropdownContainer = connect(mapStateToProps, mapDispatchToProps)(List);
export default DropdownContainer;
