import React from 'react'
import PropTypes from 'prop-types'

import 'whatwg-fetch';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {
   Paper,
   AppBar,
   MenuItem,
   Menu,
   IconButton,
   FontIcon,
   Popover,
   PopoverAnimationVertical

} from 'material-ui';

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
			height: '100%'
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

      	<Popover
          open={this.state.open}
          anchorEl={this.refs.appbar}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.onClose}
          animation={PopoverAnimationVertical}
        >
          <Menu onItemTouchTap={this.onTap}>
	          <MenuItem primaryText="App1" key="app1"/>
		        <MenuItem primaryText="App2" key="app2"/>
		        <MenuItem primaryText="Game" key="Game"/>
          </Menu>
        </Popover>

      	<Paper style={paperStyle}>
            <AppContainer key={this.state.curApp} appkey={this.state.curApp} loadfunc={cp[this.state.curApp]}/>
      	</Paper>
        </div>

			</MuiThemeProvider>
		)
	}

}


export default AppLoader