const lbapp = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CUR_APP':
      return {
        ...state,
        curAppId: action.curAppId,
      }
    case 'SET_TRANS_STATE':
      return {
        ...state,
        transState: action.transState,
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
    newState.appData[action.appId].appData = action.appData
    return newState
    default:
      return state
  }
}

export default lbapp