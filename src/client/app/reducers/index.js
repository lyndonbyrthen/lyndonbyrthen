const lbapp = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CUR_APP':
      return {
        ...state,
        curAppId: action.curAppId,
      }
    case 'SET_TRANSITION_STATE':
      return {
        ...state,
        transitionState: action.transitionState,
      }
    case 'SET_MENU_OPEN':
      return {
        ...state,
        menuOpen: action.menuOpen,
      }
    case 'SET_INFO_OPEN':
      return {
        ...state,
        infoOpen: action.infoOpen,
      }
    case 'INIT_APP_DATA':
    let newState = {...state}
    return newState
    default:
      return state
  }
}

export default lbapp