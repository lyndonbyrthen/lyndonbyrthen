import React from 'react'

import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './MovieBuff/reducers'

import { default as theme} from '../styles/ui-theme'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
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

import MovieAdder from './MovieBuff/containers/MovieAdder';


import {
  BrowserRouter as Router,
  Route,
  Switch, 
  Link
} from 'react-router-dom'

import RouteToState from '../tools/RouteToState'


let initState = {
  movies:['Blood Simple']
}

const appstore = createStore(
      reducer,
      initState,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

class MovieBuff extends React.Component {

  constructor(props) {
    super(props)
    // console.log(props)
    this.onRouteChange = this.onRouteChange.bind(this)
    
  }

  onRouteChange(routeData) {
    if (this.props.curAppId !== this.props.appId) {
      // return
      routeData.history.location.pathname = '/'+this.props.appId
      return
    }
    // console.log('MovieBuff :: Route Change =============>',routeData)

    let id = routeData.match.params.id;
    console.log('MovieBuff :: Route Change =============>',id)
  }

  render() {

  	return (
      <Provider store={appstore}>
        <Router>
           <div style={{...theme.fullpage,backgroundColor:'gray'}}>
           <Route path={"/:appId/:id?"} render={routeProps=>{
              return (
                <RouteToState 
                onChange={this.onRouteChange}
                {...routeProps} 
              />)
           }}/>
           
           <div  style={{top:'100px',position:'absolute'}}>
             <MovieAdder {...this.props} label='add movie 1' title='title 1'/>
             <Link style={theme.link} to={'/'+this.props.appId+'/movielist'}>
                <RaisedButton label='movie list'/>
             </Link>
             <Link style={theme.link} to={'/'+this.props.appId+'/tvlist'}>
                <RaisedButton label='tv list'/>
             </Link>

           </div>
           </div>
        </Router>
      </Provider>
    )
  }
}

const mapStateToProps = state => {
  return {
    curAppId : state.curAppId,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch:dispatch,
  }
}

MovieBuff = connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieBuff)

export default MovieBuff