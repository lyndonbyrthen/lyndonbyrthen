import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { setCurApp, setMenuOpen, setInfoOpen } from '../actions'

import 'whatwg-fetch';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { default as theme} from '../styles/ui-theme'


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

import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import HighlightOff from 'material-ui/svg-icons/action/Highlight-off';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import {
  BrowserRouter as Router,
  Route,
  Switch, 
  Link
} from 'react-router-dom'

import RouteToState from '../tools/RouteToState'

import AppContainer from './AppContainer'
import MainMenu from '../components/MainMenu'
import MainToolBar from '../components/MainToolBar'
import InfoDialog from '../components/InfoDialog'
import Page404Dialog from '../components/Page404Dialog'

injectTapEventPlugin();

class AppLoader extends React.Component {
   
   constructor(props) {
     super(props)
     this.onRouteChange = this.onRouteChange.bind(this)
   }

   onRouteChange(routeData) {
      // console.log(routeData)
      let id = routeData.match.params.id;
      if (!id) id = this.props.ids[0]
      id = id.toLowerCase();
      if (this.props.deltas[id]===undefined) id = '404'
      // console.log('=============>',id,' <===>',this.props.curAppId)
      if (id === this.props.curAppId) return
      console.log('Route Change =============>',id)
      this.props.dispatch(setCurApp(id))
   }
    
   render() {
		return (
			<MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <Router>
          <div>
          
            <Route path="/:id?" render={routeProps=>{
              return (
                  <RouteToState 
                  onChange={this.onRouteChange}
                  {...routeProps} 
                  />
              )
            }}/>
          
  
            {
              this.props.ids.map(id=>(
                <AppContainer key={id} appId={id} />
              ))
            }

            <MainMenu menuOpen={()=>{this.props.setMenuOpen(true)}} {...this.props} />

            <Page404Dialog {...this.props}/>

            <InfoDialog {...this.props}/>

            <MainToolBar {...this.props}/>

          </div>
        </Router>
			</MuiThemeProvider>
		)
	
  }
}


const mapStateToProps = state => {
  return {
    curAppId : state.curAppId,
    deltas: state.deltas,
    ids: state.ids,
    names:state.names,
    descriptions:state.descriptions,
    menuOpen:state.menuOpen,
    infoOpen:state.infoOpen,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMenuOpen : (bool) => {
      dispatch(setMenuOpen(bool))
    },
    setInfoOpen : (bool) => {
      dispatch(setInfoOpen(bool))
    },
    onTap: (event) => {
      event.stopPropagation();
      dispatch(setMenuOpen(false));
    },
    dispatch:dispatch,
  }
}

AppLoader = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppLoader)

export default AppLoader