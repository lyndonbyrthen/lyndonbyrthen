import React from 'react'
import PropTypes from 'prop-types'

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
  Link
} from 'react-router-dom'

import AppContainer from './AppContainer'
import {appDataArr, appDataMap} from '../data/appData'
import MainMenu from '../components/MainMenu'
import MainToolBar from '../components/MainToolBar'


injectTapEventPlugin();

class AppLoader extends React.Component {

  constructor(props) {
		super(props);
    this.onTap = this.onTap.bind(this);
    this.onMenuOpen = this.onMenuOpen.bind(this);
    this.onInfoOpen = this.onInfoOpen.bind(this);

    let curApp = window.appid? appDataMap[appid] : appDataArr[0];

    if (!curApp) curApp = {id:'404'}

    this.state = {curApp:curApp,
                  menuOpen:false,
                  infoOpen:false};
  }

  onTap(event,delta) {
    event.stopPropagation();
    this.setState({
      menuOpen: false
    });
    //event.preventDefault();
    // this.setState({curApp:appDataArr[delta], open:false});
  }

  onMenuOpen(event) {
  	event.preventDefault();
    this.setState({
      menuOpen: true,
      infoOpen: false
    });
  }

  onInfoOpen(event) {
    event.preventDefault();
    this.setState({
      infoOpen: true,
      menuOpen: false
    });
  }

	render() {

    // console.log('render AppLoader',appDataArr)

    let scope = this;

    const actions = [
      <Link style={theme.link} to='/'>

      <RaisedButton
        label="OK"
        primary={true}
      />
      </Link>
    ];

		return (
			<MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <Router>
          <div>

            <Route path="/:id?" render={props=>{
              return <RouteToState key={props.match.params.id} scope={scope} {...props} />
            }}/>


            <Dialog
              title="404 Page not found"
              // overlayStyle={{backgroundColor:'transparent'}}
              // bodyStyle={{backgroundColor:'transparent'}}
              style={{backgroundColor:'transparent'}}
              actions={actions}
              paperProps={{zDepth:2}}
              modal={false}
              open={this.state.curApp.id==='404'}
              onRequestClose={()=>{}}
              >

              Go to home page?
              
            </Dialog>

            <div style={style.fullpage}>
            {
              appDataArr.map((item, idx)=>(
                <AppContainer curApp={this.state.curApp} appData={item} key={item.id} isCurApp={this.state.curApp.id===item.id} />
                ))
            }
            </div>

            <MainMenu parent={scope} appDataArr={appDataArr} curApp={this.state.curApp} onTap={this.onTap} menuOpen={this.state.menuOpen} />

            <Dialog
              title={
                <div>
                <span>{this.state.curApp.name}</span>
                  <IconButton 
                  style={{
                    position:'absolute',
                    right: 0,
                    top:0
                  }}
                  onTouchTap={() => this.setState({infoOpen:false})}

                  >
                  <HighlightOff color={theme.icon.color}/>
                  </IconButton>

                </div>
              }
              overlayStyle={{backgroundColor:'transparent'}}
              bodyStyle={{backgroundColor:'transparent'}}
              style={{backgroundColor:'transparent'}}
              // actions={actions}
              paperProps={{zDepth:2}}
              modal={false}
              open={this.state.infoOpen}
              onRequestClose={()=>{this.setState({infoOpen:false})}}
              >
              
              {this.state.curApp.description}
            </Dialog>

            <MainToolBar parent={scope} 
              appDataArr={appDataArr} 
              curApp={this.state.curApp} 
              onMenuOpen={this.onMenuOpen}
              onInfoOpen={this.onInfoOpen} 
            />


            

          </div>
        </Router>
			</MuiThemeProvider>
		)
	}

}


class RouteToState extends React.Component {

  componentDidMount() {
    let id = this.props.match.params.id;
    console.log('route to state',id);
    if (!id) id = appDataArr[0].id;

    let curApp = appDataMap[id]

    if (!curApp) curApp = {id:'404'}

    this.props.scope.setState({curApp:curApp})
  }

  render() {
    return <span/>
  }
}

const style = {
    fullpage: {
      width:'100%',
      height:'100%',
      position: 'fixed',
      top: 0,
      left: 0
    },
    link: {
      textDecoration:'none'
    }
}


export default AppLoader