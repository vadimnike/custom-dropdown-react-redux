export const SELECT_VALUE = 'SELECT_VALUE';

export function selectValue(id, title, value){
  return{
    type: SELECT_VALUE,
    id,
    title,
    value
  }
}