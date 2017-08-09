import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { setCurApp, setMenuOpen, setInfoOpen } from '../actions'

import {
  BrowserRouter as Router,
  Route,
  Switch, 
  Link
} from 'react-router-dom'

import RouteToState from '../tools/RouteToState'


import { MuiThemeProvider } from 'material-ui/styles';
import MainTheme from '../styles/MainTheme'

import AppContainer from './AppContainer'

import MainToolBar from '../components/MainToolBar'
import MainMenu from '../components/MainMenu'
import InfoDialog from '../components/InfoDialog'
import Page404Dialog from '../components/Page404Dialog'

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
			<MuiThemeProvider theme={MainTheme}>
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
            <Page404Dialog {...this.props}/>
            
            <InfoDialog {...this.props}/>
            

            <MainMenu menuOpen={()=>{this.props.setMenuOpen(true)}} {...this.props} />
            
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