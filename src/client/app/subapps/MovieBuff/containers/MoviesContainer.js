import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { addMovies } from '../actions'

import { normalize, schema } from 'normalizr';

import 'whatwg-fetch';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { default as theme} from '../../../styles/ui-theme'

import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import HighlightOff from 'material-ui/svg-icons/action/Highlight-off';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import MoviesList from '../components/MoviesList'

let MoviesContainer= (props)=> {
	// console.log(props)
	return (
		<Paper>
			<MoviesList movies={props.movies}/>    
		</Paper>
	)
}

const mapStateToProps = state => {
  return {
    movies:state.movies,
  }
}
const mapDispatchToProps = dispatch => {
  return {
     dispatch:dispatch,
  }
}

MoviesContainer = connect(mapStateToProps,mapDispatchToProps)(MoviesContainer)

export default MoviesContainer