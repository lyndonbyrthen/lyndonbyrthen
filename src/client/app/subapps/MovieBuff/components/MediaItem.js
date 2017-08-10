import React from 'react'
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { addToList, removeFromList } from '../actions'

import TweenMax from '../../../libs/gasp/TweenMax.min'

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';

import Typography from 'material-ui/Typography';


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
    this.componentDidUpdate = this.componentDidUpdate.bind(this)
    this.getOffset = this.getOffset.bind(this)

  }

  getOffset(el) {
    var x = 0, y = 0
    while (el) {
        x += el.offsetLeft
        y += el.offsetTop
        el = el.offsetParent
    }
    return { left: x, top: y }
  }

  handleClick(e){

    let list=this.props.mediaList
    let remove = this.props.removeFromList
    let add = this.props.addToList
    let id = this.props.data.id
    if (this.props.mediaList[id]) remove(id)
    else add(id)
  }

  componentDidUpdate(){

    let el=ReactDOM.findDOMNode(this.refs.gridItem);
    let el2 = this.refs.gridInner;
    let delay = 0, dur = 0.5

    if (this.props.focus === this.props.data.id ) {
      if (el.style.maxWidth === '100%') return
      // console.log('componentDidUpdate')
      el.style.maxWidth = '100%'
      el.style.overflowY = 'hidden'

      TweenMax.to(el, dur, {delay:delay, 'flex-basis':'100%', onUpdate:()=>{
         window.scrollDiv.scrollTop = this.getOffset(el).top
      }});
      // TweenMax.to(el2, dur, {delay:delay, 'height':450});
    } else if (el.style.maxWidth === '100%'){
      el.style = undefined

      if (this.props.focus === null)
        TweenMax.to(window.scrollDiv, 0.2, {delay:.2, 'scrollTop':this.getOffset(el).top});
    }
  }

  onFocus() {
    let el=ReactDOM.findDOMNode(this.refs.gridItem);
    
    if (this.props.focus == this.props.data.id) {
      this.props.setFocus(null) 
    }
    else  {
      this.props.setFocus(this.props.data.id)
    }
  }

  render() {

    // console.log('render', this.props.data.id)

    let mov = this.props.data
    let icon, icon2, layout
    let xs=6, sm=4, lg=3

    let poster = (
      <div style={{position:'relative'}}>
         <img ref='img' draggable='false' style={styles.posterImg} src={"https://image.tmdb.org/t/p/w780"+mov.poster_path} />
      </div>
    )
    let backdrop = (
      <div>
          <div style={{position:'relative'}}>
            <img ref='img' draggable='false' style={styles.posterImg} src={"https://image.tmdb.org/t/p/w780"+mov.backdrop_path} />
          </div>
        <div style={{boxSizing:"border-box", padding:'15px',position:'absolute',left:'0px',bottom:'0px',width:'100%',margine:'15px',backgroundColor:'rgba(0,0,0,.55)'}}>
          <Typography style={styles.posterText} component="div" paragraph type="title">
              {mov.title}
          </Typography>
          <Typography style={styles.posterText} component="div" paragraph type="body1">
              {mov.overview}
          </Typography>
        </div>

          
      </div>
    )
    if (this.props.mediaList[mov.id]) icon = <Star/>
    else icon = <StarBorder/>
    
    if (this.props.focus === mov.id) {
      layout = backdrop
      icon2 = <FullscreenExit/>
    }
    else {
      layout = poster
      icon2 = <Fullscreen/>
    }

    return (
      <Grid ref='gridItem' item xs={xs} sm={sm} lg={lg}  >
            <div ref='gridInner' style={{position:'relative'}}>

                <div style={{position:'relative'}}>
                {layout}
                </div>

                <div style={{position:'absolute',height:'100%',width:'100%',top:'0px'}}>
                    <div style={{position:'absolute',right:'0px',bottom:'0px'}}>
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
                </div>
            
            </div>

      </Grid> 
    )
  }
	
}

export default MediaItem