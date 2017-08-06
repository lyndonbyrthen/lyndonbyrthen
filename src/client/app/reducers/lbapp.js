const lbapp = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CUR_APP':
      return {
        ...state,
        curApp: action.curApp,
      }
    
    default:
      return state
  }
}

export default lbapp