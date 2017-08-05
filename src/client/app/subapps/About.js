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



class About extends React.Component {


  render() {

  	return (
      <div style={theme.aboutRoot}>
  		<Card >
      <CardTitle title="Thanks for dropping by!" />
          <CardText>
          I am a software engineer in trade and many other things in life. I studied Fine Arts(Sculpture) for undergrad and then later received my Master's in Computer Science.
          <br/>I am reachable via email, LyndonByrthen@gmail.com.
          <br/>Also, I just renovated my site more contents are on the way.
          </CardText>
        </Card>
        </div>
    )
  }
}

export default About