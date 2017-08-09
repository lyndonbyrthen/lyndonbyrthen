import React from 'react'
import PropTypes from 'prop-types'

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import { default as styles} from '../styles'
import MediaItem from './MediaItem'


class MediaGrid extends React.Component {
	// console.log(props)

  render() {

    console.log(this.props.items)

    let children = []

    for (let i in this.props.items) {

        let mov = this.props.items[i]

        if (!mov.poster_path) continue

        children.push(
         (
          <MediaItem data={mov} key={i} /> 
         )
      )
    }

    return (
      <Grid container spacing={0} direction="row" align='top' justify="center" >
        {children}
        
      </Grid>
    )
  }
	
}

export default MediaGrid