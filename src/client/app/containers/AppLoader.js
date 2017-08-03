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

        <Router>
        <div>
          <ul style={style.topleft}>
          <li><Link to="/App1">App1</Link></li>
          <li><Link to="/App2">App2</Link></li>
          <li><Link to="/App3">App3</Link></li>
          </ul>

          <Route path="/:id?" component={Child}/>
        </div>
        </Router>
			  
        {
          /*menuItems.map(item=>(
            <AppContainer menuItem={item} key={item.id} isCurApp={this.state.curApp === item.id}/>
          ))*/
        }

        <Drawer 
          onRequestChange={(open) => this.setState({open})}
          docked={true} width={200} open={this.state.open} >
          <Menu onItemTouchTap={this.onTap}>
            
            {menuItems.map(item=>(
              
              <MenuItem primaryText={item.name} key={item.id} disabled={this.state.curApp===item.id}/>
              
            ))}
            
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

const Child = ({ match }) => {

  console.log('route id',match.params.id)

  return(
  <div style={style.fullpage}>
    {
      menuItems.map((item, idx)=>(
        <AppContainer menuItem={item} key={item.id} isCurApp={match.params.id === item.id || (!match.params.id && idx===0) }/>
      ))
    }
  
  </div>
  )
}


const style = {
      topleft: {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999999
      },
      fullpage: {
        width:'100%',
        height:'100%',
        position: 'fixed',
        top: 0,
        left: 0
      }
}


export default AppLoader