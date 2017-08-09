import React from 'react'
import PropTypes from 'prop-types'

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';

import Star from 'material-ui-icons/Star';
import StarBorder from 'material-ui-icons/StarBorder';


import { default as styles} from '../styles'

class MediaItem extends React.Component {
	// console.log(props)

  render() {

    let mov = this.props.data

    return (
      <Grid item xs={6} sm={3} lg={2}  >
            <div style={{position:'relative'}}>
            <div style={{position:'absolute',top:'0px'}}>
                 <IconButton style={styles.gridItem.star}><StarBorder/></IconButton>
            </div>
              <img style={styles.posterImg} src={"https://image.tmdb.org/t/p/w780"+mov.poster_path} />
              
            </div>
      </Grid> 
    )
  }
	
}

export default MediaItem