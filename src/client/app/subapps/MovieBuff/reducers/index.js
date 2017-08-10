const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'REMOVE_MEDIA':
      var newState = {...state}
      delete newState.media[action.mediaId]
      var list = newState.mediaList
      delete list[action.mediaId]
      return newState
    case 'ADD_MEDIA':
      var newState = {...state};
      if (action.media.id) newState.media[action.media.id] = action.media
      else newState.media = {...newState.media, ...action.media}
      return newState
    case 'ADD_TO_LIST':
      var newState = {...state};
      newState.mediaList = {...newState.mediaList}
      newState.mediaList[action.mediaId] = true
      return newState
    case 'REMOVE_FROM_LIST':
      var newState = {...state};
      newState.mediaList = {...newState.mediaList}
      delete newState.mediaList[action.mediaId]
      return newState
    case 'SET_VIEW':
      return {...state, viewType:action.viewType}
    case 'SET_FOCUS':
      return {...state, focus:action.mediaId}
    default:
      return state
  }
}

export default reducer