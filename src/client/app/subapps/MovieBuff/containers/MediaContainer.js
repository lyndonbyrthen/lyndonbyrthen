import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { addMovies } from '../actions'

import { normalize, schema } from 'normalizr';

import 'whatwg-fetch';

import Paper from 'material-ui/Paper';

import MediaGrid from '../components/MediaGrid'

let MediaContainer= (props)=> {
	// console.log(props)
	return (
			<MediaGrid items={props.movies}/>    
	)
}

const mapStateToProps = state => {
  return {
    movies:state.movies,
    shows:state.shows,
    movieList:state.movieList,
    showList:state.showList,
    mediaView:state.mediaView,
    listView:state.listView
  }
}
const mapDispatchToProps = dispatch => {
  return {
     dispatch:dispatch,
  }
}

MediaContainer = connect(mapStateToProps,mapDispatchToProps)(MediaContainer)

export default MediaContainer