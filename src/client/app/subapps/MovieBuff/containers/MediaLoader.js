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
    new Request('https://api.themoviedb.org/3/discover/movie?api_key=9ceb030330a7d13c7e200d7d7489a442&language=en-US&sort_by=primary_release_date.desc&include_adult=false&include_video=true&primary_release_year='+this.yearStr+'&primary_release_date.gte='+this.yearStr+'-01-01&primary_release_date.lte='+this.dateStr+'&year='+this.yearStr+'&with_original_language=en&page='+this.pageLoaded, myInit);

    fetch(myRequest).then(function(response) {
      return response.json();
    }).then(function(json) {

      dispatch(addMedia(json.results))
      scope.pageLoaded++;
      if (scope.pageLoaded < 15) scope.loadMedia()
      else if (!scope.updateCancel) {
        scope.ready = true
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