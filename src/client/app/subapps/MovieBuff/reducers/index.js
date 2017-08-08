const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_MOVIE_ITEM':
      let newState = {...state};
      newState.movies.push(action.title)
      return newState
    
    default:
      return state
  }
}

export default reducer