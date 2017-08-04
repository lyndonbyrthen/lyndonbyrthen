import React from 'react'
import PropTypes from 'prop-types'

import 'whatwg-fetch';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { default as customTheme} from './ui-theme'
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
    this.state = {curApp:appDataArr[0],open:false};
  }

  onTap(event,delta) {
    event.stopPropagation();
    this.setState({
      open: false
    });
    //event.preventDefault();
    // this.setState({curApp:appDataArr[delta], open:false});
  }

  onMenuOpen(event) {
  	event.preventDefault();
    this.setState({
      open: true
    });
  }

	render() {

    // console.log('render AppLoader',appDataArr)

    let scope = this;

		return (
			<MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
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
              onRequestChange={(open) => this.setState({open})}
              docked={true} width={200} open={this.state.open} >
              <Menu onItemTouchTap={this.onTap}>
                
                {appDataArr.map(item=>(
                  <Link style={style.link} onClick={this.onTap} key={item.delta} to={ item.delta===0? '/' : '/'+item.id}>
                  <MenuItem primaryText={item.id} key={item.id} disabled={this.state.curApp.id===item.id}>
                  </MenuItem>
                  </Link>
                ))}

              </Menu>
            </Drawer>

            <IconButton onTouchTap={this.onMenuOpen}>
              <NavigationMenu />
            </IconButton>

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