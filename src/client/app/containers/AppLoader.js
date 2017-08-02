import React from 'react'
import PropTypes from 'prop-types'

import 'whatwg-fetch';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

import { default as customTheme} from './ui-theme'
import AppContainer from './AppContainer'

injectTapEventPlugin();

console.log('module :: AppLoader')

const cp = {
   app1: require("bundle-loader?lazy!../subapps/app1.js"),
   app2: require("bundle-loader?lazy!../subapps/app2.js"),
   Game: require("bundle-loader?lazy!../subapps/Game.js"),
}

class AppLoader extends React.Component {
  constructor(props) {
		super(props);
    this.onTap = this.onTap.bind(this);
    this.onAppBarTap = this.onAppBarTap.bind(this);
    this.onClose = this.onClose.bind(this);
    this.state = {curApp:'app1',open:false};
  }

  onTap(event: object, menuItem: object, index: number) {
    console.log( menuItem);
  	this.setState({curApp:menuItem.key});
  	this.setState({
      open: false,
    });
  }

  onAppBarTap(event) {
  	event.preventDefault();
    this.setState({
      open: true
    });

  }

  onClose() {
    this.setState({
      open: false,
    });
  }

	render() {

		let paperStyle = {
			// height: '100%'
		}

		return (
			<MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
			  <div>
			  <AppBar
          title="LB"
          onLeftIconButtonTouchTap={this.onAppBarTap}
          onTitleTouchTap={this.onAppBarTap}
          // iconElementRight={<IconButton><FontIcon className="material-icons" >expand_more</FontIcon></IconButton>}
        />
			  <span ref='appbar'/>

        <Drawer 
          onRequestChange={(open) => this.setState({open})}
          docked={false} width={200} open={this.state.open} >
          <Menu onItemTouchTap={this.onTap}>
            <MenuItem primaryText="App1" key="app1"/>
            <MenuItem primaryText="App2" key="app2"/>
            <MenuItem primaryText="Game" key="Game"/>
          </Menu>
        </Drawer>

      	<div style={paperStyle}>
            <AppContainer key={this.state.curApp} appkey={this.state.curApp} loadfunc={cp[this.state.curApp]}/>
      	</div>


        </div>

			</MuiThemeProvider>
		)
	}

}


export default AppLoader