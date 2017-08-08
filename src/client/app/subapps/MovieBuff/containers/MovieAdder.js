import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import 'whatwg-fetch';
import injectTapEventPlugin from 'react-tap-event-plugin';

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

let MovieAdder = (props)=> {
	// console.log(props)
	return (
		<div>
			
		<RaisedButton onTouchTap={()=>{props.onTap(props.title)}} label={props.label} primary={true} />
		</div>
	)
}

const mapStateToProps = state => {
  return {
    movies : state.movies,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTap: (title) => {
      dispatch({type:'ADD_MOVIE_ITEM',title:title});
    }
  }
}

MovieAdder = connect(mapStateToProps,mapDispatchToProps)(MovieAdder)

export default MovieAdder