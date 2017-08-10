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

// import ReactGridLayout from 'react-grid-layout'
// var ResponsiveReactGridLayout = require('react-grid-layout').Responsive;
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
class MediaGrid extends React.Component {
  render() {

   let children = []
    for (let i in this.props.media) {
        let mov = this.props.media[i]
        if (this.props.viewType === 'FAVORED' && !this.props.mediaList[mov.id]) continue
        if (!mov.poster_path) continue
        children.push(
          <div
          data-grid={{x: 0, y: 0, w: 4, h: 8}}
          key={i}
          style={{overflow:'hidden'}} 
          >
            <MediaItem {...this.props} data={mov}  />
          </div>
        )
    }

    return (
      <ResponsiveReactGridLayout className="layout"
      
      breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
      cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
      {children}
    </ResponsiveReactGridLayout>
    )
  }
	
}

export default MediaGrid