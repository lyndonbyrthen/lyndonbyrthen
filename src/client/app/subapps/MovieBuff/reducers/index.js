const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_MOVIE_ITEM':
      var newState = {...state};
      newState.movies.push(action.title)
      return newState
    case 'ADD_MOVIES':
      var newState = {...state};
      newState.movies = {...newState.movies, ...action.movies}
      return newState
    default:
      return state
  }
}

export default reducer