import {SELECT_VALUE} from 'actions'
import initialState from 'store/state.json';


function selectReducer(state={}, action){
  switch(action.type){
    case SELECT_VALUE:
      if(state.id !== action.id){
        return state
      }
      return {
        ...state,
        selectedCountryId: action.value,
        title: action.title
      };
    default:
      return state
  }
}

function reducer(state=initialState.selects, action){
  switch(action.type){
    case SELECT_VALUE:
      return state.map(select=> selectReducer(select, action));
    default:
      return state
  }
}


export default reducer;