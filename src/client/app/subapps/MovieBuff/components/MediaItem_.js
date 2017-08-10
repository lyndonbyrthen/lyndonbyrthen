import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { addToList, removeFromList } from '../actions'

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';

import Star from 'material-ui-icons/Star';
import StarBorder from 'material-ui-icons/StarBorder';
import Fullscreen from 'material-ui-icons/Fullscreen';
import FullscreenExit from 'material-ui-icons/FullscreenExit';


import { default as styles} from '../styles'

class MediaItem extends React.Component {
  constructor(props) {
    super(props)
    // console.log(props)
    this.handleClick = this.handleClick.bind(this)
    this.onFocus = this.onFocus.bind(this)

  }

  handleClick(e){

    let list=this.props.mediaList
    let remove = this.props.removeFromList
    let add = this.props.addToList
    let id = this.props.data.id
    if (this.props.mediaList[id]) remove(id)
    else add(id)
  }

  onFocus() {
    console.log(this.props)

    if (this.props.focus == this.props.data.id)
      this.props.setFocus(null)
    else  
      this.props.setFocus(this.props.data.id)
  }

  render() {

    // console.log('render', this.props.data.id)

    let mov = this.props.data
    let icon, icon2
    let xs=6, sm=4, lg=3

    if (this.props.mediaList[mov.id]) icon = <Star/>
    else icon = <StarBorder/>
    if (this.props.focus === mov.id) {
      icon2 = <FullscreenExit/>
      xs=sm=lg=12
    }
    else icon2 = <Fullscreen/>

    return (
      <div>
            <div style={{position:'relative'}}>
            <div style={{position:'absolute',top:'0px',right:'0px'}}>
                 <IconButton 
                 onClick={this.handleClick}
                 style={styles.gridItem.star}
                 >
                   {icon}
                 </IconButton>
                 <IconButton 
                 onClick={this.onFocus}
                 style={styles.gridItem.star}
                 >
                   {icon2}
                 </IconButton>
            </div>
              <img draggable='false' style={styles.posterImg} src={"https://image.tmdb.org/t/p/w780"+mov.poster_path} />
              
            </div>
      </div> 
    )
  }
  
}

export default MediaItem