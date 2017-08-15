import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { addMedia } from '../actions'

import { normalize, schema } from 'normalizr';

import 'whatwg-fetch';

import Button from 'material-ui/Button';
import { LinearProgress } from 'material-ui/Progress'

class MediaLoader extends React.Component {
	
  constructor(props) {
    super(props)
    // console.log(props)
    this.ready = false
    this.loadMedia = this.loadMedia.bind(this)
    this.pageLoaded = 1
    this.movs = []
    this.date = new Date()
    this.yearStr = this.date.getFullYear()
    this.dateStr = ([this.date.getFullYear(),this.date.getMonth()+1,this.date.getDate()]).join('-')
    this.updateCancel = false
    this.loadMedia()
  }

  loadMedia() {
    let dispatch = this.props.dispatch;
    let scope = this;

    let myHeaders = new Headers();
    let myInit = { method: 'GET',
     headers: myHeaders,
    };
    let myRequest = 
    new Request('/api/moviebuff', myInit);

    fetch(myRequest).then(function(response) {
      return response.json();
    }).then(function(json) {
      
      let res = []

      for (let i in json) {
        res = res.concat(json[i].results)
      }

      dispatch(addMedia(res))

      scope.ready = true
      if (!scope.updateCancel) {
        scope.forceUpdate()
      }
    });
      
  }

  componentWillUnmount() {
    this.updateCancel = true
  }

	render()
  { 

    let content
    if (this.ready) content = null
    else content = (<LinearProgress/>)
    return (
      <span>
      {content}
      </span>
    )
  }
}

const mapStateToProps = state => {
  return {
    
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch:dispatch
  }
}

MediaLoader = connect(mapStateToProps,mapDispatchToProps)(MediaLoader)

export default MediaLoader