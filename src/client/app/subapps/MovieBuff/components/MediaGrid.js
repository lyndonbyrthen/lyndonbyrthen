import React from 'react'
import PropTypes from 'prop-types'

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import { default as styles} from '../styles'
import MediaItem from './MediaItem'

import css1 from 'react-grid-layout/css/styles.css'
import css2 from 'react-resizable/css/styles.css'

class MediaGrid extends React.Component {
  
  render() {
    
    let delta = this.props.mediaDelta
    let children = []
    for (let i in delta) {
        let mov = this.props.media[delta[i]]
        if (this.props.viewType === 'FAVORED' && !this.props.mediaList[mov.id]) continue
        children.push(<MediaItem {...this.props} data={mov} key={mov.id} />)
    }

    return (
      <Grid ref='mediaGrid' container spacing={0} direction="row" align='baseline' justify="center" >
        {children}
      </Grid>
    )
  }
	
}

export default MediaGrid