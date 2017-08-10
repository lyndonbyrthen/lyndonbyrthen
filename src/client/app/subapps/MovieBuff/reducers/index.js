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
      prepMedia(newState,action.media)
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

const filterMedia=(media)=>{
   let movs = [] 
    for (let i in media) {
      let mov = media[i]
      if (!mov.poster_path || !mov.backdrop_path) continue
      movs.push(mov)
    }
    return movs
}

const prepMedia=(state,media)=>{
   state.mediaDelta = state.mediaDelta.concat()
   state.media = {...state.media}
   let m = media
   /*m.sort((a,b)=>{
      let astr = a.release_date.split('-')
      let adate = new Date(astr[0],astr[1]-1,astr[2])
      let bstr = b.release_date.split('-')
      let bdate = new Date(bstr[0],bstr[1]-1,bstr[2])
      return bdate.getTime()-adate.getTime()
   })*/
    for (let i in m) {
      if (!m[i].poster_path || !m[i].backdrop_path) continue
      if (state.media[m[i].id]) continue
      state.mediaDelta.push(m[i].id)
      state.media[m[i].id] = m[i]
    }
}

export default reducer