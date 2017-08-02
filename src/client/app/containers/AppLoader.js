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

const cp = {
   'App1': require("bundle-loader?lazy!../subapps/App1.js"),
   'App2': require("bundle-loader?lazy!../subapps/App2.js"),
   'App3': require("bundle-loader?lazy!../subapps/App3.js"),
}

const menuItems = []

for (let c in cp) {
  let i = {
    loadfunc:cp[c],
    id:c,
    name:c,
  }
  
  cp[c] = i
  
  menuItems.push(i)
}

class AppLoader extends React.Component {
  constructor(props) {
		super(props);
    this.onTap = this.onTap.bind(this);
    this.onMenuOpen = this.onMenuOpen.bind(this);
    this.state = {curApp:'App1',open:false};
  }

  onTap(event: object, menuItem: object, index: number) {
    console.log( menuItem);
  	this.setState({curApp:menuItem.key, open:false});
  }

  onMenuOpen(event) {
  	event.preventDefault();
    this.setState({
      open: true
    });
  }

	render() {

    console.log('do render',menuItems)

		return (
			<MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
			  <div>
			  
        {
          menuItems.map(item=>
              <AppContainer menuItem={item} key={item.id} isCurApp={this.state.curApp === item.id}/>
          )
        }

        <Drawer 
          onRequestChange={(open) => this.setState({open})}
          docked={true} width={200} open={this.state.open} >
          <Menu onItemTouchTap={this.onTap}>
            {menuItems.map(item=>
              <MenuItem primaryText={item.name} key={item.id} disabled={this.state.curApp===item.id}/>
            )}
          </Menu>
        </Drawer>

        
        <IconButton
         onTouchTap={this.onMenuOpen}
        >
          <NavigationMenu />
        </IconButton>

        </div>

			</MuiThemeProvider>
		)
	}

}


export default AppLoader