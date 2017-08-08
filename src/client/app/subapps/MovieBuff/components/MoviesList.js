import React from 'react'
import PropTypes from 'prop-types'

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
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import HighlightOff from 'material-ui/svg-icons/action/Highlight-off';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import {GridList, GridTile} from 'material-ui/GridList';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import {default as styles} from '../styles'
import {List, ListItem} from 'material-ui/List';
import { Container, Row, Col, Visible, Hidden, ScreenClassRender } from 'react-grid-system';

class MoviesList extends React.Component {
	// console.log(props)

  render() {

    console.log(this.props.movies)

    let children = []

    for (let i in this.props.movies) {

        let mov = this.props.movies[i]

        if (!mov.poster_path) continue

        children.push(
         (
          <div
            key={i}
            style={styles.listItem}
          >
            <img style={styles.posterImg} src={"https://image.tmdb.org/t/p/w780"+mov.poster_path} />
          </div>
         )
      )
    }

    return (
      <div>
        {children}
      </div>
    )
  }
	
}

export default MoviesList