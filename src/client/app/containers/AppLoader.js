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

import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import HighlightOff from 'material-ui/svg-icons/action/Highlight-off';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';




import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import AppContainer from './AppContainer'

injectTapEventPlugin();

const chunks = {
   'AudioVisualizer': require("bundle-loader?lazy&name=[name]!../subapps/AudioVisualizer.js"),
   'App1': require("bundle-loader?lazy&name=[name]!../subapps/App1.js"),
   'App2': require("bundle-loader?lazy&name=[name]!../subapps/App2.js"),
   'App3': require("bundle-loader?lazy&name=[name]!../subapps/App3.js"),

}

const appDataArr = []
const appDataMap = {};

let d=0

for (let c in chunks) {
  let i = {
    loadfunc:chunks[c],
    id:c,
    delta:d
  }

  appDataMap[c] = i;
  d++
  appDataArr.push(i)
}

class AppLoader extends React.Component {

  constructor(props) {
		super(props);
    this.onTap = this.onTap.bind(this);
    this.onMenuOpen = this.onMenuOpen.bind(this);
    this.onInfoOpen = this.onInfoOpen.bind(this);

    let curApp = window.appid? appDataMap[appid] : appDataArr[0];

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

		return (
			<MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <Router>
          <div>

            <Route path="/:id?" render={props=>{
              return <RouteToState key={props.match.params.id} scope={scope} {...props} />
            }}/>

            <div style={style.fullpage}>
            {
              appDataArr.map((item, idx)=>(
                <AppContainer curApp={this.state.curApp} appData={item} key={item.id} isCurApp={this.state.curApp.id===item.id} />
                ))
            }
            </div>

            <Drawer 
              overlayStyle={{backgroundColor:'transparent'}}
              bodyStyle={{backgroundColor:'transparent'}}
              style={{backgroundColor:'transparent'}}
              onRequestChange={(open) => this.setState({menuOpen:open})}
              docked={false} width={200} open={this.state.menuOpen} >
              <Menu onItemTouchTap={this.onTap}>
                 <IconButton 
                   style={{
                    position:'absolute',
                    right: 0
                   }}
                   onTouchTap={() => this.setState({menuOpen:false})}
                 
                 >
                   <HighlightOff color={theme.icon.color}/>
                 </IconButton>
                <Subheader>Apps</Subheader>
                {appDataArr.map(item=>{
                  
                  return (
                    <Link style={style.link} onClick={this.onTap} key={item.delta} to={ item.delta===0? '/' : '/'+item.id}>
                      <MenuItem primaryText={item.id} key={item.id} disabled={this.state.curApp.id===item.id}>
                      </MenuItem>
                    </Link>
                  )

                })}

                <Divider />

              </Menu>
            </Drawer>

            <Dialog
              title={
                <div>
                <span>{this.state.curApp.id}</span>
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
              
              {JSON.stringify(this.state.curApp)}
            </Dialog>

            <Paper
             style={{backgroundColor:'rgba(225,225,225,.5)',
                     position:'fixed',
                     width:'auto'}}
             zDepth={2}
            >
              <IconButton onTouchTap={this.onMenuOpen}>
                <NavigationMenu color={theme.icon.color} />
              </IconButton>

              <IconButton onTouchTap={this.onInfoOpen}>
                <InfoOutline color={theme.icon.color} />
              </IconButton>
            </Paper>

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
    this.props.scope.setState({curApp:appDataMap[id]})
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