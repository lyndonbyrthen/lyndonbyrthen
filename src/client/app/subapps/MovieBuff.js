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
import MoviesContainer from './MovieBuff/containers/MoviesContainer';


import {
  BrowserRouter as Router,
  Route,
  Switch, 
  Link
} from 'react-router-dom'

import RouteToState from '../tools/RouteToState'


let initState = {
  movies:{}
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
    // console.log('MovieBuff :: Route Change =============>',routeData)
    let id = routeData.match.params.id;
    console.log('MovieBuff :: Route Change =============>',id)
  }

  render() {

    // if (this.props.appId !== this.props.curAppId) return <span/>

  	return (
      <Provider store={appstore}>
        <Router>
           <div style={{...theme.fullpage,backgroundColor:'gray'}}>
           
           {/*<Route path={"/"+this.props.appId+"/:id?"} render={routeProps=>{
              return (
                <RouteToState
                onChange={this.onRouteChange}
                {...routeProps} 
              />)
           }}/>*/}
          <div style={{top:'100px',position:'absolute', width:'100%'}}>
             <MoviesContainer />
          </div>

           <div style={{top:'80px',position:'absolute', width:'100%', backgroundColor:"transparent"}}>
             <MovieAdder label='add movie 1'/>
             <RaisedButton label='movie list'/>
             <RaisedButton label='tv list'/>
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