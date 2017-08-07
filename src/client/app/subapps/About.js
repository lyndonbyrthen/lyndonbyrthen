import React from 'react'
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

class About extends React.Component {


  render() {

  	return (
      <div style={theme.aboutRoot} >
      <Card>
          <CardHeader title="Lyndon Byrthen"/>
          <CardText style={theme.cardFont}>
            I am a software engineer and a few other things in life. Just so you have a vague idea, I have a Bachelor's in Fine Arts (Sculpture) and a Master's in Computer Science.
            <p/>I am reachable via email, LyndonByrthen@gmail.com.
          </CardText>
          <CardHeader title="This site"/>
          <CardText style={theme.cardFont}>
            This site is built on React with a PHP backend.

            The main building blocks also include
            Router, Router and Greensock. Other tools used are more individual to each app,
            so they are mentioned in each app's own info section.

            <p/>This site demonstrates:
            <br/>- With Router, it is possible to do animated
             transitions of components without unmounting them.
            <br/>- A single page app can be optimized to
            load only the requested features on demand.
            <br/>- Using Redux to persist app states.            
            <br/>- Server side rendering with PHP. (in progress)

            <p/>This is an on going project and more contents are on the way.

            <p/>The
            <Link style={theme.link} to='https://github.com/lyndonbyrthen/lyndonbyrthen' target="_blank">
            <FlatButton primary={true} style={theme.inlineButton}>
              source code
            </FlatButton>
            </Link>
            can be found on GitHub.

          </CardText>
      </Card>
      </div>
    )
  }
}

export default About