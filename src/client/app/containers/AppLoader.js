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

import { default as customTheme} from './ui-theme'
import AppContainer from './AppContainer'

injectTapEventPlugin();

console.log('AppLoader')

const cp = {
   'App1': require("bundle-loader?lazy!../subapps/App1.js"),
   'App2': require("bundle-loader?lazy!../subapps/App2.js"),
   'App3': require("bundle-loader?lazy!../subapps/App3.js"),
}

class AppLoader extends React.Component {
  constructor(props) {
		super(props);
    this.onTap = this.onTap.bind(this);
    this.onMenuOpen = this.onMenuOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.state = {curApp:'App1',open:false};
  }

  onTap(event: object, menuItem: object, index: number) {
    console.log( menuItem);
  	this.setState({curApp:menuItem.key});
  	this.setState({
      open: false,
    });
  }

  onMenuOpen(event) {
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

		return (
			<MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
			  <div>
			  
        <IconButton
         onTouchTap={this.onMenuOpen}
        >
          <NavigationMenu />
        </IconButton>

        <Drawer 
          onRequestChange={(open) => this.setState({open})}
          docked={false} width={200} open={this.state.open} >
          <Menu onItemTouchTap={this.onTap}>
            <MenuItem primaryText="App1" key="App1"/>
            <MenuItem primaryText="App2" key="App2"/>
            <MenuItem primaryText="App3" key="App3"/>
          </Menu>
        </Drawer>

      	<div>
            <AppContainer key={this.state.curApp} appkey={this.state.curApp} loadfunc={cp[this.state.curApp]}/>
      	</div>


        </div>

			</MuiThemeProvider>
		)
	}

}


export default AppLoader