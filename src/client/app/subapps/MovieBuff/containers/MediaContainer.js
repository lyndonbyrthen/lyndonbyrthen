import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { setView, setFocus, addMedia, removeMedia, addToList, removeFromList } from '../actions'

import { normalize, schema } from 'normalizr';

import 'whatwg-fetch';

import Paper from 'material-ui/Paper';

import MediaGrid from '../components/MediaGrid'
import Selector from '../components/Selector'


let MediaContainer = (props)=> {
	
    return (
      <div>
      <MediaGrid {...props}/>
      <Selector {...props} />
      </div>
    )
  
}

const mapStateToProps = state => {
  return {
    media:state.media,
    mediaList:state.mediaList,
    viewType:state.viewType,
    focus:state.focus
  }
}
const mapDispatchToProps = dispatch => {
  return {
     dispatch:dispatch,
     addToList:(id)=>{
      dispatch(addToList(id))
     },
     removeFromList:(id)=>{
      dispatch(removeFromList(id))
     },
     removeMedia:(id)=>{
      dispatch(removeMedia(id))
     },
     setView:(viewType)=>{
      dispatch(setView(viewType))
     },
     setFocus:(mediaId)=>{
      dispatch(setFocus(mediaId))
     },
  }
}

MediaContainer = connect(mapStateToProps,mapDispatchToProps)(MediaContainer)

export default MediaContainer