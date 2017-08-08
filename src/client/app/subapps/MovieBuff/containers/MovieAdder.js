import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { addMovies } from '../actions'

import { normalize, schema } from 'normalizr';

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
			
		<RaisedButton onTouchTap={props.onTap} label={props.label} primary={true} />
		</div>
	)
}

const mapStateToProps = state => {
  return {
    
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTap: () => {
      let myHeaders = new Headers();
      let myInit = { method: 'GET',
       headers: myHeaders,
      };
      let myRequest = new Request('https://api.themoviedb.org/3/discover/movie?api_key=9ceb030330a7d13c7e200d7d7489a442&language=en-US&sort_by=primary_release_date.desc&include_adult=false&include_video=true&page=1&primary_release_year=2017&primary_release_date.gte=2017-08-01&primary_release_date.lte=2017-08-07&year=2017&with_original_language=en', myInit);

      fetch(myRequest).then(function(response) {
        return response.json();
      }).then(function(json) {
        
        let res = json.results
        let movies = {}

        for (let i in res) {
          movies[res[i].id] = res[i]
        }
        
        dispatch(addMovies(movies))
      });
      
    }
  }
}

MovieAdder = connect(mapStateToProps,mapDispatchToProps)(MovieAdder)

export default MovieAdder