import React from 'react'

import { connect } from 'react-redux'

import { default as theme} from '../styles/ui-theme'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
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

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class MovieBuff extends React.Component {

  constructor(props) {
    super(props)
    console.log(props)

  }

  render() {

  	return (
      <div style={{...theme.fullpage,backgroundColor:'gray'}}>
      
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    curAppId : state.curAppId,
    apps: state.apps,
    appsMap: state.appsMap
  }
}

MovieBuff = connect(mapStateToProps)(MovieBuff)

export default MovieBuff