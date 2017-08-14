import React from 'react'
import ReactDOM from 'react-dom';

import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './MovieBuff/reducers'

import { MuiThemeProvider } from 'material-ui/styles';
import MainTheme from '../styles/MainTheme'
import Button from 'material-ui/Button';

import { default as styles} from '../styles/styles'

import MediaLoader from './MovieBuff/containers/MediaLoader';
import MediaContainer from './MovieBuff/containers/MediaContainer';

import {
  BrowserRouter as Router,
  Route,
  Switch, 
  Link
} from 'react-router-dom'

import RouteToState from '../tools/RouteToState'


let initState = {
  media:{},
  mediaList:{},
  viewType:'ALL',
  focus:null,
  mediaDelta:[]
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
    this.ready = false
  }

  onRouteChange(routeData) {
    // console.log('MovieBuff :: Route Change =============>',routeData)
    let id = routeData.match.params.id;
    console.log('MovieBuff :: Route Change =============>',id)
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
  }

  componentDidMount() {
    window.scrollDiv = ReactDOM.findDOMNode(this.refs.scrollDiv);
  } 

  render() {

    let loader
    if ((this.props.transitionStage === 'INIT' || this.props.transitionStage === 'IN_COMPLETE')
      && !this.loaded){
       loader = <MediaLoader/>
       this.loaded = true
    }
    else loader = null

  	return (
      <Provider store={appstore}>
        <Router>
           <div style={{position:'fixed', width:'100%',height:'100%',overflow:'hidden'}}>
           
           {/*<Route path={"/"+this.props.appId+"/:id?"} render={routeProps=>{
              return (
                <RouteToState
                onChange={this.onRouteChange}
                {...routeProps} 
              />)
           }}/>*/}

           { loader }

          <div ref='scrollDiv' style={{height:'100%',overflowY:'auto',backgroundColor:'black'}}>
             <MediaContainer />
          </div>

           </div>
        </Router>
      </Provider>
    )
  }
}

/*const mapStateToProps = state => {
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
)(MovieBuff)*/

export default MovieBuff